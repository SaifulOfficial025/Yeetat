import React from "react";
import { useDarkMode } from "../../contexts/DarkModeContext";

function BestAI() {
  const { isDarkMode } = useDarkMode();
  
  return (
    <div className={`py-16 px-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          The World's Best AI Tools Directory
        </h2>
        <p className="mt-4 text-lg">
          Discover amazing AI tools for every purpose.
        </p>
      </div>
    </div>
  );
}

export default BestAI;