import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import BaseNode from "./BaseNode";

export const TextNode = ({ id, data, onVariablesChange }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const textareaRef = useRef(null);

  // Extract variables enclosed in double curly braces
  const extractVariables = useCallback((text) => {
    const regex = /{{\s*(\w+)\s*}}/g;
    const variablesFound = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      variablesFound.push(match[1]);
    }
    return variablesFound;
  }, []);

  // Memoize variables to prevent unnecessary re-renders
  const variables = useMemo(() => extractVariables(currText), [currText, extractVariables]);

  // Handle text change
  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  // Update variables when they change
  useEffect(() => {
    if (onVariablesChange) {
      onVariablesChange(variables);
    }
  }, [variables, onVariablesChange]);

  return (
    <BaseNode
      id={id}
      title="Text"
      outputHandles={["output"]}
      inputHandles={variables} // Dynamic handles based on variables
      data={{ text: currText, variables }}
    >
      <div className="space-y-3">
        <div className="flex flex-col space-y-1">
          <label
            htmlFor={`textInput-${id}`}
            className="text-sm font-medium text-gray-700"
          >
            Text:
          </label>
          <textarea
            id={`textInput-${id}`}
            value={currText}
            onChange={handleTextChange}
            ref={textareaRef}
            rows={1}
            className="border rounded-md px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
          />
        </div>
      </div>
    </BaseNode>
  );
};

// PropTypes for validation
TextNode.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({
    text: PropTypes.string,
  }).isRequired,
  onVariablesChange: PropTypes.func,
};

// Default props
TextNode.defaultProps = {
  onVariablesChange: null,
};
