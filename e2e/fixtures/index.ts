import { test as base } from "@playwright/test";
import { applyVpicMocks } from "../mocks/mock-helper";
import { DataTablePOM } from "../pom/DataTablePOM";

type Fixtures = {
  dataTable: DataTablePOM;
};

export const test = base.extend<Fixtures>({
  page: async ({ page }, use) => {
    await applyVpicMocks(page);
    await use(page);
  },
  dataTable: async ({ page }, use) => {
    await use(new DataTablePOM(page));
  },
});

export { expect } from "@playwright/test";
