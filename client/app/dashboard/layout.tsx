import React from 'react';
import { Sidebar } from '../../src/components/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-white text-gray-900 font-sans">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-white p-8">
        {children}
      </main>
    </div>
  );
}
