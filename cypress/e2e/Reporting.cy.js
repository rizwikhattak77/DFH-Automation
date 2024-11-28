import Reporting from "../../PageObjects/Reporting_Locators.cy";
import Login from "../../PageObjects/Login_Locators.cy";

describe("Automating Reporting Module", () => {

    it("Login with data from Excel", () => {

        cy.viewport(1280, 1080);

        const loginpage = new Login();
        const reportingpage = new Reporting();

        const baseUrl = Cypress.env('BASE_URL'); 

        // Parse the Reporting Excel file
        cy.parseXlsx('cypress/fixtures/ReportingData.xlsx').then((excelData) => {
            const rowCount = excelData[0].data.length;

            if (rowCount <= 1) {
                cy.log("No user data available, stopping test.");
                return cy.end(); // Stops the test execution
            }

            for (let i = 1; i < rowCount; i++) {
                const rowData = excelData[0].data[i];
                const email = rowData[0];
                const password = rowData[1];
                const optionsToSelect = rowData.slice(2, 10); // Get options as an array of booleans for checkboxes

                if (email && password) {
                    cy.visit(baseUrl, { failOnStatusCode: false });

                    // Perform login action
                    loginpage.set_user_email().type(email);
                    cy.wait(3000);
                    loginpage.set_user_password().type(password);
                    cy.wait(3000);
                    loginpage.bt_submit().click();
                    cy.wait(5000);

                    // Check if the login was successful
                    cy.url().then((currentUrl) => {
                        if (currentUrl.includes('/dashboard')) {
                            cy.log(`Login successful for row ${i}`);
                            reportingpage.reporting_bt();
                            
                            // Check if all options are false
                            const allFalse = optionsToSelect.every(option => !option); // Check if all options are false

                            if (allFalse) {
                                cy.log(`Skipping user ${email} as all options are false.`);
                                // Log out and move to the next user
                                loginpage.set_logout(); // Assuming there's a logout button
                                cy.wait(2000); // Wait for logout
                            } else {
                                // Proceed with CSV download
                                reportingpage.download_csv_btn(optionsToSelect);
                                cy.wait(2000);
                                reportingpage.download_btn_click();
                                loginpage.set_logout();
                            }
                        } else {
                            cy.log(`Login failed for row ${i}: User does not exist.`);
                        }
                    });
                } else {
                    cy.log(`Skipping row ${i} due to missing email or password.`);
                }
            }
        });
    });
});
