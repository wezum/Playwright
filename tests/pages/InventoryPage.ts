import { Page, Locator, expect } from '@playwright/test';

/** Type-safe button names for autocomplete */
export type ButtonName = 'openMenuButton' | 'closeMenuButton' | 'addToCartButton' | 'addToCartButton1' | 'addToCartButton2' | 'addToCartButton3' | 'addToCartButton4' | 'addToCartButton5';

/** Type-safe link names for autocomplete */
export type LinkName = 'allItemsLink' | 'aboutLink' | 'logoutLink' | 'resetAppStateLink' | 'shoppingCartLinkLink' | 'itemFourImgLinkLink' | 'sauceLabsBackpackLink' | 'itemZeroImgLinkLink' | 'sauceLabsBikeLightLink' | 'itemOneImgLinkLink' | 'sauceLabsBoltTShirtLink' | 'itemFiveImgLinkLink' | 'sauceLabsFleeceJacketLink' | 'itemTwoImgLinkLink' | 'sauceLabsOnesieLink' | 'itemThreeImgLinkLink' | 'testAllthethingsTShirtRedLink' | 'twitterLink' | 'facebookLink' | 'linkedinLink';

/**
 * Page Object Model for the Swag Labs inventory page
 * @page /inventory.html
 */
export class InventoryPage {
  readonly page: Page;

  // ============ Configuration ============

