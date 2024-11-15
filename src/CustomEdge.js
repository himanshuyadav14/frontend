import React from "react";
import {
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  SmoothStepEdge,
} from "reactflow";
import { useStore } from "./store";

const CustomSmoothStepEdge = (props: EdgeProps) => {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    markerEnd,
  } = props;

  // Get the deleteEdge function from the store
  const deleteEdge = useStore((state) => state.deleteEdge);

  // Calculate edge path and label position
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  // Calculate the midpoint for positioning the delete icon
  const midX = (sourceX + targetX) / 2;
  const midY = (sourceY + targetY) / 2;

  // Function to handle delete click
  const handleDeleteClick = () => {
    deleteEdge(id); // Delete the edge using the edge ID
  };

  return (
    <>
      {/* Render the SmoothStep edge with custom styles */}
      <SmoothStepEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{ stroke: "#0000FF", strokeWidth: 2, zIndex:100 }} // solid blue line
        {...props}
      />

      {/* Render the delete icon at the midpoint of the edge */}
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(${midX}px, ${midY}px) translate(-50%, -50%)`,
            pointerEvents: "all",
          }}
          className="edge-delete-icon"
        >
          <i
            className="fa-solid fa-xmark text-lg"
            style={{
              cursor: "pointer",
              fontSize: "16px",
              color: "red",
              zIndex: "10",
            }}
            onClick={handleDeleteClick}
          />
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomSmoothStepEdge;
