import { test } from '../../src/fixtures/todo.fixtures';
import { DEFAULT_TODOS } from '../../src/data/todos';

test.describe('Default todo list', () => {
  test('shows the two seeded todos by default', async ({ todoPage }) => {
    await todoPage.assertVisibleRowCount(2);
    await todoPage.assertTodoTitles([...DEFAULT_TODOS]);
  });

  test('counter starts at "2 items left"', async ({ todoPage }) => {
    await todoPage.assertCounter('2 items left');
  });
});
