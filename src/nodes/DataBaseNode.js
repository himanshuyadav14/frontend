import React from 'react';
import BaseNode from './BaseNode';

export const DatabaseNode = ({ id }) => {
  return (
    <BaseNode 
      id={id}
      title="Database"
      inputHandles={['query']}
      outputHandles={['success', 'error']}
    >
      <div>Executes a database query.</div>
    </BaseNode>
  );
};
