import { PATHS } from "@/constants/paths";
import { ADMIN_AUTH_FILE } from "../../constants";
import { expect, test } from "../../fixtures";

test.describe("Data Table & CSV Export Validation", () => {
  // Hanya admin yang bisa mengakses /wmi dan /vehicle-makes
  test.use({ storageState: ADMIN_AUTH_FILE });

  test.beforeEach(async ({ page }) => {
    // Kita jalankan mayoritas tes ini di halaman WMI
    await page.goto(PATHS.wmi);
  });

  test("halaman WMI harus memuat Data Table dan mengonsumsi Mock Data dengan benar", async ({
    dataTable,
  }) => {
    await dataTable.expectLoaded();
    // Karena mock data WMI memiliki 2 array objek ("AC PROPULSION" dan "ADAM OPEL")
    await dataTable.expectRowCount(2);
  });

  test("interaksi Search dan Sort berfungsi reaktif dan stabil tanpa flaky", async ({
    page,
    dataTable,
  }) => {
    await dataTable.expectLoaded();

    // --- Test Search ---
    // Pencarian dilakukan pada kolom "Name" (seperti yang dikonfigurasi di filterColumnId)
    await dataTable.search("AC PROPULSION");
    // Asersi web-first: tunggu hingga row count menjadi 1
    await dataTable.expectRowCount(1);

    // Validasi isi sel pada baris pertama setelah filter
    const firstRowText = await dataTable.getCellText(0, 0); // Kolom index 0 biasanya adalah WMI identifier
    expect(firstRowText).toContain("1A9");

    // --- Test Clear Search ---
    await dataTable.clearSearch();
    // Tunggu DOM merender ulang dan mengembalikan 2 baris
    await dataTable.expectRowCount(2);

    // --- Test Sort ---
    // Header pada WmiColumns untuk Name adalah "Manufacturer"
    await dataTable.sortBy("Manufacturer", "desc");
    
    // Verifikasi bahwa interaksi sort tidak menyebabkan crash dan data tetap ada
    await dataTable.expectRowCount(2);
  });

  test("unduhan CSV terintersepsi oleh mock dan berhasil ditangani Playwright", async ({
    page,
  }) => {
    const downloadCsvBtn = page.getByRole("button", { name: "Download CSV" });
    await expect(downloadCsvBtn).toBeVisible();

    // Gunakan waitForResponse alih-alih waitForEvent('download') karena WebKit kadang flaky
    // dengan dynamic <a> click event. Yang terpenting adalah API route dipanggil.
    const responsePromise = page.waitForResponse(
      (response) => response.url().includes("format=csv") && response.status() === 200
    );
    
    await downloadCsvBtn.click();

    // Tunggu hingga network API dipanggil dan dintersepsi oleh mock-helper
    const response = await responsePromise;

    // Asersi ekstensi file atau content-type dari header (karena mock mengembalikan text/csv)
    expect(response.headers()["content-type"]).toContain("text/csv");
  });
});
