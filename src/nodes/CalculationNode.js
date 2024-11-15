import React from 'react';
import BaseNode from './BaseNode';

export const CalculationNode = ({ id }) => {
  return (
    <BaseNode 
      id={id}
      title="Calculation"
      inputHandles={['input1', 'input2']}
      outputHandles={['result']}
    >
      <div>Performs addition of two values.</div>
    </BaseNode>
  );
};