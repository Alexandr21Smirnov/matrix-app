import { StateContext } from 'context/Context';
import React, { useContext } from 'react';

const TableHead = () => {
  const { matrix } = useContext(StateContext);
  return (
    <thead>
      <tr>
        <td />
        {matrix[0].map((_, index) => (
          <td key={index}>
            {matrix[0].length - 1 === index ? <span>Sum values</span> : <span>Cell values N = {index + 1}</span>}
          </td>
        ))}
        <td />
      </tr>
    </thead>
  );
};

export default TableHead;
