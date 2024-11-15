export const SubmitButton = () => {
  return (
    <div className="flex justify-between items-center gap-2">
      <button
        className="flex items-center justify-center rounded-md py-1 px-4 border border-gray-300 shadow-sm hover:bg-gray-100 active:bg-gray-200 disabled:border-gray-200 disabled:bg-gray-200 hover:text-[#6366f1]"
        type="button"
        disabled={false}
      >
        <div className="flex flex-row items-center gap-2">
          <i class="fa-solid fa-upload"></i>
        </div>
      </button>
      <button
        className="flex items-center justify-center rounded-md py-1 px-4 border border-gray-300 shadow-sm hover:bg-gray-100 active:bg-gray-200 disabled:border-gray-200 disabled:bg-gray-200 hover:text-[#6366f1]"
        type="button"
        disabled={false}
      >
        <div className="flex flex-row items-center gap-2">
          <i class="fa-solid fa-play"></i>
        </div>
      </button>
      <button
        className="flex items-center justify-center rounded-md py-1 px-4 border border-gray-300 shadow-sm hover:bg-gray-100 active:bg-gray-200 disabled:border-gray-200 disabled:bg-gray-200 hover:text-[#6366f1]"
        type="button"
        disabled={false}
      >
        <div className="flex flex-row items-center gap-2">
          <i class="fa-solid fa-gear"></i>
        </div>
      </button>
    </div>
  );
};
