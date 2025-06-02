import React, { useState } from 'react';
import { WorkerSidebar } from '../components/WorkerSidebar';

const WorkerLayout = ({ title, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#f7f9fb] overflow-hidden">
      {/* Sidebar móvil */}
      <div 
        className={`
          fixed inset-y-0 left-0 z-30 w-64 md:relative md:translate-x-0
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <WorkerSidebar />
      </div>

      {/* Overlay para móvil */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-20 
          transition-opacity duration-300 ease-in-out"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="border-b border-[#e0e0e0] px-4 md:px-8 h-16 flex items-center justify-between bg-white">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden text-[#2c2c2c] hover:text-[#005bac] 
              transition-colors duration-200"
            >
              {isSidebarOpen ? "×" : "☰"}
            </button>
            <h1 className="text-[#2c2c2c] text-base md:text-lg font-bold truncate">
              {title}
            </h1>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default WorkerLayout;