import navbar from "../pageObjects/navbar/index.js";
import checkoutPage from "../pageObjects/checkoutPage/index.js";
import productPage from "../pageObjects/productPage/index.js";
import paymentPage from "../pageObjects/paymentPage/index.js";
import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps";

const itemQuantity = 5;
const itemSize = 'XS';

Given("I am on the product page", () => {
    productPage.goStraightToProductPage();
    productPage.getItemPrice();
})

And("I set all required information", () => {
    productPage.selectProductSizeByText(itemSize);
    productPage.selectColorByIndex(1);
    productPage.setItemQuantity(itemQuantity);
})

And("I add it to the basket", () => {
    productPage.clickAddToCartButton();
})

When("I go to the checkout page", () => {
    navbar.clickOpenMiniCartButton();
    navbar.clickProceedToCheckoutButton();
})

Then("The item quantity displayed should be the same I added", () => {
    checkoutPage.clickChevronExpandCartItems();
    checkoutPage.assertItemQuantityIsCorrect(itemQuantity);
})

And("Click the next button without selecting a shipping method", () => {
    checkoutPage.clickNextButton();
})

Then("Validation about shipping method being required should be shown", () => {
    checkoutPage.assertShippingMethodValidationWasShown();
})

And("Select a shipping method", () => {
    checkoutPage.selectFirstShippingMethod();
})

And("Click the next button without filling the form required information", () => {
    checkoutPage.clickNextButton();
})

Then("Validation about missing information being required should be shown", () => {
    checkoutPage.assertRequiredFieldValidationMessageWasShown();
})

And("I fill all user information properly", () => {
    checkoutPage.fillAllFormInformationProperly();
    checkoutPage.getShippingMethodPrice();
})

And("I click on the next button", () => {
    checkoutPage.clickNextButton();
})

Then("The payment information should be accepted", () => {
    checkoutPage.assertPaymentInformationWasAccepted();
})

And("I should be directed to payment page", () => {
    paymentPage.assertItIsPaymentPage();
})

And("My billing information should be visible and correct", () => {
    paymentPage.assertUserBillingInformationIsCorrect();
})

And("Total price should be item price, plus quantity, plus shipping price",() => {
    paymentPage.assertTotalValueIsCorrect();
})

When("I click on the Place Order button", () => {
    paymentPage.clickPlaceOrderButton();
})

Then("The purchase must be done", () => {
    paymentPage.assertSuccessMessageIsShown();
    paymentPage.assertItIsTheSuccessPage();
})