import { elements as productPageElements } from './elements';

class productPage {

    selectProductSizeByText(text) {
        cy.contains(text).click();
    }

    assertProductSizeSelected(size) {
        cy.get(productPageElements.sizeSelected).should('have.text', size);
    }

    selectColorByIndex(index) {
        cy.get(productPageElements.colorOptions).eq(index).click();
    }

    //Set the item quantity on the cart and save this number on a fixture file
    //It will be used later on the payment page to check if the item quantity didn't change during the process
    setItemQuantity(quantity) {
        cy.get(productPageElements.quantityInput).clear().type(quantity);
        cy.readFile("cypress/fixtures/utils.json", (err, data) => {
            if (err) {
                return console.error(err);
            };
        }).then((data) => {
            data.quantity = quantity;
            cy.writeFile("cypress/fixtures/utils.json", JSON.stringify(data))
        })
    }

    //After clicking on this button, a request is intercepted and we wait for it to end
    //It improves the run time of the tests, since it waits just for the needed time before continuing
    clickAddToCartButton() {
        cy.intercept('/customer/section/load/**').as('addToCart');
        cy.get(productPageElements.addToCartButton).click().then(() => {
            cy.wait('@addToCart');
        });
    }

    clickAddToCartButtonWithValidation() {
        cy.get(productPageElements.addToCartButton).click();
    }

    assertProductHasStockAvailable() {
        cy.get(productPageElements.stockAvailable).should('contain.text', 'In stock');
    }

    assertAddToCartButtonIsVisible() {
        cy.get(productPageElements.addToCartButton).should('be.visible');
    }

    assertValidationMessageWasShown() {
        cy.contains('This is a required field').should('be.visible');
    }

    //Go directly to a product page, to prevent more actions that are not important for a specific test case
    goStraightToProductPage() {
        cy.visit('/breathe-easy-tank.html');
    }

    //Get the item price on the product page, removes the symbol and stores the value on the fixture file
    //It will be used later on the payment page to check if the item price didn't change during the process
    getItemPrice() {
        cy.get(productPageElements.price).eq(0)
        .invoke('text')
        .invoke('replaceAll', '$', '')
        .then(parseFloat).then((itemPrice) => {
            cy.readFile("cypress/fixtures/utils.json", (err, data) => {
                if (err) {
                    return console.error(err);
                };
            }).then((data) => {
                data.itemPrice = itemPrice;
                cy.writeFile("cypress/fixtures/utils.json", JSON.stringify(data))
            })
        });
        
    }

} export default new productPage();