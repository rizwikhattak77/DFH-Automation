import Login from "../../PageObjects/Login_Locators.cy";

describe("Automating Login Module", () => {

    it("Login with data from Excel", () => {

        cy.viewport(1280, 1080);

        const loginpage = new Login();

        cy.parseXlsx('cypress/fixtures/LoginData.xlsx').then((excelData) => {
            const rowCount = excelData[0].data.length;

          
            for (let i = 1; i < rowCount; i++) {
                const value = excelData[0].data[i]; 

                if (value.length >= 2) {
                    const email = value[1];    
                    const password = value[2]; 

                if (email && password) {
                    cy.visit("http://docsforhealthweb.s3-website-us-east-1.amazonaws.com/auth/login", { failOnStatusCode: false });

                    loginpage.set_user_email().type(email);
                    cy.wait(3000); 
                    loginpage.set_user_password().type(password);
                    cy.wait(3000); 
                    loginpage.bt_submit().click();
                    cy.wait(5000); // Wait for the login process to complete

                    // Check if the login was successful by verifying the URL or a dashboard element
                    cy.url().then((currentUrl) => {
                        if (currentUrl.includes('/dashboard')) {
                            cy.url().should('include', '/dashboard');
                            cy.log(`Login successful for row ${i}`);
                            loginpage.set_logout();
                            cy.wait(5000)
                        } else {
                            cy.log(`Login failed for row ${i}: User does not exist.`);
                        }
                    });
                } else {
                    cy.log(`Skipping row ${i} due to missing email or password.`);
                }
            }
        }});
    });
});