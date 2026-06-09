import { test } from '../../src/fixtures/todo.fixtures';

test.describe('Completing todos', () => {
  test('marks a single todo as completed', async ({ todoPage }) => {
    await todoPage.toggleTodo('Pay electric bill');

    await todoPage.assertTodoCompleted('Pay electric bill');
    await todoPage.assertCounter('1 item left');
  });

  test('un-completes a previously completed todo', async ({ todoPage }) => {
    await todoPage.toggleTodo('Pay electric bill');
    await todoPage.assertTodoCompleted('Pay electric bill');

    await todoPage.toggleTodo('Pay electric bill');

    await todoPage.assertTodoNotCompleted('Pay electric bill');
    await todoPage.assertCounter('2 items left');
  });

  test('marks all todos as complete', async ({ todoPage }) => {
    await todoPage.deleteTodo('Pay electric bill');
    await todoPage.deleteTodo('Walk the dog');
    await todoPage.addTodo('Task one');
    await todoPage.addTodo('Task two');

    await todoPage.toggleAllTodos();

    await todoPage.assertTodoCompleted('Task one');
    await todoPage.assertTodoCompleted('Task two');
    await todoPage.assertCounter('0 items left');
  });
});
