import React from 'react';
import { WorkerSidebar } from '../components/WorkerSidebar';

const WorkerLayout = ({ title, children }) => {
  return (
    <div className="flex h-screen bg-[#f7f9fb]">
      <WorkerSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b border-[#e0e0e0] px-8 h-16 flex items-center justify-between bg-white">
          <h1 className="text-[#2c2c2c] text-lg font-bold">{title}</h1>
        </header>
        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default WorkerLayout;