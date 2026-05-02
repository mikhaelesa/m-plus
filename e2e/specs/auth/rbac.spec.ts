import { PATHS } from "@/constants/paths";
import { ADMIN_AUTH_FILE, USER_AUTH_FILE } from "../../constants";
import { expect, test } from "../../fixtures";

test.describe("Unauthenticated Access", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("should redirect to login when accessing protected route (/dashboard)", async ({
    page,
  }) => {
    await page.goto(PATHS.dashboard);
    await expect(page).toHaveURL(/.*\/login/);
  });

  test("should redirect to login when attempting to access admin route directly (/wmi)", async ({
    page,
  }) => {
    await page.goto(PATHS.wmi);
    await expect(page).toHaveURL(/.*\/login/);
  });
});

test.describe("Regular User Access", () => {
  test.use({ storageState: USER_AUTH_FILE });

  test("can access dashboard but admin menu is not in DOM", async ({
    page,
  }) => {
    await page.goto(PATHS.dashboard);

    await expect(
      page.getByRole("heading", { name: "Dashboard Overview" }),
    ).toBeVisible();

    await expect(
      page.getByRole("link", { name: "Vehicle Makes" }),
    ).not.toBeAttached();
    await expect(page.getByRole("link", { name: "WMI" })).not.toBeAttached();
  });

  test("should redirect to dashboard when forcing access to admin URL", async ({
    page,
  }) => {
    await page.goto(PATHS.wmi);

    await expect(page).toHaveURL(/.*\/dashboard/);
  });
});

test.describe("Admin Access", () => {
  test.use({ storageState: ADMIN_AUTH_FILE });

  test("can view and access admin exclusive menu", async ({
    page,
    dataTable,
  }) => {
    await page.goto(PATHS.dashboard);

    await expect(
      page.getByRole("link", { name: "Vehicle Makes" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "WMI" })).toBeVisible();

    await page.getByRole("link", { name: "Vehicle Makes" }).click();

    await expect(page).toHaveURL(/.*\/vehicle-makes/);

    await expect(
      page.getByRole("heading", { name: "Vehicle Makes" }),
    ).toBeVisible();

    await dataTable.expectLoaded();
  });
});

test.describe("Logout Flow", () => {
  test.use({ storageState: USER_AUTH_FILE });

  test("should clear session and prevent re-access", async ({
    page,
  }) => {
    await page.goto(PATHS.dashboard);

    await page.getByRole("button", { name: "Logout" }).click();

    await expect(page).toHaveURL(/.*\/login/);

    await page.goto(PATHS.dashboard);

    await expect(page).toHaveURL(/.*\/login/);
  });
});
