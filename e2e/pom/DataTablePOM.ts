import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class DataTablePOM {
  private readonly table: Locator;
  private readonly searchInput: Locator;
  private readonly rows: Locator;

  constructor(private readonly page: Page) {
    this.table = page.getByRole("table");
    this.searchInput = page.getByPlaceholder(/search/i);
    this.rows = this.table.getByRole("row").filter({
      hasNot: page.getByRole("columnheader"),
    });
  }

  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
  }

  async clearSearch(): Promise<void> {
    await this.searchInput.clear();
  }

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

  async goToNextPage(): Promise<void> {
    await this.page.getByRole("button", { name: "Selanjutnya" }).click();
  }

  async goToPreviousPage(): Promise<void> {
    await this.page.getByRole("button", { name: "Sebelumnya" }).click();
  }

  async getRowCount(): Promise<number> {
    return this.rows.count();
  }

  async getCellText(rowIndex: number, columnIndex: number): Promise<string> {
    const cell = this.rows.nth(rowIndex).getByRole("cell").nth(columnIndex);
    return (await cell.textContent()) ?? "";
  }

  async expectLoaded(): Promise<void> {
    await expect(this.table).toBeVisible();
    await expect(this.rows.first()).toBeVisible();
  }

  async expectRowCount(count: number): Promise<void> {
    await expect(this.rows).toHaveCount(count);
  }
}
