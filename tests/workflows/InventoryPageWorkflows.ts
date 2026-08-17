// tests/workflows/inventoryWorkflows.ts
import { Page, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';

export class InventoryWorkflows {
  readonly page: Page;
  readonly inventoryPage: InventoryPage;

  constructor(page: Page) {
    this.page = page;
    this.inventoryPage = new InventoryPage(page);
  }

  // ============ Workflow 1: Verification ============

  /** Verify that the inventory page is fully loaded and ready for interaction */
  async verifyPageLoaded(): Promise<void> {
    await this.inventoryPage.expectPageLoaded();
    await expect(this.page).toHaveURL(/inventory.html/);
  }

  // ============ Workflow 2: Add / Remove Cart Actions ============

  /** Add the Sauce Labs Backpack to cart and verify cart badge count */
  async addBackpackToCart(): Promise<void> {
    await this.inventoryPage.addToCartButton.click();
    await expect(this.inventoryPage.shoppingCartLinkLink).toHaveText('1');
  }

  /** Add multiple popular items (Backpack, Bike Light, Onesie) to cart */
  async addMultipleItemsToCart(): Promise<void> {
    await this.inventoryPage.addToCartButton.click();  // Backpack
    await this.inventoryPage.addToCartButton1.click(); // Bike Light
    await this.inventoryPage.addToCartButton4.click(); // Onesie
    await expect(this.inventoryPage.shoppingCartLinkLink).toHaveText('3');
  }

  /** Navigate directly to the Shopping Cart page */
  async goToCart(): Promise<void> {
    await this.inventoryPage.shoppingCartLinkLink.click();
    await expect(this.page).toHaveURL(/cart.html/);
  }

  // ============ Workflow 3: Product Sorting ============

  /**
   * Sort products by a specific dropdown option value
   * @param option - 'az' | 'za' | 'lohi' | 'hilo'
   */
  async sortProductsBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.inventoryPage.nameZNameAPriceDropdown.selectOption(option);
  }

  // ============ Workflow 4: Navigation Sidebar & Logout ============

  /** Open sidebar navigation menu */
  async openMenu(): Promise<void> {
    await this.inventoryPage.openMenuButton.click();
    await expect(this.inventoryPage.logoutLink).toBeVisible();
  }

  /** Close sidebar navigation menu */
  async closeMenu(): Promise<void> {
    await this.inventoryPage.closeMenuButton.click();
    await expect(this.inventoryPage.logoutLink).toBeHidden();
  }

  /** Perform full logout workflow */
  async logout(): Promise<void> {
    await this.openMenu();
    await this.inventoryPage.logoutLink.click();
    await expect(this.page).toHaveURL(/saucedemo.com\/?$/);
  }

  /** Reset the application state via sidebar menu */
  async resetAppState(): Promise<void> {
    await this.openMenu();
    await this.inventoryPage.resetAppStateLink.click();
    await this.closeMenu();
  }
}