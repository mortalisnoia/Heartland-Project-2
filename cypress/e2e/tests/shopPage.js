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

        /*cy.fixture('userInformation').then((user) => {
            checkoutPage.fillEmailAdress(user.email);
            checkoutPage.fillFirstName(user.firstName);
            checkoutPage.fillLastName(user.lastName);
            checkoutPage.fillCompany(user.company);
            checkoutPage.fillStreetAdress1(user.streetAdress1);
            checkoutPage.fillStreetAdress2(user.streetAdress2);
            checkoutPage.fillStreetAdress3(user.streetAdress3);
            checkoutPage.fillCity(user.city);
            checkoutPage.fillPostalCode(user.postalCode);
            checkoutPage.fillPhoneNumber(user.phone);
            checkoutPage.selectCountryByText(user.country);
            checkoutPage.selectRegionByText(user.region);
            checkoutPage.clickNextButton();
            cy.contains('Place Order').click();
        });*/
        
})