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

    goStraightToProductPage() {
        cy.visit('/breathe-easy-tank.html');
    }

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