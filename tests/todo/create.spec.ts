import { test } from '../../src/fixtures/todo.fixtures';

test.describe('Creating todos', () => {
  test('adds a single todo to the end of the list', async ({ todoPage }) => {
    await todoPage.addTodo('Feed the cat');

    await todoPage.assertVisibleRowCount(3);
    await todoPage.assertTodoTitles(['Pay electric bill', 'Walk the dog', 'Feed the cat']);
  });

  for (const task of ['Buy milk', 'Call mom', 'Read book']) {
    test(`adds todo "${task}" and renders it`, async ({ todoPage }) => {
      await todoPage.addTodo(task);
      await todoPage.assertTodoVisible(task);
    });
  }

  test('ignores whitespace-only input', async ({ todoPage }) => {
    await todoPage.addTodo('   ');
    await todoPage.assertVisibleRowCount(2);
  });

  test('updates the active counter when a todo is added', async ({ todoPage }) => {
    await todoPage.addTodo('Feed the cat');
    await todoPage.assertCounter('3 items left');
  });
});
