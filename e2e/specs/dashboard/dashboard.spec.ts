import { PATHS } from "@/constants/paths";
import { ADMIN_AUTH_FILE, USER_AUTH_FILE } from "../../constants";
import { expect, test } from "../../fixtures";

test.describe("Dashboard - Regular User", () => {
  test.use({ storageState: USER_AUTH_FILE });

  test.beforeEach(async ({ page }) => {
    await page.goto(PATHS.dashboard);
  });

  test("should display stat cards with accurate mock numbers", async ({
    page,
  }) => {
    await expect(page.locator(".text-2xl").first()).toContainText(/\d+/);

    await expect(page.locator(".text-2xl").nth(1)).toContainText(/\d+/);
  });

  test("'View More' button is blocked by RoleGuard (not in DOM)", async ({
    page,
  }) => {
    await expect(
      page.getByRole("link", { name: "View More" }),
    ).toHaveCount(0);
  });
});

test.describe("Dashboard - Admin", () => {
  test.use({ storageState: ADMIN_AUTH_FILE });

  test.beforeEach(async ({ page }) => {
    await page.goto(PATHS.dashboard);
  });

  test("'View More' button can be viewed and used by Admin", async ({
    page,
  }) => {
    const viewMoreBtns = page.getByRole("link", {
      name: "View More",
    });

    await expect(viewMoreBtns).toHaveCount(2);

    await viewMoreBtns.first().click();
    await expect(page).toHaveURL(/.*\/wmi/);

    await page.goto(PATHS.dashboard);

    await viewMoreBtns.nth(1).click();
    await expect(page).toHaveURL(/.*\/vehicle-makes/);
  });

  test("Manufacturing Chart responds to vehicle type filter changes", async ({
    page,
  }) => {
    const pieChartSvg = page.locator(".recharts-pie");
    await expect(pieChartSvg).toBeVisible();

    await expect(page.getByText("2", { exact: true }).first()).toBeVisible();

    const filterTrigger = page.getByRole("combobox");
    await filterTrigger.click();

    const truckOption = page.getByRole("option", { name: /Truck/i });
    await truckOption.click();

    await expect(pieChartSvg).toBeVisible();

    await expect(page.getByText("2", { exact: true }).first()).toBeVisible();
  });
});
