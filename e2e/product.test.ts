import { test, expect } from "@playwright/test";

test.setTimeout(35e3);

test("product not found", async ({ page }) => {
  const res = await page.goto("/product/not-found");
  expect(res?.status()).toBe(404);
});

test("have a cookie", async ({ page, context }) => {
  await page.goto("/product/Sirop-d-erable-clair-biologique");
  const buyButton = page.getByText("Ajouter au panier");
  expect(buyButton).toBeDefined();
  await buyButton.click();
  expect(page.getByText("Ajout au panier...")).toBeDefined();
  await page.waitForResponse((res) => {
    return (
      res.url().includes("/api/trpc/cart.addToCart") && res.status() === 200
    );
  });

  const cookies = await context.cookies();

  expect(
    cookies.find((cookie) => {
      console.log(cookie.name);
      return cookie.name === "sugar-shack/cc/next";
    })
  ).toBeDefined();
});
