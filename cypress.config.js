const { defineConfig } = require("cypress");
const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');


module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,                 // Enable charts in the report
    reportPageTitle: 'Test Report',
    embeddedScreenshots: true,    // Embed screenshots (if any)
    inlineAssets: true,           // Include assets inline in the report
    code: false                   // Exclude code from the report
  },
  env: {
    dev: "http://docsforhealthwebdev.s3-website-us-east-1.amazonaws.com",
    staging: "http://docsforhealthwebstaging.s3-website-us-east-1.amazonaws.com",
    prod: "https://demo.docsforhealth.org",
    // Add default base URL to use when no environment is specified
    BASE_URL: "http://docsforhealthwebstaging.s3-website-us-east-1.amazonaws.com"
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on('task', {
        parseXlsx({ filePath }) {
          return new Promise((resolve, reject) => {
            try {
              const xlData = xlsx.parse(fs.readFileSync(filePath));
              resolve(xlData);
            } catch (e) {
              reject(e);
            }
          });
        }
      });

            // Ensure BASE_URL is set from environment (dev, staging, prod)
            const environment = config.env.environment || 'staging'; // Default to 'staging'
            config.baseUrl = config.env[environment] || config.env.BASE_URL;
      
            // Return the updated config object
            return config;
    },
  },
});


