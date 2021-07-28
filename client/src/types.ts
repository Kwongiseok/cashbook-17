export type HistoryState = {
  path?: string;
  year?: number;
  month?: number;
  type?: string;
};
export type ExpenditureCategoryType = {
  [key: string]: string;
};

export type ExpenditureData = Array<{ category: string; percent: number; total: number }>;
