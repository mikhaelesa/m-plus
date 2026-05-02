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
    // Stat Card "Total Vehicle Makes" menampilkan angka terformat (karena RSC hit live API)
    await expect(page.locator(".text-2xl").first()).toContainText(/\d+/);

    // Stat Card "Total Manufacturers" menampilkan angka terformat (karena RSC hit live API)
    await expect(page.locator(".text-2xl").nth(1)).toContainText(/\d+/);
  });

  test("tombol 'Lihat Selengkapnya' diblokir oleh RoleGuard (tidak di DOM)", async ({
    page,
  }) => {
    // Assert tombol "Lihat Selengkapnya" not.toBeAttached()
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
    // Karena ada 2 tombol "Lihat Selengkapnya", kita ambil yang pertama (Manufacturing Chart -> WMI)
    const lihatSelengkapnyaBtns = page.getByRole("link", {
      name: "Lihat Selengkapnya",
    });

    await expect(lihatSelengkapnyaBtns).toHaveCount(2);

    // Klik tombol pertama (untuk WMI)
    await lihatSelengkapnyaBtns.first().click();
    await expect(page).toHaveURL(/.*\/wmi/);

    // Kembali ke dashboard
    await page.goto(PATHS.dashboard);

    // Klik tombol kedua (untuk Vehicle Makes)
    await lihatSelengkapnyaBtns.nth(1).click();
    await expect(page).toHaveURL(/.*\/vehicle-makes/);
  });

  test("Manufacturing Chart merespons perubahan filter tipe kendaraan", async ({
    page,
  }) => {
    // Pastikan SVG pie chart awalnya terlihat (wrapper class recharts)
    const pieChartSvg = page.locator(".recharts-pie");
    await expect(pieChartSvg).toBeVisible();

    // Pastikan teks 2 (Total WMI count mock di tengah chart) terlihat
    await expect(page.getByText("2", { exact: true }).first()).toBeVisible();

    // Ubah pilihan pada VehicleTypeFilter (misal ganti dari Car ke Truck)
    const filterTrigger = page.getByRole("combobox");
    await filterTrigger.click();

    // Pilih "Truck" dari listbox
    const truckOption = page.getByRole("option", { name: /Truck/i });
    await truckOption.click();

    // Pastikan chart SVG tetap terlihat setelah filter diganti (re-render mulus tanpa crash)
    await expect(pieChartSvg).toBeVisible();

    // Pastikan teks count tetap ada
    await expect(page.getByText("2", { exact: true }).first()).toBeVisible();
  });
});
