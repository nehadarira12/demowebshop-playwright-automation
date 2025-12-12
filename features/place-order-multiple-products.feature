Feature: Place order with multiple products

  Scenario: Add books to cart and verify price calculations
    Given I am on the Demo Web Shop home page
    When I navigate to the Books category
    And I add the following books to the cart
      | name                   |
      | Computing and Internet |
      | Fiction                |
    And I open the cart from the notification
    Then the cart should show the correct items
    And the cart subtotal should be correct
    And I accept the terms and conditions
    And I click the checkout button
    When I checkout as a guest user
    And I continue from the billing step
    When I select the billing country
    And I fill in the remaining billing address details
    And I continue from the billing step
    And I continue from the shipping step
    And I continue from the shipping method step
    And I continue from the payment method step
    And I continue from the payment information step
    Then the price totals should be correct
    And I confirm the order
    Then the order should be successfully processed
