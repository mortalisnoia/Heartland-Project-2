import { elements as shopPageElements } from './elements';

class shopPage {

    //Click on the main category filter, at left of the shop filter
    clickCategoryFilterByIndex(index) {
        cy.get(shopPageElements.filterCategory).eq(index).click();
    }

    ////Click on the secondary category filter, at left of the shop filter
    clickSubCategoryFilterByIndex(index) {
        cy.get(shopPageElements.filterSubCategory).eq(index).click();
    }

    selectFilter(categoryIndex, subCategoryIndex) {
        //This fix wait was necessary because the page doesn't make any requests, 
        //and yet it opens the filter itself and then close it for no reason. I'm waiting for this bad behavior to end before testing
        cy.wait(1000).then(() => {
            this.clickCategoryFilterByIndex(categoryIndex);
            this.clickSubCategoryFilterByIndex(subCategoryIndex);
        })
    }

    //make sure at least one product is shown on the page
    assertProductsAreDisplayed() {
        cy.get(shopPageElements.product).should('have.length.greaterThan', 0);
    }

    //Get the count of the filter on the left of the screen, than counts the number of elements shown and compare them
    assertNumberOfProductsListedIsEqualToFilterCount() {
        cy.get(shopPageElements.filterSubCategoryCount).invoke('text')
            .then((filterCount) => {
                cy.get(shopPageElements.product).should('have.length', filterCount)
        })
        
    }

    openShopPage() {
        cy.visit('/women/tops-women.html');
    }

    getProductPrice(index) {
        return cy.get(shopPageElements.product).eq(index).find(shopPageElements.price)
        .invoke('text')
        .invoke('replaceAll', '$', '')
        .then(parseFloat);
    }

    clickOnProductByIndex(index) {
        cy.get(shopPageElements.product).eq(index).click();
    }

} export default new shopPage();