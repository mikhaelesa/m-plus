import { PATHS } from "@/constants/paths";
import { ADMIN_AUTH_FILE } from "../constants";
import { expect, test as setup } from "../fixtures";

setup("authenticate as admin", async ({ page }) => {
  await page.goto(PATHS.login);

  await page.getByLabel("Email").fill("admin@mail.com");
  await page.getByLabel("Password").fill("password123");
  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForURL("**/dashboard");

  await expect(
    page.getByRole("heading", { name: "Dashboard Overview" }),
  ).toBeVisible();

  await page.context().storageState({ path: ADMIN_AUTH_FILE });
});
