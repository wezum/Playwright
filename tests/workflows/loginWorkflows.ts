// tests/workflows/loginWorkflows.ts
import { Page, expect } from '@playwright/test';
import { SwagLabs } from '../pages/SwagLabsPage';

export class LoginWorkflows {
  readonly page: Page;
  readonly swagLabs: SwagLabs;

  constructor(page: Page) {
    this.page = page;
    this.swagLabs = new SwagLabs(page);
  }

  /**
   * Universal Login Flow
   * Handles valid users (verifies /inventory.html) and locked_out_user (verifies error banner)
   */
  async loginAs(username: string, password = 'secret_sauce'): Promise<boolean> {
    await this.swagLabs.goto();
    await this.swagLabs.login(username, password);

    if (username === 'locked_out_user') {
      const errorText = await this.swagLabs.getErrorMessage();
      expect(errorText).toContain('Epic sadface: Sorry, this user has been locked out.');
      return false; // Did not navigate to inventory
    } else {
      await expect(this.page).toHaveURL(/inventory.html/);
      return true; // Successfully on inventory page
    }
  }
}
