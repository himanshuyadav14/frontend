import React, { useEffect } from "react";
import { useStore } from "../../src/store";
import { Handle, Position } from "reactflow";
import { FaNode } from "react-icons/fa";

const BaseNode = ({
  id,
  title,
  inputHandles = [],
  outputHandles = [],
  children,
  style = {},
}) => {
  const calculateHandleSpacing = (handleCount) => {
    return handleCount > 1 ? 100 / (handleCount + 1) : 50;
  };

  const { deleteNode } = useStore();

  const handleDelete = () => {
    deleteNode(id);
  };

  const data = [
    { type: "customInput", icon: <i className="fa-solid fa-arrow-right-to-bracket"></i>},
    { type: "llm", icon: <i className="fa-solid fa-chart-pie"></i> },
    { type: "customOutput", icon: <i className="fa-solid fa-arrow-right-from-bracket"></i>},
    { type: "text", icon: <i className="fa-solid fa-i-cursor"></i> },
    { type: "calculation", icon: <i className="fa-solid fa-calculator"></i> },
    { type: "condition", icon: <i className="fa-solid fa-fan"></i> },
    { type: "database", icon: <i className="fa-solid fa-database"></i> },
    { type: "logger", icon: <i className="fa-solid fa-file-signature"></i> },
    { type: "converter", icon: <i className="fa-solid fa-people-arrows"></i> },
  ];

  const getIconForType = (id) => {
    const found = data.find((item) => id.includes(item.type));
    return found ? found.icon : <FaNode style={{ color: "#007bff" }} />;
  };

  const icon = getIconForType(id);

  return (
    <div
      style={{
        width: 280,
        height: "auto",
        padding: "10px",
        backgroundColor: "#ffffff",
        ...style,
      }}
      className="border border-[#A9ABF7] shadow-[0px_0px_0px_4px_rgba(169,171,247,0.8)] transition-all duration-200 hover:shadow-[0px_0px_0px_4px_rgba(169,171,247,1)] rounded-[6px] relative text-gray-500 hover:text-[#6366f1]"
    >
      <div className="font-bold flex justify-between items-center">
        <div className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </div>
        <i
          className="fa-regular fa-circle-xmark text-3xl text-gray-500"
          onClick={handleDelete}
        ></i>
      </div>

      <div className="mt-2 text-gray-500">{children}</div>

      {inputHandles.map((handleId, index) => {
        const top = calculateHandleSpacing(inputHandles.length) * (index + 1);
        return (
          <>
            <Handle
              key={`${id}-${handleId}`}
              type="target"
              position={Position.Left}
              id={`${id}-${handleId}`}
              isConnectable={true}
              style={{
                top: `${top}%`,
                transform: "translateY(-50%)",
                left: -10,
                width: 15,
                height: 15,
                backgroundColor: "#ffffff",
                borderRadius: "50%",
                border: "2px solid gray",
                zIndex: "10",
              }}
              className="hover:shadow-[0px_0px_0px_4px_rgba(169,171,247,1)]"
            />
            <div
              style={{
                position: "absolute",
                top: `${top}%`,
                left: handleId.length > 6 ? "-70px" : "-60px",
                transform: "translateY(-50%)",
                fontSize: "12px",
                color: "gray",
                width: "60px",
                wordWrap: "break-word",
                whiteSpace: "normal",
                lineHeight: "14px",
              }}
            >
              {handleId}
            </div>
          </>
        );
      })}

      {outputHandles.map((handleId, index) => {
        const top = calculateHandleSpacing(outputHandles.length) * (index + 1);
        return (
          <>
            <Handle
              key={`${id}-${handleId}`}
              type="source"
              position={Position.Right}
              id={`${id}-${handleId}`}
              isConnectable={true}
              style={{
                top: `${top}%`,
                transform: "translateY(-50%)",
                right: -10,
                width: 15,
                height: 15,
                backgroundColor: "#ffffff",
                borderRadius: "50%",
                border: "2px solid gray",
              }}
              className="hover:shadow-[0px_0px_0px_4px_rgba(169,171,247,1)]"
            />
            <div
              style={{
                position: "absolute",
                top: `${top}%`,
                right: "-75px",
                transform: "translateY(-50%)",
                fontSize: "12px",
                color: "gray",
                width: "60px",
                wordWrap: "break-word",
                whiteSpace: "normal",
                lineHeight: "14px",
              }}
            >
              {handleId}
            </div>
          </>
        );
      })}
    </div>
  );
};

export default BaseNode;
