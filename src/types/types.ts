export type FormTypes = {
  rows: number;
  columns: number;
  limit: number;
};

type CellId = number; // unique value for all table
type CellValue = number; // three digit random number

export type CellTypes = {
  id: CellId;
  amount: CellValue;
};

export type CellWithDistance = {
  value: number;
  distance: number;
  row: number;
  col: number;
};
