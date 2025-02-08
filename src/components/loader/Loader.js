import React from "react";

function Loader() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-blue-500">Loading...</p>
      </div>
    </div>
  );
}

export default Loader;
