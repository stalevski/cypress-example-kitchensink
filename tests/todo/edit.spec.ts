import { test } from '../../src/fixtures/todo.fixtures';

test.describe('Editing todos', () => {
  test('renames a todo via double-click', async ({ todoPage }) => {
    await todoPage.addTodo('Buy milk');

    await todoPage.editTodo('Buy milk', 'Buy oat milk');

    await todoPage.assertTodoVisible('Buy oat milk');
    await todoPage.assertTodoAbsent('Buy milk');
  });
});
