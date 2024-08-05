Feature: Home Page Links

  Scenario: Pictures Link
    Given I am on the homepage
    When I click the pictures link
    Then I should land on the pictures page

  Scenario: Linkedin Link
    Given I am on the homepage
    When I click the linkedin link
    Then I should land on my linkedin page

  Scenario: Resume PDF Link
    Given I am on the homepage
    When I click the Resume PDF link
    Then I should download my Resume PDF file

  Scenario: Cover Letter Link
    Given I am on the homepage
    When I click the Cover Letter link
    Then I should download my Cover letter file
  
  Scenario: Javascript Automation Github Link
    Given I am on the homepage
    When I click the Javascript Automation Github link
    Then I should land on my Javascript Automation Github page

  Scenario: QA Manifesto PDF Link
    Given I am on the homepage
    When I click the QA Manifesto PDF link
    Then I should download my QA Manifesto file

  Scenario: Time of Day Github Link
    Given I am on the homepage
    When I click the Time of Day Github Link
    Then I should land on my Time of Day Github page