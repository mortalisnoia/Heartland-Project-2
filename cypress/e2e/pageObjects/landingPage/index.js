class landingPage {

    //Goes to the baseUrl contained on the cypress.config.js file
    openLandingPage() {
        cy.visit('/');
    }

} export default new landingPage();