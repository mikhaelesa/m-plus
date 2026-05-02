import { USER_AUTH_FILE } from "../constants";
import { expect, test as setup } from "../fixtures";

setup("authenticate as user", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel("Email").fill("user@mail.com");
  await page.getByLabel("Password").fill("password123");
  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForURL("**/dashboard");

  await expect(
    page.getByRole("heading", { name: "Dashboard Overview" }),
  ).toBeVisible();

  await page.context().storageState({ path: USER_AUTH_FILE });
});
