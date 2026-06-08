import { expect, type Locator, type Page, test } from '@playwright/test';
import { BasePage } from './base.page';

export enum TodoFilter {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export class TodoPage extends BasePage {
  readonly newTodoInput: Locator;
  readonly todoItems: Locator;
  readonly todoLabels: Locator;
  readonly toggleAllLabel: Locator;
  readonly todoCount: Locator;
  readonly clearCompletedButton: Locator;

  constructor(page: Page) {
    super(page);
    this.newTodoInput = page.getByTestId('new-todo');
    this.todoItems = page.locator('.todo-list').getByRole('listitem');
    this.todoLabels = this.todoItems.locator('label');
    this.toggleAllLabel = page.getByText('Mark all as complete');
    this.todoCount = page.locator('.todo-count');
    this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
  }

  async goto(): Promise<void> {
    await test.step('Open the ToDo application', async () => {
      await this.visit('/todo');
      await expect(this.newTodoInput).toBeVisible();
    });
  }

  async addTodo(title: string): Promise<void> {
    await test.step(`Add todo "${title}"`, async () => {
      await this.newTodoInput.fill(title);
      await this.newTodoInput.press('Enter');
    });
  }

  todoByTitle(title: string): Locator {
    return this.todoItems.filter({ has: this.page.getByText(title, { exact: true }) });
  }

  async toggleTodo(title: string): Promise<void> {
    await test.step(`Toggle completion of "${title}"`, async () => {
      await this.todoByTitle(title).getByRole('checkbox').click();
    });
  }

  async deleteTodo(title: string): Promise<void> {
    await test.step(`Delete todo "${title}"`, async () => {
      const row = this.todoByTitle(title);
      await row.hover();
      await row.locator('.destroy').click();
    });
  }

  async editTodo(currentTitle: string, newTitle: string): Promise<void> {
    await test.step(`Edit todo "${currentTitle}" -> "${newTitle}"`, async () => {
      const row = this.todoByTitle(currentTitle);
      await row.locator('label').dblclick();
      const editInput = row.locator('.edit');
      await editInput.fill(newTitle);
      await editInput.press('Enter');
    });
  }

  async toggleAllTodos(): Promise<void> {
    await test.step('Toggle all todos', async () => {
      await this.toggleAllLabel.click();
    });
  }

  async clearCompleted(): Promise<void> {
    await test.step('Clear completed todos', async () => {
      await this.clearCompletedButton.click();
    });
  }

  async filterBy(filter: TodoFilter): Promise<void> {
    await test.step(`Filter list by "${filter}"`, async () => {
      await this.page.getByRole('link', { name: filter, exact: true }).click();
    });
  }

  async assertVisibleRowCount(expected: number): Promise<void> {
    await expect(this.todoItems).toHaveCount(expected);
  }

  async assertTodoTitles(expected: string[]): Promise<void> {
    await expect(this.todoLabels).toHaveText(expected);
  }

  async assertTodoCompleted(title: string): Promise<void> {
    await expect(this.todoByTitle(title)).toHaveClass(/completed/);
  }

  async assertTodoNotCompleted(title: string): Promise<void> {
    await expect(this.todoByTitle(title)).not.toHaveClass(/completed/);
  }

  async assertTodoVisible(title: string): Promise<void> {
    await expect(this.todoByTitle(title)).toBeVisible();
  }

  async assertTodoAbsent(title: string): Promise<void> {
    await expect(this.todoByTitle(title)).toHaveCount(0);
  }

  async assertCounter(text: string): Promise<void> {
    await expect(this.todoCount).toHaveText(text);
  }

  async assertClearCompletedHidden(): Promise<void> {
    await expect(this.clearCompletedButton).toBeHidden();
  }
}


