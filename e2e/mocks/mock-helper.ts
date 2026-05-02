import type { Page } from "@playwright/test";
import statsMakesResponse from "./stats-makes-response.json";
import statsManufacturersResponse from "./stats-manufacturers-response.json";
import vehicleMakesResponse from "./vehicle-makes-response.json";
import wmiResponse from "./wmi-response.json";

/** Registers all VPIC API mocks for a given page context. */
export async function applyVpicMocks(page: Page): Promise<void> {
  // WMI — Intercept both JSON and CSV
  await page.route("**/GetWMIsForManufacturer**", (route) => {
    if (route.request().url().includes("format=csv")) {
      return route.fulfill({
        contentType: "text/csv",
        body: "WMI,Name,Country,VehicleType,CreatedOn\n1A9,AC PROPULSION,USA,Car,2015-01-01\nW08,ADAM OPEL,GERMANY,Car,2015-01-01",
      });
    }
    return route.fulfill({ json: wmiResponse });
  });

  // Vehicle Makes — Intercept both JSON and CSV
  await page.route("**/GetMakesForVehicleType/**", (route) => {
    if (route.request().url().includes("format=csv")) {
      return route.fulfill({
        contentType: "text/csv",
        body: "MakeId,MakeName,VehicleTypeId,VehicleTypeName\n440,ASTON MARTIN,2,Passenger Car\n441,TESLA,2,Passenger Car",
      });
    }
    return route.fulfill({ json: vehicleMakesResponse });
  });

  // Stats — GetAllMakes
  await page.route("**/GetAllMakes**", (route) =>
    route.fulfill({ json: statsMakesResponse }),
  );

  // Stats — GetAllManufacturers
  await page.route("**/getallmanufacturers**", (route) =>
    route.fulfill({ json: statsManufacturersResponse }),
  );
}
