import { PATHS } from "@/constants/paths";
import { ADMIN_AUTH_FILE, USER_AUTH_FILE } from "../../constants";
import { expect, test } from "../../fixtures";

test.describe("Unauthenticated Access", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("harus redirect ke login jika mengakses rute terproteksi (/dashboard)", async ({
    page,
  }) => {
    await page.goto(PATHS.dashboard);
    await expect(page).toHaveURL(/.*\/login/);
  });

  test("harus redirect ke login jika mencoba mengakses rute admin secara langsung (/wmi)", async ({
    page,
  }) => {
    await page.goto(PATHS.wmi);
    await expect(page).toHaveURL(/.*\/login/);
  });
});

test.describe("Regular User Access", () => {
  test.use({ storageState: USER_AUTH_FILE });

  test("dapat mengakses dashboard tetapi menu admin tidak ada di DOM", async ({
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

  test("harus redirect ke dashboard jika memaksa akses URL admin", async ({
    page,
  }) => {
    await page.goto(PATHS.wmi);

    await expect(page).toHaveURL(/.*\/dashboard/);
  });
});

test.describe("Admin Access", () => {
  test.use({ storageState: ADMIN_AUTH_FILE });

  test("dapat melihat dan mengakses menu eksklusif admin", async ({
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

  test("harus membersihkan sesi dan mencegah akses kembali", async ({
    page,
  }) => {
    await page.goto(PATHS.dashboard);

    await page.getByRole("button", { name: "Logout" }).click();

    await expect(page).toHaveURL(/.*\/login/);

    await page.goto(PATHS.dashboard);

    await expect(page).toHaveURL(/.*\/login/);
  });
});
