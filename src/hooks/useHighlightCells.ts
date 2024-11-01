import { findNearestCells } from 'helpers/tableHelper';
import { useState } from 'react';
import { CellTypes } from 'types/types';

export function useHighlightCells(matrix: CellTypes[][], limit: number) {
  const [highlightedCells, setHighlightedCells] = useState<string[]>([]);
  const [hoveredSumRow, setHoveredSumRow] = useState<number | null>(null);

  const handleHighlightCells = (targetCell: number, targetValue: number) => {
    const nearestCells = findNearestCells(matrix, targetCell, targetValue, limit);
    setHighlightedCells(nearestCells);
  };

  const handleUnHighlightCells = () => {
    setHighlightedCells([]);
  };

  return {
    highlightedCells,
    hoveredSumRow,
    setHoveredSumRow,
    setHighlightedCells,
    handleHighlightCells,
    handleUnHighlightCells,
  };
}
