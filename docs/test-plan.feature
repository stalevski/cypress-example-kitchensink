# Test Plan: Kitchen Sink ToDo Application

Application under test: `http://localhost:8080/todo`
Framework: Playwright + TypeScript (Page Object Model, Allure reporting)

Written in Gherkin. Each scenario maps to a test under `tests/todo/`.

---

Feature: Default todo list

  Background:
    Given I open the ToDo application with the default todos

  Scenario: The list shows the two seeded todos by default
    Then the todo list should contain 2 items
    And the todo titles should be:
      | Pay electric bill |
      | Walk the dog      |

---

Feature: Creating todos

  Background:
    Given I open the ToDo application with the default todos

  Scenario: Add a single todo
    When I add the todo "Feed the cat"
    Then the todo list should contain 3 items
    And the last todo should read "Feed the cat"

  Scenario Outline: Add multiple todos
    When I add the todo "<task>"
    Then the todo "<task>" should be visible

    Examples:
      | task      |
      | Buy milk  |
      | Call mom  |
      | Read book |

  Scenario: Whitespace-only todos are ignored
    When I add the todo "   "
    Then the todo list should contain 2 items

  Scenario: The active counter reflects the number of open todos
    When I add the todo "Feed the cat"
    Then the counter should read "3 items left"

---

Feature: Completing todos

  Background:
    Given I open the ToDo application with the default todos

  Scenario: Mark a single todo as completed
    When I mark the todo "Pay electric bill" as completed
    Then the todo "Pay electric bill" should be completed
    And the counter should read "1 item left"

  Scenario: Mark a completed todo as active
    Given I mark the todo "Pay electric bill" as completed
    When I mark the todo "Pay electric bill" as active
    Then the todo "Pay electric bill" should not be completed
    And the counter should read "2 items left"

  Scenario: Mark all todos as completed
    When I mark all todos as completed
    Then the todo "Pay electric bill" should be completed
    And the todo "Walk the dog" should be completed
    And the counter should read "0 items left"

---

Feature: Editing todos

  Background:
    Given I open the ToDo application with the default todos

  Scenario: Edit a todo title via double-click
    Given I add the todo "Buy milk"
    When I edit the todo "Buy milk" to "Buy oat milk"
    Then the todo should now read "Buy oat milk"

---

Feature: Deleting todos

  Background:
    Given I open the ToDo application with the default todos

  Scenario: Delete a single todo
    When I delete the todo "Pay electric bill"
    Then the todo "Pay electric bill" should not exist
    And the todo list should contain 1 item

  Scenario: Clear all completed todos
    Given I mark the todo "Pay electric bill" as completed
    When I clear completed todos
    Then the todo "Pay electric bill" should not exist
    And the "Clear completed" button should not be visible

---

Feature: Filtering todos

  Background:
    Given I open the ToDo application with the default todos
    And I mark the todo "Pay electric bill" as completed

  Scenario: Filter shows only active todos
    When I filter the list by "Active"
    Then the todo list should contain 1 item
    And the todo "Walk the dog" should be visible
    And the todo "Pay electric bill" should not be visible

  Scenario: Filter shows only completed todos
    When I filter the list by "Completed"
    Then the todo list should contain 1 item
    And the todo "Pay electric bill" should be visible
    And the todo "Walk the dog" should not be visible

  Scenario: Filter back to all todos
    When I filter the list by "Completed"
    And I filter the list by "All"
    Then the todo list should contain 2 items

