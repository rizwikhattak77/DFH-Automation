import Login from "../../PageObjects/Login_Locators.cy";
import Patients from "../../PageObjects/Patients_Locators.cy";
import Reporting from "../../PageObjects/Reporting_Locators.cy";
import AppAccess from "../../PageObjects/Page_Access.cy"


describe("Automating All Pages are Accessible", () => {
    it("Login with data from Excel", () => {
        cy.viewport(1280, 1080);

        const pageaccesspage = new AppAccess();
        const loginpage = new Login();
        const patientPage = new Patients();
        const reportingpage = new Reporting();

        const baseUrl = Cypress.env('BASE_URL'); 

        cy.parseXlsx('cypress/fixtures/LoginData.xlsx').then((excelData) => {
            const rowCount = excelData[0].data.length;

            for (let i = 1; i < rowCount; i++) {
                const value = excelData[0].data[i];

                if (value.length >= 2) {
                    const email = value[1];
                    const password = value[2];

                    if (email && password) {
                        cy.visit(baseUrl,{ failOnStatusCode: false }
                        );

                        loginpage.set_user_email().type(email);
                        loginpage.set_user_password().type(password);
                        loginpage.bt_submit().click();
                        cy.wait(8000);

                        cy.url().then((currentUrl) => {
                            if (currentUrl.includes('/dashboard')) {
                                cy.url().should('include', '/dashboard');
                                cy.log(`Login successful for row ${i}`);

                                // Dashboard check
                                cy.get('body').then(($body) => {
                                    if ($body.find('.font-medium.text-lg.py-3').length) {
                                        cy.log("Dashboard text is found");
                                    } else {
                                        cy.log("Dashboard text is not found");
                                        cy.screenshot();
                                    }
                                });
                                

                                // Navigate to Patients section
                                patientPage.click_patient_btn().click();
                                cy.wait(5000);

                                cy.get('body').then(($body) => {
                                    if ($body.find("tbody tr:nth-child(1) td:nth-child(1) div:nth-child(1) span:nth-child(1) div:nth-child(1)").length) {
                                        cy.log("Patient listing is available");
                                        pageaccesspage.patient_avatar_click();
                                        cy.wait(5000);

                                        cy.get(
                                            "body > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > section:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)"
                                        ).should('be.visible');


                                        pageaccesspage.challenges_lintext_click();
                                        cy.wait(5000);

                                        // Check "Sort by" text
                                        cy.get('body').then(($body) => {
                                            if ($body.find("label[for='formLabel'] span[class='text-inherit font-inherit']").length) {
                                                cy.log("Sort by text is found");
                                            } else {
                                                cy.log("Sort by text is not found");
                                                cy.screenshot();
                                            }
                                        });

                                        // Forms & Letters link
                                        cy.get('body').then(($body) => {
                                            if ($body.find("li:nth-child(3) span:nth-child(1) div:nth-child(1)").length) {
                                                cy.log("Forms & letter link text found");
                                                $body.find("li:nth-child(3) span:nth-child(1) div:nth-child(1)").click();
                                            } else {
                                                cy.log("Forms & letter link text not found");
                                                cy.screenshot();
                                            }
                                        });

                                        cy.wait(5000);

                                        // Add New button
                                        cy.get('body').then(($body) => {
                                            if ($body.find("button[class*='bg-[#006CD0]']").length) {
                                                cy.log("Add new button is clicked");
                                                $body.find("button[class*='bg-[#006CD0]']").click();
                                            } else {
                                                cy.log("Add new button is not clicked");
                                                cy.screenshot();
                                            }
                                        });

                                        cy.wait(5000);

                                        // Check Upload Document dialog
                                        cy.get('body').then(($body) => {
                                            if ($body.find(".mb-4.text-black-900.text-18s.font-semibold").length) {
                                                cy.log("Upload Document text is found");
                                            } else {
                                                cy.log("Upload Document text is not found");
                                                cy.screenshot();
                                            }
                                        });

                                        cy.wait(5000);

                                        // Cancel button in dialog
                                        cy.get('body').then(($body) => {
                                            if ($body.find("button[class*='bg-white']").length) {
                                                cy.log("Cancel button is clicked in the upload document dialog");
                                                $body.find("button[class*='bg-white']").click();
                                            } else {
                                                cy.log("Cancel button is not clicked in the upload document dialog");
                                                cy.screenshot();
                                            }
                                        });

                                        cy.wait(5000);

                                        patientPage.click_patient_btn().click();
                                        cy.wait(5000);

                                        patientPage.click_add_patient_btn().click();
                                        cy.wait(5000);

                                        // Check Add New Patient text
                                        cy.get('body').then(($body) => {
                                            if ($body.find("span[class*='text-2xl']").length) {
                                                cy.log("Add new Patient text is found");
                                            } else {
                                                cy.log("Add new Patient text is not found");
                                                cy.screenshot();
                                            }
                                        });

                                        // Add Release of Information
                                        cy.get('body').then(($body) => {
                                            if ($body.find("div[class='w-[250px]'] button[type='button']").length) {
                                                cy.log("Add release of information button is clicked in the Add new patient page");
                                                $body.find("div[class='w-[250px]'] button[type='button']").click();
                                            } else {
                                                cy.log("Add release of information button is not clicked in the Add new patient page");
                                                cy.screenshot();
                                            }
                                        });

                                        cy.wait(5000);

                                        // Add Release dialog
                                        cy.get('body').then(($body) => {
                                            if ($body.find(".mb-4.text-black-900.text-18s.font-semibold").length) {
                                                cy.log("Add Release of Information text is found");
                                            } else {
                                                cy.log("Add Release of Information text is not found");
                                                cy.screenshot();
                                            }
                                        });

                                        // Cancel button in Add Release dialog
                                        cy.get('body').then(($body) => {
                                            if ($body.find("div[class*='justify-self-start'] button[type='button']").length) {
                                                cy.log("Cancel button is clicked within the Add release information dialog");
                                                $body.find("div[class*='justify-self-start'] button[type='button']").click();
                                            } else {
                                                cy.log("Cancel button is not clicked within the Add release information dialog");
                                                cy.screenshot();
                                            }
                                        });

                                        cy.wait(5000);
                                    } else {
                                        cy.log("No patient listing available. Navigating to add patient page.");
                                        patientPage.click_add_patient_btn().click();

                                        cy.get('body').then(($body) => {
                                            if ($body.find("span[class*='text-2xl']").length) {
                                                cy.log("Add new Patient text is found");
                                            } else {
                                                cy.log("Add new Patient text is not found");
                                                cy.screenshot();
                                            }
                                        });
                                        // Add Release of Information
                                        cy.get('body').then(($body) => {
                                            if ($body.find("div[class='w-[250px]'] button[type='button']").length) {
                                                cy.log("Add release of information button is clicked in the Add new patient page");
                                                $body.find("div[class='w-[250px]'] button[type='button']").click();
                                            } else {
                                                cy.log("Add release of information button is not clicked in the Add new patient page");
                                                cy.screenshot();
                                            }
                                        });

                                        cy.wait(5000);

                                        // Add Release dialog
                                        cy.get('body').then(($body) => {
                                            if ($body.find(".mb-4.text-black-900.text-18s.font-semibold").length) {
                                                cy.log("Add Release of Information text is found");
                                            } else {
                                                cy.log("Add Release of Information text is not found");
                                                cy.screenshot();
                                            }
                                        });

                                        // Cancel button in Add Release dialog
                                        cy.get('body').then(($body) => {
                                            if ($body.find("div[class*='justify-self-start'] button[type='button']").length) {
                                                cy.log("Cancel button is clicked within the Add release information dialog");
                                                $body.find("div[class*='justify-self-start'] button[type='button']").click();
                                            } else {
                                                cy.log("Cancel button is not clicked within the Add release information dialog");
                                                cy.screenshot();
                                            }
                                        });

                                        cy.wait(5000);
                                    }

                                    // Additional actions for Reporting page
                                    reportingpage.reporting_bt();
                                    cy.wait(5000);

                                    // Logout
                                    loginpage.set_logout();
                                    cy.wait(5000);
                                });
                            } else {
                                cy.log(`Login failed for row ${i}: User does not exist.`);
                                cy.screenshot();
                            }
                        });
                    } else {
                        cy.log(`Skipping row ${i} due to missing email or password.`);
                    }
                }
            }
        });
    });
});

