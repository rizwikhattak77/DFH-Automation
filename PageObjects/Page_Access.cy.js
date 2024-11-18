class AppAccess{
    
    patient_avatar_Locator = "tbody tr:nth-child(1) td:nth-child(1)";
    challenges_Locator = ".cursor-pointer.mr-12.py-2.text-21s.font-medium.border-none.false";
    forms_letters_Locator = "li:nth-child(3) span:nth-child(1) div:nth-child(1)";
    release_information_Locator = "div[class='w-[250px]'] div button[type='button']";
    release_dialog_cancel_bt_Locator = "div[class='col-start-1 col-span-1 justify-self-start'] div button[type='button']";
    uplaod_document_Locator = "button[class='p-3 rounded-md justify-center items-center w-full text-16s h-10 bg-[#006CD0] text-21s text-white !p-0 !px-2 text-nowrap !h-10 !px-3 opacity-100 flex']";
    upload_dialog_cancel_bt_Locator = "button[class='p-3 rounded-md justify-center items-center w-full text-21s text-black-540 border border-[#CDCED6] bg-white opacity-100']";
    



    patient_avatar_click()
    {
        cy.get(this.patient_avatar_Locator).click();
    }

    challenges_lintext_click()
    {
        cy.get(this.challenges_Locator).click();
    }

    formsletters_lintext_click()
    {
        cy.get(this.forms_letters_Locator).click();
    }

    releaseinformation_click()
    {
        cy.get(this.release_information_Locator).click();
    }

    uplaoddocument_click()
    {
        cy.get(this.uplaod_document_Locator).click();
    }

    upload_cancel_bt_click()
    {
        cy.get(this.upload_dialog_cancel_bt_Locator).click();
    }

    release_cancel_bt_click()
    {
        cy.get(this.release_dialog_cancel_bt_Locator).click();
    }


}
export default AppAccess;
                            
               