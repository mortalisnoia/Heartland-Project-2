Feature: Checkout page tests

    Scenario: When I am on the checkout page, the item quantity displayed should be correct

        Given I am on the product page
        And I set all required information
        And I add it to the basket
        When I go to the checkout page
        Then The item quantity displayed should be the same I added

    Scenario: Shipping method missing validation should appear when no option is selected

        Given I am on the product page
        And I set all required information
        And I add it to the basket
        When I go to the checkout page
        And Click the next button without selecting a shipping method
        Then Validation about shipping method being required should be shown

    Scenario: Required form fields validation should be displayed when trying to advance to next page without filling them

        Given I am on the product page
        And I set all required information
        And I add it to the basket
        When I go to the checkout page
        And Select a shipping method
        And Click the next button without filling the form required information
        Then Validation about missing information being required should be shown

    Scenario: Filling all checkout information properly and clicking the next button should direct the user to the payment page

        Given I am on the product page
        And I set all required information
        And I add it to the basket
        When I go to the checkout page
        And I fill all user information properly
        And I click on the next button
        Then The payment information should be accepted
        And I should be directed to payment page
        And My billing information should be visible and correct
        And Total price should be item price, plus quantity, plus shipping price

    Scenario: When I place the order, then the purchase should be done
        Given I am on the product page
        And I set all required information
        And I add it to the basket
        When I go to the checkout page
        And I fill all user information properly
        And I click on the next button
        When I click on the Place Order button
        Then The purchase must be done
