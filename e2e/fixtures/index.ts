import { test as base } from "@playwright/test";
import { applyVpicMocks } from "../mocks/mock-helper";
import { DataTablePOM } from "../pom/DataTablePOM";

type Fixtures = {
  dataTable: DataTablePOM;
};

export const test = base.extend<Fixtures>({
  // Override built-in `page` to apply mocks before every test
  page: async ({ page }, use) => {
    await applyVpicMocks(page);
    await use(page);
  },

  // Inject DataTablePOM scoped to the (already-mocked) page
  dataTable: async ({ page }, use) => {
    await use(new DataTablePOM(page));
  },
});

export { expect } from "@playwright/test";
