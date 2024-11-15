import React from 'react';
import BaseNode from './BaseNode';

export const ConditionNode = ({ id }) => {
  return (
    <BaseNode 
      id={id}
      title="Condition"
      inputHandles={['condition']}
      outputHandles={['true', 'false']}
    >
      <div>Returns true or false based on condition.</div>
    </BaseNode>
  );
};