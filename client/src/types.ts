export type HistoryState = {
  path?: string;
  year?: number;
  month?: number;
  type?: string;
};
export type ExpenditureCategoryType = {
  [key: string]: string;
};

export type ExpenditureData = { category: string; percent: number; total: number };
export type ExpenditureDataList = Array<ExpenditureData>;
