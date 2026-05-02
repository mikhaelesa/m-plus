import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class DataTablePOM {
  private readonly table: Locator;
  private readonly searchInput: Locator;
  private readonly rows: Locator;

  constructor(private readonly page: Page) {
    this.table = page.getByRole("table");
    this.searchInput = page.getByPlaceholder(/search/i);
    // All <tr> inside <tbody> — excludes header row
    this.rows = this.table.getByRole("row").filter({
      hasNot: page.getByRole("columnheader"),
    });
  }

  /**
   * Types into the search input.
   * No waitForTimeout — caller must assert the expected result.
   * Example: `await dataTable.expectRowCount(3)`
   */
  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
  }

  /** Clears the search input. */
  async clearSearch(): Promise<void> {
    await this.searchInput.clear();
  }

  /** Clicks a column header to sort. Clicks twice for "desc". */
  async sortBy(
    columnName: string,
    direction: "asc" | "desc" = "asc",
  ): Promise<void> {
    const header = this.page.getByRole("columnheader", { name: columnName });
    await header.click();
    if (direction === "desc") {
      await this.page.waitForTimeout(300); // Tunggu React re-render sebentar
      await header.click();
    }
  }

  /** Clicks the Next page button. */
  async goToNextPage(): Promise<void> {
    await this.page.getByRole("button", { name: "Selanjutnya" }).click();
  }

  /** Clicks the Previous page button. */
  async goToPreviousPage(): Promise<void> {
    await this.page.getByRole("button", { name: "Sebelumnya" }).click();
  }

  /** Returns the count of visible data rows (excluding header). */
  async getRowCount(): Promise<number> {
    return this.rows.count();
  }

  /** Returns the text of a specific cell (0-indexed row and column). */
  async getCellText(rowIndex: number, columnIndex: number): Promise<string> {
    const cell = this.rows.nth(rowIndex).getByRole("cell").nth(columnIndex);
    return (await cell.textContent()) ?? "";
  }

  /** Web-first assertion: waits until the table is visible AND has ≥1 data row. */
  async expectLoaded(): Promise<void> {
    await expect(this.table).toBeVisible();
    await expect(this.rows.first()).toBeVisible();
  }

  /**
   * Web-first assertion: waits until row count equals `count`.
   * Use this after search/filter actions instead of waitForTimeout.
   */
  async expectRowCount(count: number): Promise<void> {
    await expect(this.rows).toHaveCount(count);
  }
}
