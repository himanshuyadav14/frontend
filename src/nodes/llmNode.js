import BaseNode from "./BaseNode";

export const LLMNode = ({ id, data }) => {
  const inputHandles = ["system", "prompt"];
  const outputHandles = ["response"];

  return (
    <BaseNode
      id={id}
      title="LLM"
      inputHandles={inputHandles}
      outputHandles={outputHandles}
    >
      <div>
        <span>This is an LLM.</span>
      </div>
    </BaseNode>
  );
};
