import React, { Dispatch, ReactNode, createContext, useState } from 'react';
import { CellTypes, FormTypes } from '../types/types';

type StateContextType = {
  formData: FormTypes;
  matrix: Array<Array<CellTypes>>;
  setFormData: Dispatch<React.SetStateAction<FormTypes>>;
  setMatrix: Dispatch<React.SetStateAction<Array<Array<CellTypes | null>>>>;
};

type ContextProviderProps = {
  children: ReactNode;
};

const defaultState = {
  formData: {},
  matrix: [[{}]],
  setFormData: (_formData: FormTypes) => {},
  setMatrix: (_matrix: Array<Array<CellTypes>>) => {},
} as StateContextType;

export const StateContext = createContext(defaultState);

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [formData, setFormData] = useState({
    rows: 0,
    columns: 0,
    limit: 0,
  });
  const [matrix, setMatrix] = useState<Array<Array<CellTypes>>>([[]]);

  const value = {
    matrix,
    formData,
    setMatrix,
    setFormData,
  } as StateContextType;

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
};
