import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  const nodes = [
    {
      type: "customInput",
      label: "Input",
      icon: <i class="fa-solid fa-arrow-right-to-bracket"></i>,
    },
    {
      type: "llm",
      label: "LLM",
      icon: <i class="fa-solid fa-chart-pie"></i>,
    },
    {
      type: "customOutput",
      label: "Output",
      icon: <i class="fa-solid fa-arrow-right-from-bracket"></i>,
    },
    {
      type: "text",
      label: "Text",
      icon: <i class="fa-solid fa-i-cursor"></i>,
    },
    {
      type: "calculation",
      label: "Calculation",
      icon: <i class="fa-solid fa-calculator"></i>,
    },
    {
      type: "condition",
      label: "Condition",
      icon: <i class="fa-solid fa-fan"></i>,
    },
    {
      type: "database",
      label: "Database",
      icon: <i class="fa-solid fa-database"></i>,
    },
    {
      type: "logger",
      label: "Logger",
      icon: <i class="fa-solid fa-file-signature"></i>,
    },
    {
      type: "converter",
      label: "Converter",
      icon: <i class="fa-solid fa-people-arrows"></i>,
    },
  ];

  return (
    <div style={{ padding: "10px" }} className="overflow-auto">
      <div
        style={{
          marginTop: "10px",
        }}
        className="flex gap-2 "
      >
        {nodes.map((node, index) => (
          <DraggableNode
            key={index}
            type={node.type}
            label={node.label}
            icon={node.icon}
          />
        ))}
      </div>
    </div>
  );
};
