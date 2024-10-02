import { StateContext } from 'context/Context';
import React, { useContext } from 'react';

const TableHead = () => {
  const { matrix } = useContext(StateContext);
  if (!matrix.length) return null;
  const headerLength = matrix[0].length;

  return (
    <thead>
      <tr>
        <td />
        {matrix[0].map((_, index) => (
          <td key={index}>
            {index === headerLength - 1 ? <span>Sum values</span> : <span>Cell values N = {index + 1}</span>}
          </td>
        ))}
        <td />
      </tr>
    </thead>
  );
};

export default TableHead;
