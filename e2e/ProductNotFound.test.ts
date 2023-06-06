import { test, expect } from "@playwright/test";

test.setTimeout(35e3);

test("product not found", async ({ page }) => {
  const res = await page.goto("/product/not-found");
  console.log(res?.status());
  expect(res?.status()).toBe(404);
});
