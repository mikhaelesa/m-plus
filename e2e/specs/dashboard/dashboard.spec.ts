import { PATHS } from "@/constants/paths";
import { ADMIN_AUTH_FILE, USER_AUTH_FILE } from "../../constants";
import { expect, test } from "../../fixtures";

test.describe("Dashboard - Regular User", () => {
  test.use({ storageState: USER_AUTH_FILE });

  test.beforeEach(async ({ page }) => {
    await page.goto(PATHS.dashboard);
  });

  test("harus menampilkan stat cards dengan angka mock yang akurat", async ({
    page,
  }) => {
    await expect(page.locator(".text-2xl").first()).toContainText(/\d+/);

    await expect(page.locator(".text-2xl").nth(1)).toContainText(/\d+/);
  });

  test("tombol 'Lihat Selengkapnya' diblokir oleh RoleGuard (tidak di DOM)", async ({
    page,
  }) => {
    await expect(
      page.getByRole("link", { name: "Lihat Selengkapnya" }),
    ).toHaveCount(0);
  });
});

test.describe("Dashboard - Admin", () => {
  test.use({ storageState: ADMIN_AUTH_FILE });

  test.beforeEach(async ({ page }) => {
    await page.goto(PATHS.dashboard);
  });

  test("tombol 'Lihat Selengkapnya' dapat dilihat dan digunakan oleh Admin", async ({
    page,
  }) => {
    const lihatSelengkapnyaBtns = page.getByRole("link", {
      name: "Lihat Selengkapnya",
    });

    await expect(lihatSelengkapnyaBtns).toHaveCount(2);

    await lihatSelengkapnyaBtns.first().click();
    await expect(page).toHaveURL(/.*\/wmi/);

    await page.goto(PATHS.dashboard);

    await lihatSelengkapnyaBtns.nth(1).click();
    await expect(page).toHaveURL(/.*\/vehicle-makes/);
  });

  test("Manufacturing Chart merespons perubahan filter tipe kendaraan", async ({
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
