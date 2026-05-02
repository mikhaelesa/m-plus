import { PATHS } from "@/constants/paths";
import { ADMIN_AUTH_FILE, USER_AUTH_FILE } from "../../constants";
import { expect, test } from "../../fixtures";

test.describe("Unauthenticated Access", () => {
  // Reset state to ensure no cached auth tokens are used
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
  // Inject User state
  test.use({ storageState: USER_AUTH_FILE });

  test("dapat mengakses dashboard tetapi menu admin tidak ada di DOM", async ({
    page,
  }) => {
    await page.goto(PATHS.dashboard);

    // Assert Dashboard heading is visible
    await expect(
      page.getByRole("heading", { name: "Dashboard Overview" }),
    ).toBeVisible();

    // Assert sidebar admin links not attached (completely removed from DOM by RoleGate)
    await expect(
      page.getByRole("link", { name: "Vehicle Makes" }),
    ).not.toBeAttached();
    await expect(page.getByRole("link", { name: "WMI" })).not.toBeAttached();
  });

  test("harus redirect ke dashboard jika memaksa akses URL admin", async ({
    page,
  }) => {
    await page.goto(PATHS.wmi);

    // Assert middleware automatically bounces the user back to the dashboard
    await expect(page).toHaveURL(/.*\/dashboard/);
  });
});

test.describe("Admin Access", () => {
  // Inject Admin state
  test.use({ storageState: ADMIN_AUTH_FILE });

  test("dapat melihat dan mengakses menu eksklusif admin", async ({
    page,
    dataTable,
  }) => {
    await page.goto(PATHS.dashboard);

    // Assert sidebar admin links are visible
    await expect(
      page.getByRole("link", { name: "Vehicle Makes" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "WMI" })).toBeVisible();

    // Navigate to admin route via sidebar
    await page.getByRole("link", { name: "Vehicle Makes" }).click();

    // Assert URL change
    await expect(page).toHaveURL(/.*\/vehicle-makes/);

    // Verify page rendered properly
    await expect(
      page.getByRole("heading", { name: "Vehicle Makes" }),
    ).toBeVisible();

    // Ensure data table finishes loading using our injected POM
    await dataTable.expectLoaded();
  });
});

test.describe("Logout Flow", () => {
  // Use User state for the logout simulation
  test.use({ storageState: USER_AUTH_FILE });

  test("harus membersihkan sesi dan mencegah akses kembali", async ({
    page,
  }) => {
    await page.goto(PATHS.dashboard);

    // Click the logout button in the sidebar (assuming it uses a button role)
    await page.getByRole("button", { name: "Logout" }).click();

    // Assert it redirects to login
    await expect(page).toHaveURL(/.*\/login/);

    // Attempt to force navigation back to dashboard with stale session
    await page.goto(PATHS.dashboard);

    // Assert middleware holds strong and bounces back to login
    await expect(page).toHaveURL(/.*\/login/);
  });
});
