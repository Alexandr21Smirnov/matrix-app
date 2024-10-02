import { useState } from 'react';
import { CellTypes } from 'types/types';
import { findNearestCells } from 'utils/utils';

export function useHighlightCells(matrix: CellTypes[][], limit: number) {
  const [highlightedCells, setHighlightedCells] = useState<string[]>([]);
  const [hoveredSumRow, setHoveredSumRow] = useState<number | null>(null);

  const handleMouseOver = (targetCell: number, targetValue: number) => {
    const nearestCells = findNearestCells(matrix, targetCell, targetValue, limit);
    setHighlightedCells(nearestCells);
  };

  const handleMouseOut = () => {
    setHighlightedCells([]);
  };

  return {
    highlightedCells,
    hoveredSumRow,
    setHoveredSumRow,
    setHighlightedCells,
    handleMouseOver,
    handleMouseOut,
  };
}
