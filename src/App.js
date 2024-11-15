import { useState } from "react";
import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";

function App() {
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);

  const toggleToolbar = () => {
    setIsToolbarVisible((prev) => !prev);
  };

  const toolbarTransform = isToolbarVisible
    ? "translateY(0)"
    : "translateY(-100%)";
  const buttonTransform = isToolbarVisible ? "translateY(0)" : "translateY(-200%)";
  const commonStyles =
    "absolute top-44 left-10 p-3 z-10 transition-transform duration-300 ease-in-out text-gray-500 hover:text-[#6366f1]";

  return (
    <div className="h-screen overflow-hidden relative">
      <div className="flex flex-col border-2 border-gray-200 rounded-lg m-3 overflow-hidden">
        <div className="bg-white shadow-md p-2 flex justify-between items-center rounded-t border-b border-gray z-20">
          <div className="flex text-md font-light justify-center items-center gap-2">
            <div>
              <i className="fa-regular fa-file-code"></i>
            </div>
            <div>
              Vectorshift <i className="fa-solid fa-chevron-right"></i> Pipeline
            </div>
          </div>

          <SubmitButton />
        </div>

        <button
          onClick={toggleToolbar}
          className={commonStyles}
          style={{ transform: buttonTransform }}
        >
          <i
            className={`transition-all duration-300 ease-in-out ${
              isToolbarVisible
                ? "fa-regular fa-circle-xmark text-3xl"
                : "fa-solid fa-square-plus text-3xl"
            }`}
          ></i>
        </button>

        {isToolbarVisible && (
          <div
            className="bg-white shadow-md p-2 flex justify-between items-center rounded-b-lg transition-transform duration-600 ease-in-out"
            style={{ transform: toolbarTransform }}
          >
            <PipelineToolbar />
          </div>
        )}

        <div
          className="flex-grow w-full transition-all duration-300 ease-in-out"
          style={{ height: isToolbarVisible ? "80vh" : "92vh" }}
        >
          <PipelineUI />
        </div>
      </div>
    </div>
  );
}

export default App;
