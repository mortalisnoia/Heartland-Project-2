Feature: Opening the browser and going to the shop page

    Scenario: When I open the shop page, products should be displayed

        Given I go to the landing page
        When I go to the shop page
        Then Some products should be displayed

    Scenario: Filter for a category should show the same amount of products as the count shows

		Given I am on the shop page
		When I filter for a product category
		Then The number of products shown should be the same as the count on the filter