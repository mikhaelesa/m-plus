import { PATHS } from "@/constants/paths";
import { ADMIN_AUTH_FILE } from "../../constants";
import { expect, test } from "../../fixtures";

test.describe("Data Table & CSV Export Validation", () => {
  test.use({ storageState: ADMIN_AUTH_FILE });

  test.beforeEach(async ({ page }) => {
    await page.goto(PATHS.wmi);
  });

  test("WMI page should load Data Table and consume Mock Data correctly", async ({
    dataTable,
  }) => {
    await dataTable.expectLoaded();

    await dataTable.expectRowCount(2);
  });

  test("Search and Sort interactions function reactively and stably without flakiness", async ({
    dataTable,
  }) => {
    await dataTable.expectLoaded();

    await dataTable.search("AC PROPULSION");

    await dataTable.expectRowCount(1);

    const firstRowText = await dataTable.getCellText(0, 0);
    expect(firstRowText).toContain("1A9");

    await dataTable.clearSearch();

    await dataTable.expectRowCount(2);

    await dataTable.sortBy("Manufacturer", "desc");

    await dataTable.expectRowCount(2);
  });

  test("CSV download is intercepted by mock and successfully handled by Playwright", async ({
    page,
  }) => {
    const downloadCsvBtn = page.getByRole("button", { name: "Download CSV" });
    await expect(downloadCsvBtn).toBeVisible();

    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().includes("format=csv") && response.status() === 200,
    );

    await downloadCsvBtn.click();

    const response = await responsePromise;

    expect(response.headers()["content-type"]).toContain("text/csv");
  });
});
