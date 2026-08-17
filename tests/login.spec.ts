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

test('Test all 6 login user states sequentially', async ({ page }) => {
  const loginFlows = new LoginWorkflows(page);
  const inventoryFlows = new InventoryWorkflows(page);

  for (const user of ALL_USERS) {
    const isOnInventory = await loginFlows.loginAs(user);
    
    if (isOnInventory) {
      await inventoryFlows.logout(); // <-- Uses InventoryWorkflows
    }
  }
});