import React from 'react';
import BaseNode from './BaseNode';

export const ConverterNode = ({ id }) => {
  return (
    <BaseNode 
      id={id}
      title="Converter"
      inputHandles={['input']}
      outputHandles={['output']}
    >
      <div>Converts data format.</div>
    </BaseNode>
  );
};
