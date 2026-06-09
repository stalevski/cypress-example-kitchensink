import { test } from '../../src/fixtures/todo.fixtures';
import { TodoFilter } from '../../src/pages/todo.page';

test.describe('Filtering todos', () => {
  test.beforeEach(async ({ todoPage }) => {
    await todoPage.toggleTodo('Pay electric bill');
  });

  test('shows only active todos', async ({ todoPage }) => {
    await todoPage.filterBy(TodoFilter.Active);

    await todoPage.assertVisibleRowCount(1);
    await todoPage.assertTodoVisible('Walk the dog');
    await todoPage.assertTodoAbsent('Pay electric bill');
  });

  test('shows only completed todos', async ({ todoPage }) => {
    await todoPage.filterBy(TodoFilter.Completed);

    await todoPage.assertVisibleRowCount(1);
    await todoPage.assertTodoVisible('Pay electric bill');
    await todoPage.assertTodoAbsent('Walk the dog');
  });

  test('returns to all todos', async ({ todoPage }) => {
    await todoPage.filterBy(TodoFilter.Completed);
    await todoPage.assertVisibleRowCount(1);

    await todoPage.filterBy(TodoFilter.All);
    await todoPage.assertVisibleRowCount(2);
  });
});
