import { useState } from 'react';
import BaseNode from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  const outputHandles = ['value'];

  return (
    <BaseNode 
      id={id}
      title="Output"
      inputHandles={outputHandles}
    >
      <div className="space-y-3">
        {/* Name Input Field */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="outputName" className="text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            id="outputName"
            type="text"
            value={currName}
            onChange={handleNameChange}
            className="border rounded-md px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Type Selection */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="outputType" className="text-sm font-medium text-gray-700">
            Type:
          </label>
          <select
            id="outputType"
            value={outputType}
            onChange={handleTypeChange}
            className="border rounded-md px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};
