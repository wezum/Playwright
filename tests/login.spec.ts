// tests/login.spec.ts
import { test } from '@playwright/test';
import { LoginWorkflows } from './workflows/loginWorkflows';
import { InventoryWorkflows } from './workflows/InventoryPageWorkflows';

const ALL_USERS = [
  'standard_user',
  'locked_out_user',
  'problem_user',
  'performance_glitch_user',
  'error_user',
  'visual_user',
] as const;

test.describe('Login User State Scenarios', () => {
  ALL_USERS.forEach((user) => {
    test(`Verify user state for: ${user}`, async ({ page }) => {
      const loginFlows = new LoginWorkflows(page);
      const inventoryFlows = new InventoryWorkflows(page);

      // 1. Attempt login & verify page state (inventory vs error banner)
      const isOnInventory = await loginFlows.loginAs(user);

      // 2. Log out if successfully navigated to inventory
      if (isOnInventory) {
        await inventoryFlows.logout();
      }
    });
  });
});