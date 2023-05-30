import { elements as paymentPageElements } from './elements';

class paymentPage {

    clickPlaceOrderButton() {
        cy.contains(paymentPageElements.placeOrderButton).click();
    }

    assertItIsPaymentPage() {
        cy.contains(paymentPageElements.placeOrderButton).should('be.visible');
    }

    //Cypress can chain calls. This method veryfies if all the user information is shown on the billing page
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

    //Assert that the page URL is the one expected
    assertItIsTheSuccessPage() {
        cy.url().should('contain', paymentPageElements.successPageURL);
    }

    getCartValueByIndex(index) {
        cy.get(paymentPageElements.cartValue).eq(index)
        .invoke('text')
        .invoke('replaceAll', '$', '')
        .then(parseFloat)
    }

    //That's why I used fixtures. On the checkout page I have methods to save the item and shipping prices on a fixture file
    //Here I get these values and compare them with the total value shown on the payment page, to make sure it didn't change
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