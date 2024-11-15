export const DraggableNode = ({ type, label, icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-md py-2 px-6 border text-gray-500  border-gray-300 shadow-sm cursor-grab ${type} hover:bg-gray-100 active:bg-gray-200 disabled:border-gray-200 disabled:bg-gray-200 hover:text-[#6366f1]`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      draggable
    >
      <div>{icon}</div>
      <div>{label}</div>
    </div>
  );
};
