import { test } from '../../src/fixtures/todo.fixtures';

test.describe('Deleting todos', () => {
  test('deletes a single todo', async ({ todoPage }) => {
    await todoPage.deleteTodo('Pay electric bill');

    await todoPage.assertTodoAbsent('Pay electric bill');
    await todoPage.assertVisibleRowCount(1);
  });

  test('clears completed todos and hides the Clear completed button', async ({ todoPage }) => {
    await todoPage.toggleTodo('Pay electric bill');
    await todoPage.clearCompleted();

    await todoPage.assertTodoAbsent('Pay electric bill');
    await todoPage.assertClearCompletedHidden();
  });
});
