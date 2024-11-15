import { useState } from "react";
import BaseNode from "./BaseNode";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const inputHandles = ['value'];

  return (
    <BaseNode
      id={id}
      title="Input"
      outputHandles={inputHandles}
    >
      <div className="space-y-3">
        {/* Name Input Field */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="inputName" className="text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            id="inputName"
            type="text"
            value={currName}
            onChange={handleNameChange}
            className="border rounded-md px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Type Selection */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="inputType" className="text-sm font-medium text-gray-700">
            Type:
          </label>
          <select
            id="inputType"
            value={inputType}
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
