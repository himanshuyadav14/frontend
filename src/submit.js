import { useStore } from "./store";
import { shallow } from "zustand/shallow";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const {
    nodes,
    edges,
  } = useStore(selector, shallow);

  const handleSubmit = async () => {
    console.log("Nodes data send in backend", nodes);
    console.log("Edges data send in backend", edges);
    try {
      const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes , edges }),
      });
  
      const data = await response.json();
      console.log("Response from backend",data);

      // Format the alert message for user-friendly display
      const message = `
        Pipeline Summary:
        - Number of nodes: ${data.num_nodes}
        - Number of edges: ${data.num_edges}
        - Is the graph a DAG? ${data.is_dag ? "Yes" : "No"}
      `;
  
      alert(message);  // Display the formatted message
    } catch (error) {
      console.error('Error submitting pipeline:', error);
      alert("An error occurred while submitting the pipeline. Please try again.");
    }
  };

  return (
    <div className="flex justify-between items-center gap-2">
      <button
        className="flex items-center text-[#fff] bg-[#6366f1] justify-center rounded-md py-1 px-4 border border-gray-300 shadow-sm hover:bg-[#000] active:bg-gray-200 disabled:border-gray-200 disabled:bg-gray-200"
        type="button"
        onClick={handleSubmit}  // Call the handleSubmit function when button is clicked
      >
        <div className="flex flex-row items-center gap-2">
          Run Pipeline
        </div>
      </button>
    </div>
  );
};

