import navbar from "../pageObjects/navbar/index.js";
import shopPage from "../pageObjects/shopPage/index.js";
import landingPage from "../pageObjects/landingPage/index.js";
import productPage from "../pageObjects/productPage/index.js";
import checkoutPage from "../pageObjects/checkoutPage/index.js";
import {Given, When, Then} from "cypress-cucumber-preprocessor/steps";

Given('I go to the landing page', () => {
    landingPage.openLandingPage();
})

When("I go to the shop page", () => {
    navbar.clickWomenTopsSection();
})

Then('Some products should be displayed', () => {
    shopPage.assertProductsAreDisplayed();
})

Given("I am on the shop page", () => {
    shopPage.openShopPage();
})

When("I filter for a product category", () => {
    shopPage.selectFilter(0,0);
})

Then("The number of products shown should be the same as the count on the filter", () => {
    shopPage.assertNumberOfProductsListedIsEqualToFilterCount(); 
})