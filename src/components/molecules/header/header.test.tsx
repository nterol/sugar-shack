import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { Header } from "./index";

test("Testing Header badge", () => {
  const { container, rerender } = render(<Header cart={null} />);

  let badge = container.querySelector("[data-type='badge']");
  expect(badge).toBeNull();
  rerender(<Header cart={{ cartItems: [] }} />);
  badge = container.querySelector("[data-type='badge']");

  expect(badge).not.toBeNull();
  expect(badge?.textContent).toBe("0");
  rerender(
    <Header
      cart={{
        cartItems: [{ id: "", productID: "", quantity: 4 }],
      }}
    />
  );

  badge = container.querySelector("[data-type='badge']");
  expect(badge).not.toBeNull();
  expect(badge?.textContent).toBe("4");
});
