import navbar from "../pageObjects/navbar/index.js";
import shopPage from "../pageObjects/shopPage/index.js";
import productPage from "../pageObjects/productPage/index.js";
import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps";

Given("I am on the shop page", () => {
    shopPage.openShopPage();
})

When("I filter for some category", () => {
    shopPage.selectFilter(0,0);
})

And("I open a product page", () => {
    shopPage.clickOnProductByIndex(0);
})

And("There is stock available", () => {
    productPage.assertProductHasStockAvailable();
})

Then("The button add to cart must be displayed", () => {
    productPage.assertAddToCartButtonIsVisible();
})

And("Click on add to cart without selecting color and size", () => {
    productPage.clickAddToCartButtonWithValidation();
})

Then("The validation message should appear", () => {
    productPage.assertValidationMessageWasShown();
})

Given("I am on a product page", () => {
    productPage.goStraightToProductPage();
})

And("I set color, size and quantity", () => {
    productPage.selectProductSizeByText('XS');
    productPage.selectColorByIndex(1);
    productPage.setItemQuantity(5);
})

And("I click on the add to cart button", () => {
    productPage.clickAddToCartButton();
})

When("I click on the mini cart button", () => {
    navbar.clickOpenMiniCartButton();
})

Then("Cart should show my item", () => {
    navbar.assertProductIsShown();
})