import Login from "../../PageObjects/Login_Locators.cy";
import Patients from "../../PageObjects/Patients_Locators.cy";
import Reporting from "../../PageObjects/Reporting_Locators.cy";
import AppAccess from "../../PageObjects/Page_Access.cy";

describe("Automating All Pages are Accessable", () => {

    it("Login with data from Excel", () => {

        cy.viewport(1280, 1080);

        const pageaccesspage = new AppAccess();
        const loginpage = new Login();
        const patientPage = new Patients();
        const reportingpage = new Reporting();

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
                    loginpage.set_user_password().type(password);
                    cy.wait(5000);
                    loginpage.bt_submit().click();
                    cy.wait(5000); // Wait for the login process to complete

                    // Check if the login was successful by verifying the URL or a dashboard element
                    cy.url().then((currentUrl) => {
                        if (currentUrl.includes('/dashboard')) {
                            cy.url().should('include', '/dashboard');
                            cy.log(`Login successful for row ${i}`);
                            cy.get('.font-medium.text-lg.py-3').should('be.visible');
                            patientPage.click_patient_btn().click();
                            cy.wait(5000);
                            cy.get('.text-24-32s.font-semibold.pb.flex.items-center.pr-4').should('be.visible');
                            cy.wait(5000);
                            pageaccesspage.patient_avatar_click();
                            cy.get('body > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > section:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)').should('be.visible');
                            cy.wait(5000);
                            pageaccesspage.challenges_lintext_click();
                            cy.wait(5000);
                            cy.get("label[for='formLabel'] span[class='text-inherit font-inherit']").should('be.visible');
                            pageaccesspage.formsletters_lintext_click();
                            cy.wait(5000);
                            cy.get('body > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > section:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)').should('be.visible');
                            cy.wait(5000);
                            pageaccesspage.uplaoddocument_click();
                            cy.wait(5000);
                            cy.get(".mb-4.text-black-900.text-18s.font-semibold").should('be.visible');
                            cy.wait(5000);
                            pageaccesspage.upload_cancel_bt_click();
                            cy.wait(5000);
                            patientPage.click_patient_btn().click();
                            cy.wait(5000);
                            patientPage.click_add_patient_btn().click();
                            cy.wait(5000);
                            cy.get("span[class='text-2xl font-semibold leading-6 text-[#333333] flex pt-3']").should('be.visible');
                            cy.wait(5000);
                            pageaccesspage.releaseinformation_click();
                            cy.wait(5000);
                            cy.get(".mb-4.text-black-900.text-18s.font-semibold").should('be.visible');
                            pageaccesspage.release_cancel_bt_click();
                            cy.wait(5000);
                            reportingpage.reporting_bt();
                            cy.wait(5000);
                            cy.get("div[class='flex flex-row space-x-4 '] h2[class='text-21s font-medium']").should('be.visible');
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