  private readonly CONFIG = {
    PAGE_PATH: '/inventory.html',
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

  // ============ Navigation ============

  /** Grouped navigation locators */
  readonly navigation = {
    /** All Items */
    allItems: () => this.page.locator('nav').locator(this.page.getByTestId('inventory-sidebar-link')),
    /** About */
    about: () => this.page.locator('nav').locator(this.page.getByTestId('about-sidebar-link')),
    /** Logout */
    logout: () => this.page.locator('nav').locator(this.page.getByTestId('logout-sidebar-link')),
    /** Reset App State */
    resetAppState: () => this.page.locator('nav').locator(this.page.getByTestId('reset-sidebar-link'))
  } as const;

  // ============ Footer Elements ============

  /**
   * Twitter link
   * @locator getByTestId('social-twitter')
   * @example await page.twitterLink.click();
   */
  get twitterLink(): Locator {
    return this.page.getByTestId('social-twitter');
  }

  /**
   * Facebook link
   * @locator getByTestId('social-facebook')
   * @example await page.facebookLink.click();
   */
  get facebookLink(): Locator {
    return this.page.getByTestId('social-facebook');
  }

  /**
   * LinkedIn link
   * @locator getByTestId('social-linkedin')
   * @example await page.linkedinLink.click();
   */
  get linkedinLink(): Locator {
    return this.page.getByTestId('social-linkedin');
  }


  // ============ Main Elements ============

  /**
   * Open Menu button
   * @locator getByRole('button', { name: /Open Menu/i })
   * @example await page.openMenuButton.click();
   */
  get openMenuButton(): Locator {
    return this.page.getByRole('button', { name: /Open Menu/i });
  }

  /**
   * Close Menu button
   * @locator getByRole('button', { name: /Close Menu/i })
   * @example await page.closeMenuButton.click();
   */
  get closeMenuButton(): Locator {
    return this.page.getByRole('button', { name: /Close Menu/i });
  }

  /**
   * Link
   * @locator getByTestId('shopping-cart-link')
   * @example await page.shoppingCartLinkLink.click();
   */
  get shoppingCartLinkLink(): Locator {
    return this.page.getByTestId('shopping-cart-link');
  }

  /**
   * Name (A to Z)Name (Z to A)Price (low to high)Price dropdown
   * @locator getByTestId('product-sort-container')
   * @example await page.nameZNameAPriceDropdown.selectOption('option');
   */
  get nameZNameAPriceDropdown(): Locator {
    return this.page.getByTestId('product-sort-container');
  }

  /**
   * Link
   * @locator getByTestId('item-4-img-link')
   * @example await page.itemFourImgLinkLink.click();
   */
  get itemFourImgLinkLink(): Locator {
    return this.page.getByTestId('item-4-img-link');
  }

  /**
   * Sauce Labs Backpack link
   * @locator getByTestId('item-4-title-link')
   * @example await page.sauceLabsBackpackLink.click();
   */
  get sauceLabsBackpackLink(): Locator {
    return this.page.getByTestId('item-4-title-link');
  }

  /**
   * Add to cart button
   * @locator getByTestId('add-to-cart-sauce-labs-backpack')
   * @example await page.addToCartButton.click();
   */
  get addToCartButton(): Locator {
    return this.page.getByTestId('add-to-cart-sauce-labs-backpack');
  }

  /**
   * Link
   * @locator getByTestId('item-0-img-link')
   * @example await page.itemZeroImgLinkLink.click();
   */
  get itemZeroImgLinkLink(): Locator {
    return this.page.getByTestId('item-0-img-link');
  }

  /**
   * Sauce Labs Bike Light link
   * @locator getByTestId('item-0-title-link')
   * @example await page.sauceLabsBikeLightLink.click();
   */
  get sauceLabsBikeLightLink(): Locator {
    return this.page.getByTestId('item-0-title-link');
  }

  /**
   * Add to cart button
   * @locator getByTestId('add-to-cart-sauce-labs-bike-light')
   * @example await page.addToCartButton1.click();
   */
  get addToCartButton1(): Locator {
    return this.page.getByTestId('add-to-cart-sauce-labs-bike-light');
  }

  /**
   * Link
   * @locator getByTestId('item-1-img-link')
   * @example await page.itemOneImgLinkLink.click();
   */
  get itemOneImgLinkLink(): Locator {
    return this.page.getByTestId('item-1-img-link');
  }

  /**
   * Sauce Labs Bolt T-Shirt link
   * @locator getByTestId('item-1-title-link')
   * @example await page.sauceLabsBoltTShirtLink.click();
   */
  get sauceLabsBoltTShirtLink(): Locator {
    return this.page.getByTestId('item-1-title-link');
  }

  /**
   * Add to cart button
   * @locator getByTestId('add-to-cart-sauce-labs-bolt-t-shirt')
   * @example await page.addToCartButton2.click();
   */
  get addToCartButton2(): Locator {
    return this.page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt');
  }

  /**
   * Link
   * @locator getByTestId('item-5-img-link')
   * @example await page.itemFiveImgLinkLink.click();
   */
  get itemFiveImgLinkLink(): Locator {
    return this.page.getByTestId('item-5-img-link');
  }

  /**
   * Sauce Labs Fleece Jacket link
   * @locator getByTestId('item-5-title-link')
   * @example await page.sauceLabsFleeceJacketLink.click();
   */
  get sauceLabsFleeceJacketLink(): Locator {
    return this.page.getByTestId('item-5-title-link');
  }

  /**
   * Add to cart button
   * @locator getByTestId('add-to-cart-sauce-labs-fleece-jacket')
   * @example await page.addToCartButton3.click();
   */
  get addToCartButton3(): Locator {
    return this.page.getByTestId('add-to-cart-sauce-labs-fleece-jacket');
  }

  /**
   * Link
   * @locator getByTestId('item-2-img-link')
   * @example await page.itemTwoImgLinkLink.click();
   */
  get itemTwoImgLinkLink(): Locator {
    return this.page.getByTestId('item-2-img-link');
  }

  /**
   * Sauce Labs Onesie link
   * @locator getByTestId('item-2-title-link')
   * @example await page.sauceLabsOnesieLink.click();
   */
  get sauceLabsOnesieLink(): Locator {
    return this.page.getByTestId('item-2-title-link');
  }

  /**
   * Add to cart button
   * @locator getByTestId('add-to-cart-sauce-labs-onesie')
   * @example await page.addToCartButton4.click();
   */
  get addToCartButton4(): Locator {
    return this.page.getByTestId('add-to-cart-sauce-labs-onesie');
  }

  /**
   * Link
   * @locator getByTestId('item-3-img-link')
   * @example await page.itemThreeImgLinkLink.click();
   */
  get itemThreeImgLinkLink(): Locator {
    return this.page.getByTestId('item-3-img-link');
  }

  /**
   * Test.allTheThings() T-Shirt (Red) link
   * @locator getByTestId('item-3-title-link')
   * @example await page.testAllthethingsTShirtRedLink.click();
   */
  get testAllthethingsTShirtRedLink(): Locator {
    return this.page.getByTestId('item-3-title-link');
  }

  /**
   * Add to cart button
   * @locator getByTestId('add-to-cart-test.allthethings()-t-shirt-(red)')
   * @example await page.addToCartButton5.click();
   */
  get addToCartButton5(): Locator {
    return this.page.getByTestId('add-to-cart-test.allthethings()-t-shirt-(red)');
  }


  // ============ Delegate Getters (for grouped elements) ============

  /** Delegate getter for navigation.allItems() */
  get allItemsLink(): Locator {
    return this.navigation.allItems();
  }

  /** Delegate getter for navigation.about() */
  get aboutLink(): Locator {
    return this.navigation.about();
  }

  /** Delegate getter for navigation.logout() */
  get logoutLink(): Locator {
    return this.navigation.logout();
  }

  /** Delegate getter for navigation.resetAppState() */
  get resetAppStateLink(): Locator {
    return this.navigation.resetAppState();
  }


  // ============ Actions ============

  async clickButton(buttonName: ButtonName): Promise<void> {
    const buttonMap: Record<ButtonName, Locator> = {
      'openMenuButton': this.openMenuButton,
      'closeMenuButton': this.closeMenuButton,
      'addToCartButton': this.addToCartButton,
      'addToCartButton1': this.addToCartButton1,
      'addToCartButton2': this.addToCartButton2,
      'addToCartButton3': this.addToCartButton3,
      'addToCartButton4': this.addToCartButton4,
      'addToCartButton5': this.addToCartButton5,
    };
    const button = buttonMap[buttonName];
    if(!button) throw new Error(`Button '${buttonName}' not found`);
    await button.click();
  }

  async clickLink(linkName: LinkName): Promise<void> {
    const linkMap: Record<LinkName, Locator> = {
      'allItemsLink': this.allItemsLink,
      'aboutLink': this.aboutLink,
      'logoutLink': this.logoutLink,
      'resetAppStateLink': this.resetAppStateLink,
      'shoppingCartLinkLink': this.shoppingCartLinkLink,
      'itemFourImgLinkLink': this.itemFourImgLinkLink,
      'sauceLabsBackpackLink': this.sauceLabsBackpackLink,
      'itemZeroImgLinkLink': this.itemZeroImgLinkLink,
      'sauceLabsBikeLightLink': this.sauceLabsBikeLightLink,
      'itemOneImgLinkLink': this.itemOneImgLinkLink,
      'sauceLabsBoltTShirtLink': this.sauceLabsBoltTShirtLink,
      'itemFiveImgLinkLink': this.itemFiveImgLinkLink,
      'sauceLabsFleeceJacketLink': this.sauceLabsFleeceJacketLink,
      'itemTwoImgLinkLink': this.itemTwoImgLinkLink,
      'sauceLabsOnesieLink': this.sauceLabsOnesieLink,
      'itemThreeImgLinkLink': this.itemThreeImgLinkLink,
      'testAllthethingsTShirtRedLink': this.testAllthethingsTShirtRedLink,
      'twitterLink': this.twitterLink,
      'facebookLink': this.facebookLink,
      'linkedinLink': this.linkedinLink,
    };
    const link = linkMap[linkName];
    if(!link) throw new Error(`Link '${linkName}' not found`);
    await link.click();
  }


  // ============ Assertions ============

  /** Verify page has loaded successfully */
  async expectPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/inventory.html/);
    await expect(this.openMenuButton).toBeVisible({ timeout: 10000 });
  }

  /** Verify all interactive buttons are visible */
  async expectAllButtonsVisible(): Promise<void> {
    await expect(this.openMenuButton).toBeVisible();
    await expect(this.closeMenuButton).toBeVisible();
    await expect(this.addToCartButton).toBeVisible();
    await expect(this.addToCartButton1).toBeVisible();
    await expect(this.addToCartButton2).toBeVisible();
    await expect(this.addToCartButton3).toBeVisible();
    await expect(this.addToCartButton4).toBeVisible();
    await expect(this.addToCartButton5).toBeVisible();
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
   * Check if Open Menu is visible
   */
  async isOpenMenuButtonVisible(): Promise<boolean> {
    return this.isVisible(this.openMenuButton);
  }

  /**
   * Check if All Items is visible
   */
  async isAllItemsLinkVisible(): Promise<boolean> {
    return this.isVisible(this.allItemsLink);
  }

  /**
   * Check if About is visible
   */
  async isAboutLinkVisible(): Promise<boolean> {
    return this.isVisible(this.aboutLink);
  }

  /**
   * Check if Logout is visible
   */
  async isLogoutLinkVisible(): Promise<boolean> {
    return this.isVisible(this.logoutLink);
  }

  /**
   * Check if Reset App State is visible
   */
  async isResetAppStateLinkVisible(): Promise<boolean> {
    return this.isVisible(this.resetAppStateLink);
  }

  /**
   * Check if Close Menu is visible
   */
  async isCloseMenuButtonVisible(): Promise<boolean> {
    return this.isVisible(this.closeMenuButton);
  }

  /**
   * Check if shoppingCartLinkLink is visible
   */
  async isShoppingCartLinkLinkVisible(): Promise<boolean> {
    return this.isVisible(this.shoppingCartLinkLink);
  }

  /**
   * Check if Name (A to Z)Name (Z to A)Price (low to high)Price is visible
   */
  async isNameZNameAPriceDropdownVisible(): Promise<boolean> {
    return this.isVisible(this.nameZNameAPriceDropdown);
  }

  /**
   * Check if itemFourImgLinkLink is visible
   */
  async isItemFourImgLinkLinkVisible(): Promise<boolean> {
    return this.isVisible(this.itemFourImgLinkLink);
  }

  /**
   * Check if Sauce Labs Backpack is visible
   */
  async isSauceLabsBackpackLinkVisible(): Promise<boolean> {
    return this.isVisible(this.sauceLabsBackpackLink);
  }

  /**
   * Check if Add to cart is visible
   */
  async isAddToCartButtonVisible(): Promise<boolean> {
    return this.isVisible(this.addToCartButton);
  }

  /**
   * Check if itemZeroImgLinkLink is visible
   */
  async isItemZeroImgLinkLinkVisible(): Promise<boolean> {
    return this.isVisible(this.itemZeroImgLinkLink);
  }

  /**
   * Check if Sauce Labs Bike Light is visible
   */
  async isSauceLabsBikeLightLinkVisible(): Promise<boolean> {
    return this.isVisible(this.sauceLabsBikeLightLink);
  }

  /**
   * Check if Add to cart is visible
   */
  async isAddToCartButton1Visible(): Promise<boolean> {
    return this.isVisible(this.addToCartButton1);
  }

  /**
   * Check if itemOneImgLinkLink is visible
   */
  async isItemOneImgLinkLinkVisible(): Promise<boolean> {
    return this.isVisible(this.itemOneImgLinkLink);
  }

  /**
   * Check if Sauce Labs Bolt T-Shirt is visible
   */
  async isSauceLabsBoltTShirtLinkVisible(): Promise<boolean> {
    return this.isVisible(this.sauceLabsBoltTShirtLink);
  }

  /**
   * Check if Add to cart is visible
   */
  async isAddToCartButton2Visible(): Promise<boolean> {
    return this.isVisible(this.addToCartButton2);
  }

  /**
   * Check if itemFiveImgLinkLink is visible
   */
  async isItemFiveImgLinkLinkVisible(): Promise<boolean> {
    return this.isVisible(this.itemFiveImgLinkLink);
  }

  /**
   * Check if Sauce Labs Fleece Jacket is visible
   */
  async isSauceLabsFleeceJacketLinkVisible(): Promise<boolean> {
    return this.isVisible(this.sauceLabsFleeceJacketLink);
  }

  /**
   * Check if Add to cart is visible
   */
  async isAddToCartButton3Visible(): Promise<boolean> {
    return this.isVisible(this.addToCartButton3);
  }

  /**
   * Check if itemTwoImgLinkLink is visible
   */
  async isItemTwoImgLinkLinkVisible(): Promise<boolean> {
    return this.isVisible(this.itemTwoImgLinkLink);
  }

  /**
   * Check if Sauce Labs Onesie is visible
   */
  async isSauceLabsOnesieLinkVisible(): Promise<boolean> {
    return this.isVisible(this.sauceLabsOnesieLink);
  }

  /**
   * Check if Add to cart is visible
   */
  async isAddToCartButton4Visible(): Promise<boolean> {
    return this.isVisible(this.addToCartButton4);
  }

  /**
   * Check if itemThreeImgLinkLink is visible
   */
  async isItemThreeImgLinkLinkVisible(): Promise<boolean> {
    return this.isVisible(this.itemThreeImgLinkLink);
  }

  /**
   * Check if Test.allTheThings() T-Shirt (Red) is visible
   */
  async isTestAllthethingsTShirtRedLinkVisible(): Promise<boolean> {
    return this.isVisible(this.testAllthethingsTShirtRedLink);
  }

  /**
   * Check if Add to cart is visible
   */
  async isAddToCartButton5Visible(): Promise<boolean> {
    return this.isVisible(this.addToCartButton5);
  }

  /**
   * Check if Twitter is visible
   */
  async isTwitterLinkVisible(): Promise<boolean> {
    return this.isVisible(this.twitterLink);
  }

  /**
   * Check if Facebook is visible
   */
  async isFacebookLinkVisible(): Promise<boolean> {
    return this.isVisible(this.facebookLink);
  }

  /**
   * Check if LinkedIn is visible
   */
  async isLinkedinLinkVisible(): Promise<boolean> {
    return this.isVisible(this.linkedinLink);
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
    const url = baseUrl || process.env.BASE_URL || 'https://www.saucedemo.com';
    await this.page.goto(`${url}/inventory.html`);
    await this.page.waitForLoadState('domcontentloaded');
  }
}
