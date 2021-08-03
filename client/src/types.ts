export interface CalendarDate {
  prevMonthLastDate: Date;
  thisMonthFirstDate: Date;
  thisMonthLastDate: Date;
  nextMonthFirstDate: Date;
}
export type HistoryState = {
  path?: string;
  year?: number;
  month?: number;
  type?: string;
};
export type MainChartState = HistoryState & {
  total: number;
  data: ExpenditureDataList;
};
export type CalendarState = HistoryState & {
  total: number;
  expenditureTotal: number;
  incomeTotal: number;
  calendarData: CalendarDataType;
};

export type HeaderState = HistoryState & {
  isLoggedIn: boolean;
};
export type ExpenditureCategoryType = {
  [key: string]: string;
};

export type ExpenditureData = { category: string; percent: number; total: number };
export type ExpenditureDataList = Array<ExpenditureData>;

export type CashcooksResponse = {
  totalElements: number;
  totalIncome: number;
  totalExpenditure: number;
  cashbooks: CashbookType[];
};

export type CATEGORY =
  | '식비'
  | '생활'
  | '쇼핑/뷰티'
  | '교통'
  | '의료/건강'
  | '문화/여가'
  | '미분류'
  | '월급'
  | '용돈'
  | '기타수입';

export type CATEGORY_TYPE = 'expenditure' | 'income';

export type CashbookType = {
  id?: number;
  category?: CATEGORY;
  category_type?: CATEGORY_TYPE;
  memo?: string;
  payment?: string;
  price?: number;
  date?: string;
};

export type CalendarDayType = {
  income: number;
  expenditure: number;
  total: number;
};

export type CalendarDataType = {
  [key: string]: CalendarDayType;
};

export type FetchDataType = Array<CashbookType>;
