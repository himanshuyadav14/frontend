import React from 'react';
import BaseNode from './BaseNode';

export const LoggerNode = ({ id }) => {
  return (
    <BaseNode 
      id={id}
      title="Logger"
      inputHandles={['logData']}
      outputHandles={['logged']}
    >
      <div>Logs data to console.</div>
    </BaseNode>
  );
};
