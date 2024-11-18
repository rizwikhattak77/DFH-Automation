class Patients{

    Patients_txt_Locator = "body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1)"
    Add_Patient_Btn_Locator = "button[class='p-3 rounded-md justify-center items-center w-full text-21s text-white border border-0 bg-[#006CD0] text-white text-21s font-medium justify-center bg-[#006CD0] opacity-100']"
    Upload_Photo_Locator = "div[class='mt-4'] div button[type='button']"
    Choose_File_Locator = "[type = 'file']"
    Save_Crop_Butto_Locator = "div[class='col-start-3 col-span-2'] div button[type='button']"
    First_Name_Locator = "[name='firstName']"
    Middle_Name_Locator = "[name = 'middleName']"
    Last_Name_Locator = "[name='lastName']"
    DOB_Locator = "body > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > form:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > input:nth-child(1)"
    Create_patient_Locator = ".my-4 > .col-start-5 > .flex > :nth-child(2) > div > .p-3"
    Race_Locator = "[name = 'race']"
    Relationship_status_Locator = "[name = 'relationshipStatus']"
    Gender_Locator = "div[class='flex-col relative']"
    Ethnicity_Locator = "[name = 'ethnicity']"
    Primary_Language_Locator= "[name = 'primaryLanguage']"
    Education_Locator = "[name = 'education']"
    Medical_Provider_Locator= "[name='medicalProvider']"
    Responsible_Individual_Locator = ".flex.items-center.border.form-input.p-1.space-x-1.rounded.opacity-100"
    Enrollement_Date_Locator= "input[placeholder='MM-DD-YYYY'][value='10-31-2024']"
    Social_Security_Number_Locator = "[name='socialSecurityNumber']"
    Personal_Income_Locator = "[name='personalIncome']"
    House_Hold_Size_Locator = "[name='householdSize']"
    House_Hold_Income_Locator = "[name='householdIncome']"
    Contact_Email_Locator= "[name='email']"
    Contact_Phone_Number_Locator = "div[class='grid grid-flow-row-dense grid-cols-4 gap-5'] input[placeholder='+1 890-989-0000']"
    Emergency_Contact_Name_Locator = "[name = 'emergencyContactName']"
    Emergency_Contact_Relationship_Locator ="[name = 'emergencyContactRelationship']"
    Emergency_Contact_Locator = "[name = 'emergencyContact']"
    Best_Way_To_Contact_Locator = "[name = 'bestWayToContact']"
    Housing_Status_Locator = "[name = 'housingStatus']"
    Mailing_Address_Locator = "[name = 'mailingAddress']"
    Address_Line1_Locator = "[name = 'address.address1']"
    Address_Line2_Locator = "[name = 'address.address2']"
    City_Locator = "[name = 'address.city']"
    State_Locator = "[name = 'address.state']"
    Zip_Code_Locator = "[name = 'address.zipCode']"
    Manager_Full_Name_Locator = "[name = 'externalCaseManagers[0].fullName']"
    Manager_Email = "[name = 'externalCaseManagers[0].email']"
    Manager_Phone_Number_Locator = "div[class='bottom-1.5 relative'] div div input[placeholder='+1 890-989-0000']"
    Agency_Locator = "[name='externalCaseManagers[0].agency']"
    Notes_Locator = "[name='externalCaseManagers[0].notes']"
    



    click_patient_btn()
    
    {
        return cy.get(this.Patients_txt_Locator)
    }

    click_add_patient_btn()
    
    {
        return cy.get(this.Add_Patient_Btn_Locator)
    }

    set_upload_photo()
    {
        return cy.get(this.Upload_Photo_Locator)
    }
    set_choose_file()
    {
        return cy.get(this.Choose_File_Locator)
    }

    set_crop_save_button()
    {
        return cy.get(this.Save_Crop_Butto_Locator)
    }

    enter_first_name_txt()
    
    {
        return cy.get(this.First_Name_Locator)
    }

    set_middle_name()
    {
        return cy.get(this.Middle_Name_Locator)
    }

    enter_last_name_txt()
    
    {
        return cy.get(this.Last_Name_Locator)
    }

    click_dob_field()
    
    {
        return cy.get(this.DOB_Locator)
        
    }

    create_patient_btn() 
    
    {
        return cy.get(this.Create_patient_Locator)
    }
    
    body_click()
    {

        return cy.get('body')
    }

    set_race(dropdownValue)
    {

        cy.get(this.Race_Locator).select(dropdownValue);
    }

    set_relationship_status(dropdownValue)
    {

        cy.get(this.Relationship_status_Locator).select(dropdownValue);
    }
    set_gender(genderValue) {
        cy.get(this.Gender_Locator).within(() => {
            if (genderValue === 'Male') 
                    {
                cy.get('.grid > :nth-child(1) > .p-3').click();// Adjust the selector based on your HTML structure
                } 
                else if (genderValue === 'Female') 
                    {
                cy.get(':nth-child(2) > .p-3').click();
                    } 
                else if (genderValue === 'Non-Binary') 
                    {
                        cy.get(':nth-child(3) > .p-3').click();
                    } 
                else if (genderValue === 'Other') 
                    {
                cy.get(':nth-child(4) > .p-3').click();
                    }
        });
        
    }

    set_ethnicity(dropdownValue)
    {

        cy.get(this.Ethnicity_Locator).select(dropdownValue);
    }
    

    set_primary_language(dropdownValue)
    {

        cy.get(this.Primary_Language_Locator).select(dropdownValue);
    }

    set_education(dropdownValue)
    {

        cy.get(this.Education_Locator).select(dropdownValue);
    }

    set_medical_provider()
    {
        return cy.get(this.Medical_Provider_Locator)
    }

    set_responsible_individual(responsibleIndividual)
    {
        cy.get(this.Responsible_Individual_Locator).click()
        cy.get("input[placeholder='Search']").type(responsibleIndividual)
        cy.get(".absolute.bg-white.border.p-2.w-full.border-t-0.rounded-b.z-50").click()
    }

    set_enrollment_date()
    {
        return cy.get(this.Enrollement_Date_Locator)
    }

    set_social_security()
    {
        return cy.get(this.Social_Security_Number_Locator)
    }

    set_personal_income()
    {
        return cy.get(this.Personal_Income_Locator)
    }

    set_household_size()
    {
        return cy.get(this.House_Hold_Size_Locator)
    }

    set_household_Income()
    {
        return cy.get(this.House_Hold_Income_Locator)
    }

    set_email_contact()
    {
        return cy.get(this.Contact_Email_Locator)
    }

    set_contact_phone_number()
    {
        return cy.get(this.Contact_Phone_Number_Locator)
    }

    set_emergency_contact_name()
    {
        return cy.get(this.Emergency_Contact_Name_Locator)
    }


    set_emeregency_contact_relationship()
    {
        return cy.get(this.Emergency_Contact_Relationship_Locator)
    }

    set_emeregency_contact_number()
    {
        return cy.get(this.Emergency_Contact_Locator)
    }

    set_best_way_to_contact()
    {
        return cy.get(this.Best_Way_To_Contact_Locator)
    }

    set_housing_status(dropdownValue)
    {

        cy.get(this.Housing_Status_Locator).select(dropdownValue);
    }

    set_mailing_address(dropdownValue)
    {

        cy.get(this.Mailing_Address_Locator).select(dropdownValue);
    }

    set_address_line1()
    {

        return cy.get(this.Address_Line1_Locator);
    }

    set_address_line2()
    {

        return cy.get(this.Address_Line2_Locator);
    }

    set_city()
    {

        return cy.get(this.City_Locator);
    }

    set_state()
    {

        return cy.get(this.State_Locator);
    }

    set_zip_code()
    {

        return cy.get(this.Zip_Code_Locator);
    }

    set_manager_name()
    {
        return cy.get(this.Manager_Full_Name_Locator)
    }

    set_manager_email()
    {
        return cy.get(this.Manager_Email)
    }

    set_agency()
    {
        return cy.get(this.Agency_Locator)
    }

    set_manager_phone_number()
    {
        return cy.get(this.Manager_Phone_Number_Locator)
    }

    set_notes()
    {
        return cy.get(this.Notes_Locator)
    }

}


export default Patients;