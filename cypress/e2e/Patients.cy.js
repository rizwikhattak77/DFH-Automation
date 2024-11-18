import Patients from "../../PageObjects/Patients_Locators.cy";
import Login from "../../PageObjects/Login_Locators.cy";
import 'cypress-file-upload';


describe("Automating Patient Module", () => {
    beforeEach(() => {
        cy.viewport(1280, 1080);
    });

    it("Adding Patients Based on Assigned Users", function () {
        const patientPage = new Patients();
        const loginPage = new Login();


        // Parse the login and patient data from the Excel files
        cy.parseXlsx('cypress/fixtures/LoginData.xlsx').then((loginData) => {
            const loginRecords = loginData[0].data.slice(1); 

            cy.parseXlsx('cypress/fixtures/PatientData.xlsx').then((patientData) => {
                const patientRecords = patientData[0].data.slice(1); // Remove header row

                // Loop through each user and find their assigned patients
                loginRecords.forEach(([userID, email, password]) => {
                    if (!email || !password) {
                        cy.log(`Skipping login due to missing email or password for userID: ${userID}`);
                        return;
                    }

                    // Filter patients assigned to this user
                    const assignedPatients = patientRecords.filter(patient => patient[0] === userID);

                    if (assignedPatients.length === 0) {
                        cy.log(`No patients assigned to userID: ${userID}`);
                        return;
                    }

                    // Log in with the current user
                    cy.visit("http://docsforhealthweb.s3-website-us-east-1.amazonaws.com/auth/login", { failOnStatusCode: false });
                    loginPage.set_user_email().type(email);
                    cy.wait(3000);
                    loginPage.set_user_password().type(password);
                    cy.wait(3000);
                    loginPage.bt_submit().click();
                    cy.wait(5000);

                    // Verify successful login
                    cy.url().should('include', '/dashboard');

                    // Loop through each assigned patient to create them
                    assignedPatients.forEach(patient => {
                        const [
                            assignedUserID, profilePicPath,firstName, middleName, lastName, dob,
                            race, relationshipStatus, gender, ethnicity, primaryLanguage, education,
                            medicalProvider, responsibleIndividual, enrollmentDate, socialSecurity,
                            personalIncome, householdSize, householdIncome, emailContact,
                            contactPhone, emergencyContactName, emergencyRelationship,
                            emergencyContactNumber, bestWayToContact, housingStatus, mailingAddress,addressLine1,addressLine2,city,state,zipCode,
                            managerName, managerEmail, managerPhone, agency, notes
                        ] = patient;

                        const trimmedFirstName = firstName ? firstName.trim() : '';
                        const trimmedLastName = lastName ? lastName.trim() : '';

                        cy.log(`Creating patient for userID: ${userID} - ${trimmedFirstName} ${trimmedLastName}`);

                        
                        //Open the add patient form
                        patientPage.click_patient_btn().click();
                        cy.wait(3000);
                        patientPage.click_add_patient_btn().click();
                        cy.wait(3000);
                        
                        if (profilePicPath) {
                            const filePath = `${profilePicPath}`;  
                            
                            // Check if the file exists in the fixtures folder
                            cy.readFile(`cypress/fixtures/${filePath}`, { failOnNonExistentFile: false }).then((fileContent) => {
                                if (fileContent) {
                                    // File exists, proceed with the upload
                                    patientPage.set_upload_photo().click();
                                    patientPage.set_choose_file().click().attachFile(filePath, { force: true });
                                    
                                    // Wait for the image to appear in the crop modal 
                                    cy.wait(2000);

                        
                                    patientPage.set_crop_save_button().click();
                                } else {
                                    // If the file does not exist, log and skip the upload
                                    cy.log(`Profile picture file "${filePath}" does not exist in the fixtures folder, skipping upload.`);
                                
                                }
                            }).then(() => {
                                // If the file doesn't exist or there was an error, log and skip the upload
                                cy.log(`Profile picture file "${filePath}" does not exist in the fixtures folder, skipping upload.`);
                            });
                        } else {
                            cy.log("No profile picture provided, skipping upload.");
                        }
                        

                        // Fill in patient details
                        patientPage.enter_first_name_txt().type(trimmedFirstName);
                        if (middleName) patientPage.set_middle_name().type(middleName);
                        patientPage.enter_last_name_txt().type(trimmedLastName);
                        patientPage.click_dob_field().type(dob);
                        patientPage.body_click().click({ force: true });
                        
                        
                        cy.wrap(null).then(() => {
                            if (race) {
                                cy.get("[name='race']").then(dropdown => {
                                    if (dropdown.find(`option[value="${race}"]`).length) {
                                        patientPage.set_race(race);
                                    }
                                });
                            }

                            if (relationshipStatus) {
                                cy.get("[name='relationshipStatus']").then(dropdown => {
                                    if (dropdown.find(`option[value="${relationshipStatus}"]`).length) {
                                        patientPage.set_relationship_status(relationshipStatus);
                                    }
                                });
                            }

                            if (gender) patientPage.set_gender(gender);

                            if (primaryLanguage) {
                                cy.get("[name='primaryLanguage']").then(dropdown => {
                                    if (dropdown.find(`option[value="${primaryLanguage}"]`).length) {
                                        patientPage.set_primary_language(primaryLanguage);
                                    }
                                });
                            }

                            if (ethnicity) {
                                cy.get("[name = 'ethnicity']").then(dropdown => {
                                    if (dropdown.find(`option[value="${ethnicity}"]`).length) {
                                        patientPage.set_ethnicity(ethnicity);
                                    }
                                });
                            }

                            if (education) {
                                cy.get("[name='education']").then(dropdown => {
                                    if (dropdown.find(`option[value="${education}"]`).length) {
                                        patientPage.set_education(education);
                                    }
                                });
                            }

                            if (medicalProvider) patientPage.set_medical_provider().type(medicalProvider);
                            if (responsibleIndividual) patientPage.set_responsible_individual(responsibleIndividual);
                            if (enrollmentDate) patientPage.set_enrollment_date().type(enrollmentDate);
                            if (socialSecurity) patientPage.set_social_security().type(socialSecurity);
                            if (personalIncome) patientPage.set_personal_income().type(personalIncome);
                            if (householdSize) patientPage.set_household_size().type(householdSize);
                            if (householdIncome) patientPage.set_household_Income().type(householdIncome);
                            if (emailContact) patientPage.set_email_contact().type(emailContact);
                            if (contactPhone) patientPage.set_contact_phone_number().type(contactPhone);
                            if (emergencyContactName) patientPage.set_emergency_contact_name().type(emergencyContactName);
                            if (emergencyRelationship) patientPage.set_emeregency_contact_relationship().type(emergencyRelationship);
                            if (emergencyContactNumber) patientPage.set_emeregency_contact_number().type(emergencyContactNumber);
                            if (bestWayToContact) patientPage.set_best_way_to_contact().type(bestWayToContact);

                            if (housingStatus) {
                                cy.get("[name='housingStatus']").then(dropdown => {
                                    if (dropdown.find(`option[value="${housingStatus}"]`).length) {
                                        patientPage.set_housing_status(housingStatus);
                                    }
                                });
                            }

                            if (mailingAddress) {
                                cy.get("[name='mailingAddress']").then(dropdown => {
                                    if (dropdown.find(`option[value="${mailingAddress}"]`).length) {
                                        patientPage.set_mailing_address(mailingAddress);
                            
                                        // Condition: If "Homeless, needs a permanent mailing address to receive vital documents" is selected
                                        if (mailingAddress === "Homeless, needs a permanent mailing address to receive vital documents") {
                                            cy.log("No additional address fields should open.");
                                        } 
                                        // Condition: If either "Homeless, uses this permanent address to receive vital documents" 
                                        // or "Housed with the following permanent address" is selected, additional fields should open
                                        else if (mailingAddress === "Homeless, uses this permanent address to receive vital documents" ||
                                                 mailingAddress === "Housed with the following permanent address") {
                                            cy.log("Additional address fields should open and fill with provided data.");

                                            // Check and fill additional address fields if data is available
                                            if (addressLine1) patientPage.set_address_line1().type(addressLine1);
                                            if (addressLine2) patientPage.set_address_line2().type(addressLine2);
                                            if (city) patientPage.set_city().type(city);
                                            if (state) patientPage.set_state().type(state);
                                            if (zipCode) patientPage.set_zip_code().type(zipCode);
                                        }
                                    }
                                });
                            }
                            
                            patientPage.set_manager_name().type(managerName);
                            if (managerEmail) patientPage.set_manager_email().type(managerEmail);
                            if (managerPhone) patientPage.set_manager_phone_number().type(managerPhone);
                            if (agency) patientPage.set_agency().type(agency);
                            if (notes) patientPage.set_notes().type(notes);
                        }) .then(() => {
                            // Submit the patient form
                            patientPage.create_patient_btn().click();
                     
                        });
                        cy.wait(2000);
                        cy.get('.ms-3').should('be.visible'); // Check for success message
                        // // Prepare for the next patient
                        cy.wait(3000);
                    });

                    // Log out after completing patients for this user
                    cy.log(`Logging out userID: ${userID}`);
                    loginPage.set_logout();
                });
            });
        });
    });
});


