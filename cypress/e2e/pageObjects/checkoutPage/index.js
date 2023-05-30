import { elements as checkoutPageElements } from './elements';

class checkoutPage {

    fillEmailAdress(email) {
        cy.get(checkoutPageElements.emailInput).clear().type(email);
    }

    fillFirstName(firstName) {
        cy.get(checkoutPageElements.firstNameInput).clear().type(firstName);
    }

    fillLastName(lastName) {
        cy.get(checkoutPageElements.lastNameInput).clear().type(lastName);
    }

    fillCompany(company) {
        cy.get(checkoutPageElements.companyInput).clear().type(company);
    }

    fillStreetAdress1(streetAdress) {
        cy.get(checkoutPageElements.street1Input).clear().type(streetAdress);
    }

    fillStreetAdress2(streetAdress) {
        cy.get(checkoutPageElements.street2Input).clear().type(streetAdress);
    }

    fillStreetAdress3(streetAdress) {
        cy.get(checkoutPageElements.street3Input).clear().type(streetAdress);
    }

    fillAllStreetAddresses(adress1, adress2, adress3) {
        this.fillStreetAdress1(adress1);
        this.fillStreetAdress2(adress2);
        this.fillStreetAdress3(adress3);
    }

    fillCity(city) {
        cy.get(checkoutPageElements.cityInput).clear().type(city);
    }

    fillPostalCode(postalCode) {
        cy.intercept('/rest/**').as('postalOptionsLoad');
        cy.get(checkoutPageElements.postalCodeInput).clear().type(postalCode);
        cy.wait('@postalOptionsLoad');
    }

    selectCountryByText(country) {
        cy.get(checkoutPageElements.countryDropdown).select(country);
    }

    selectRegionByText(state) {
        cy.intercept('https://magento.softwaretestingboard.com/rest/default/V1/guest-carts/**').as('shippingOptionsLoad');
        cy.get(checkoutPageElements.regionDropdown).select(state);
        cy.wait('@shippingOptionsLoad');
    }

    fillPhoneNumber(phone) {
        cy.get(checkoutPageElements.phoneInput).clear().type(phone);
    }

    selectFirstShippingMethod() {
        cy.get(checkoutPageElements.shippingMethodRadioButton).first().check();
    }

    getShippingMethodPrice() {
        cy.get(checkoutPageElements.shippingMethodPrice).eq(0).invoke('text')
        .invoke('replaceAll', '$', '')
        .then(parseFloat).then((shippingPrice) => {
            cy.readFile("cypress/fixtures/utils.json", (err, data) => {
                if (err) {
                    return console.error(err);
                };
            }).then((data) => {
                data.shippingPrice = shippingPrice;
                console.log("shippingPrice " + shippingPrice);
                cy.writeFile("cypress/fixtures/utils.json", JSON.stringify(data))
            })
        }); 
    }

    getTotalPriceOnCart() {
        cy.get(checkoutPageElements.shippingMethodPrice).eq(2).invoke('text')
        .invoke('replaceAll', '$', '')
        .then(parseFloat);
    }

    getItemQuantityOncart() {
        return cy.get(checkoutPageElements.itemQuantity)
        .invoke('value');
    }

    clickNextButton() {
        cy.get(checkoutPageElements.nextButton).click();
    }

    assertRequiredFieldValidationMessageWasShown() {
        cy.contains('This is a required field').should('be.visible');
    }

    assertShippingMethodValidationWasShown() {
        cy.contains('The shipping method is missing. Select the shipping method and try again').should('be.visible');
    }

    assertItemQuantityIsCorrect(quantity) {
        
        cy.get(checkoutPageElements.expandCartItemsChevron).click().then(() => {
            cy.get(checkoutPageElements.itemQuantity).invoke('text')
            .then(parseFloat).should('equal', quantity);
        }); 
    }

    clickChevronExpandCartItems() {
        cy.get(checkoutPageElements.expandCartItemsChevron).click();
    }

    fillAllFormInformationProperly() {
        cy.fixture('utils.json').then((utils) => {
            this.fillEmailAdress(utils.email);
            this.fillFirstName(utils.firstName);
            this.fillLastName(utils.lastName);
            this.fillCompany(utils.company);
            this.fillAllStreetAddresses(utils.streetAdress1, utils.streetAdress2, utils.streetAdress3);
            this.fillCity(utils.city);
            this.fillPostalCode(utils.postalCode);
            this.fillPhoneNumber(utils.phone);
            this.selectCountryByText(utils.country);
            this.selectRegionByText(utils.region);
        })
    }

    assertPaymentInformationWasAccepted(){
        cy.intercept('POST', 'https://magento.softwaretestingboard.com/rest/default/V1/guest-carts/**').as('paymentInformation');
        cy.wait('@paymentInformation').then((request) => {
            expect(request.response.statusCode).to.eq(200);
        })
    }


} export default new checkoutPage();