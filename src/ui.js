import { useState, useRef, useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
} from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { InputNode } from "./nodes/inputNode";
import { LLMNode } from "./nodes/llmNode";
import { OutputNode } from "./nodes/outputNode";
import { TextNode } from "./nodes/textNode";
import { ConditionNode } from "./nodes/ConditionNode";
import { CalculationNode } from "./nodes/CalculationNode";
import { ConverterNode } from "./nodes/ConverterNode";
import { DatabaseNode } from "./nodes/DataBaseNode";
import { LoggerNode } from "./nodes/LoggerNode";
import CustomSmoothStepEdge from "./CustomEdge"

import "reactflow/dist/style.css";

const gridSize = 10;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  condition: ConditionNode,
  calculation: CalculationNode,
  converter: ConverterNode,
  database: DatabaseNode,
  logger: LoggerNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  deleteNode: state.deleteNode,
  deleteEdge: state.deleteEdge,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    deleteNode,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!reactFlowInstance) return;
  
      const rawData = event.dataTransfer.getData("application/reactflow");
      if (!rawData) return;
  
      const appData = JSON.parse(rawData);
      const type = appData?.nodeType;
  
      if (!type || !nodeTypes[type]) {
        console.error(`Invalid or unsupported node type: ${type}`);
        return;
      }
  
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
  
      const nodeID = getNodeID(type);
      addNode({
        id: nodeID,
        type,
        position,
        data: { id: nodeID, nodeType: type },
      });
    },
    [reactFlowInstance, getNodeID, addNode]
  );
  

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <>
      <div
        ref={reactFlowWrapper}
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          edgeTypes={{ customSmoothStep: CustomSmoothStepEdge }}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType="smoothstep"
          maxZoom={6}
          zoomOnScroll={true}
        >
          <Background color="#aaa" gap={gridSize} />
          <div style={{ position: "absolute", bottom: "10px", right: "10px" }}>
            <Controls
              style={{ position: "absolute", bottom: "25px", left: "-280px" }}
            />
            <MiniMap style={{ marginTop: "10px" }} />
          </div>
        </ReactFlow>
      </div>
    </>
  );
};
