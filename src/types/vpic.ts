export interface VpicApiResponse<T> {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: T[];
}

export type VpicApiFormat = "json" | "csv";
