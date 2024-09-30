export type FormTypes = {
  rows: number;
  columns: number;
  limit?: number;
};

type CellId = number; // unique value for all table
type CellValue = number; // three digit random number

export type CellTypes = {
  id: CellId;
  amount: CellValue;
};

export type PercentageCellTypes = Omit<CellTypes, 'amount'> & { id: number; amount: string };
