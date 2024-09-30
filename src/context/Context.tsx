import React, { Dispatch, ReactNode, createContext, useState } from 'react';
import { CellTypes, FormTypes } from '../types/types';

type StateContextType = {
  nearestValue: 0;
  formData: FormTypes;
  matrix: Array<Array<CellTypes>>;
  setFormData: Dispatch<React.SetStateAction<FormTypes>>;
  setMatrix: Dispatch<React.SetStateAction<Array<Array<CellTypes | null>>>>;
  setNearestValue: Dispatch<React.SetStateAction<number>>;
};

type ContextProviderProps = {
  children: ReactNode;
};

const defaultState = {
  nearestValue: 0,
  formData: {},
  matrix: [[{}]],
  setFormData: (_formData: FormTypes) => {},
  setMatrix: (_matrix: Array<Array<CellTypes>>) => {},
  setNearestValue: (_value: number) => {},
} as StateContextType;

export const StateContext = createContext(defaultState);

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [formData, setFormData] = useState({
    rows: 0,
    columns: 0,
    limit: undefined,
  });
  const [nearestValue, setNearestValue] = useState(0);
  const [matrix, setMatrix] = useState<Array<Array<CellTypes>>>([[]]);

  const value = {
    matrix,
    formData,
    nearestValue,
    setMatrix,
    setFormData,
    setNearestValue,
  } as StateContextType;

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
};
