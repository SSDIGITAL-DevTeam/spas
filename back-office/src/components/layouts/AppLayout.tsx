import { JSX, ReactNode, useState } from "react";
import Sidebar from "@/components/partials/Sidebar";
import Navbar from "@/components/partials/Navbar";

type Props = {
  children: ReactNode;
};

export default function AppLayout({ children }: Props): JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content shifted right on desktop */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <Navbar onMenuToggle={() => setSidebarOpen((v) => !v)} />
        <main className="flex-1 p-4 sm:p-6 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
