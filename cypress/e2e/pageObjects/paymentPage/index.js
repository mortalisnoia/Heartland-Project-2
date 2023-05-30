import { elements as paymentPageElements } from './elements';

class paymentPage {

    clickPlaceOrderButton() {
        cy.contains(paymentPageElements.placeOrderButton).click();
    }

    assertItIsPaymentPage() {
        cy.contains(paymentPageElements.placeOrderButton).should('be.visible');
    }

    assertUserBillingInformationIsCorrect() {
        cy.fixture('utils.json').then((utils) => {
            cy.get(paymentPageElements.userBillingInformation).should('contain.text', utils.firstName)
            .and('contain.text', utils.lastName)
            .and('contain.text', utils.streetAdress1)
            .and('contain.text', utils.streetAdress2)
            .and('contain.text', utils.streetAdress3)
            .and('contain.text', utils.city)
            .and('contain.text', utils.region)
            .and('contain.text', utils.country)
            .and('contain.text', utils.postalCode)
            .and('contain.text', utils.phone);
        })
    }

    assertSuccessMessageIsShown() {
        cy.contains(paymentPageElements.successMessage).should('be.visible');
    }

    assertItIsTheSuccessPage() {
        cy.url().should('contain', paymentPageElements.successPageURL);
    }

    getCartValueByIndex(index) {
        cy.get(paymentPageElements.cartValue).eq(index)
        .invoke('text')
        .invoke('replaceAll', '$', '')
        .then(parseFloat)
    }

    assertTotalValueIsCorrect() {
        cy.get(paymentPageElements.cartValue).should('be.visible').then(() => {
            cy.fixture('utils.json').then((utils) => { 
                cy.get(paymentPageElements.cartValue)
                .invoke('text')
                .invoke('replaceAll', '$', '')
                .then(parseFloat).then((total) => {
                    let totalItemPrice = utils.itemPrice * utils.quantity;
                    expect(total).to.equal(totalItemPrice + utils.shippingPrice);
                })
            });
        });
        
        
    }

} export default new paymentPage();