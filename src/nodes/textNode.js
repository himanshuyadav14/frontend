import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import BaseNode from "./BaseNode";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const textareaRef = useRef(null);

  const extractVariables = useCallback((text) => {
    const regex = /{{\s*(\w+)\s*}}/g;
    const variablesFound = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      variablesFound.push(match[1]);
    }
    return variablesFound;
  }, []);

  const variables = useMemo(() => extractVariables(currText), [currText, extractVariables]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  useEffect(() => {
    data.variables = variables;
  }, [variables, data]);

  return (
    <BaseNode
      id={id}
      title="Text"
      outputHandles={["output"]}
      inputHandles={variables} // Unique handles
      data={{ text: currText, variables }}
    >
      <div className="space-y-3">
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="textInput"
            className="text-sm font-medium text-gray-700"
          >
            Text:
          </label>
          <textarea
            id="textInput"
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
