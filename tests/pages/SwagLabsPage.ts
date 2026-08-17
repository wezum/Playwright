import { Page, Locator, expect } from '@playwright/test';

/** Type-safe input names for autocomplete */
export type InputName = 'usernameInput' | 'passwordInput';

/**
 * Page Object Model for Swag Labs
 * @page /
 */
export class SwagLabs {
  readonly page: Page;

  // ============ Configuration ============

  private readonly CONFIG = {
    PAGE_PATH: '/',
    TIMEOUTS: {
      PAGE_LOAD: 10000,
      ELEMENT_VISIBLE: 2000,
      NAVIGATION: 30000
    }
  } as const;

  constructor(page: Page) {
    this.page = page;
  }

  // ============ Private Helpers ============

  /**
   * Check if an element is visible on the page
   * @private
   */
  private async isVisible(locator: Locator, timeout = this.CONFIG.TIMEOUTS.ELEMENT_VISIBLE): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  // ============ Form Elements ============

  /**
   * Username text input
   * @locator getByTestId('username')
   * @example await page.usernameInput.fill('value');
   */
  get usernameInput(): Locator {
    return this.page.getByTestId('username');
  }

  /**
   * Password password input
   * @locator getByTestId('password')
   * @example await page.passwordInput.fill('value');
   */
  get passwordInput(): Locator {
    return this.page.getByTestId('password');
  }

  /**
   * Div
   * @locator locator('.error-message-container')
   */
  get validationError(): Locator {
    return this.page.locator('.error-message-container');
  }

  /**
   * Submit button
   * @locator getByTestId('login-button')
   * @example await page.loginButtonButton.fill('value');
   */
  get loginButtonButton(): Locator {
    return this.page.getByTestId('login-button');
  }


  // ============ Actions ============

  async fillInput(inputName: InputName, value: string): Promise<void> {
    const inputMap: Record<InputName, Locator> = {
      'usernameInput': this.usernameInput,
      'passwordInput': this.passwordInput,
    };
    const input = inputMap[inputName];
    if(!input) throw new Error(`Input '${inputName}' not found`);
    await input.fill(value);
  }

  // ============ Workflows ============

  /**
   * High-level login workflow
   * @param username - Username or email
   * @param password - Password
   * @example await page.login('user@example.com', 'password123');
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButtonButton.click();
    await this.page.waitForLoadState('networkidle');
  }


  // ============ Assertions ============

  /** Verify page has loaded successfully */
  async expectPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\//);
    await expect(this.usernameInput).toBeVisible({ timeout: 10000 });
  }

  /**
   * Verify specific element is visible
   * @param locator - Element locator to check
   */
  async expectElementVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }


  // ============ State Checks (Priority 3: Complete coverage) ============

  /**
   * Check if usernameInput is visible
   */
  async isUsernameInputVisible(): Promise<boolean> {
    return this.isVisible(this.usernameInput);
  }

  /**
   * Check if passwordInput is visible
   */
  async isPasswordInputVisible(): Promise<boolean> {
    return this.isVisible(this.passwordInput);
  }

  /**
   * Check if validationError is visible
   */
  async isValidationErrorVisible(): Promise<boolean> {
    return this.isVisible(this.validationError);
  }

  /**
   * Check if loginButtonButton is visible
   */
  async isLoginButtonButtonVisible(): Promise<boolean> {
    return this.isVisible(this.loginButtonButton);
  }

  /**
   * Get error message text if displayed
   */
  async getErrorMessage(): Promise<string> {
    if(await this.isValidationErrorVisible()) {
      return await this.validationError.textContent() || '';
    }
    return '';
  }

  // ============ Navigation ============

  /**
   * Navigate to the page
   * @param baseUrl - Optional base URL override (defaults to env variable)
   * @example
   * // Use environment variable
   * await page.goto();
   * // Or override
   * await page.goto('https://staging.example.com');
   */
  async goto(baseUrl?: string): Promise<void> {
    const url = baseUrl || process.env.BASE_URL || 'https://www.saucedemo.com/';
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  
}
