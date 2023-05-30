Feature: Product page options selection

    Scenario: When I open the product page, the product must be in stock and add to cart button should be visible

        Given I am on the shop page
        When I filter for some category
        And I open a product page
        And There is stock available
        Then The button add to cart must be displayed

    Scenario: When I try to add the product to cart without selecting color and size, validation message should appear

		Given I am on the shop page
        When I filter for some category
		And I open a product page
        And Click on add to cart without selecting color and size
		Then The validation message should appear

    Scenario: Clicking on add to cart with all information set should add it properly to cart

        Given I am on a product page
        And I set color, size and quantity
        And I click on the add to cart button
        When I click on the mini cart button
        Then Cart should show my item