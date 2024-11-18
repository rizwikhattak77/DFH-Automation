class Reporting {

    Reporting_Locator = "body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1)"
    Download_CSV_Button_Locator = "button[class='p-3 rounded-md justify-center items-center w-full text-21s text-black-540 border border-[#CDCED6] bg-white px-4 !h-10 opacity-100 flex']"
    Download_Button_Locator = "button[class='p-3 rounded-md justify-center items-center w-full text-16s h-11 bg-[#006CD0] text-21s text-white text-sm font-medium p-2.5 opacity-100']"


    reporting_bt() 
    
    {
        return cy.get(this.Reporting_Locator).click();
    }

    download_csv_btn(optionsToSelect) 
    {
        // Wait for the download button to be visible
        cy.get(this.Download_CSV_Button_Locator)
           .should('be.visible')
           .click(); // Click to open dialog box

        // Wait for the dialog box to be visible
        cy.get('.p-6').should('exist'); // Ensure the element exists before interacting

        // Select checkboxes based on options in Excel
        optionsToSelect.forEach((option, index) => {
            cy.get(`:nth-child(${index + 1}) > .rounded-sm`).then((checkbox) => {
                if (option) { // If option is true (selected in Excel), click the checkbox
                    cy.wrap(checkbox).click();
                }
            });
        });
        
    
    }

    download_btn_click()
    {
            
        cy.get(this.Download_Button_Locator).should('be.visible').click(); // Click the final download button 
    }
}

export default Reporting;
 