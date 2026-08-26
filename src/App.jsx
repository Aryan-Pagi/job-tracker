import Sidebar from "./components/Sidebar";
import Applications from "./pages/Applications";
import Dashboard from "./pages/Dashboard";
import Interviews from "./pages/Interviews";
import Profile from "./pages/Profile";
import { Routes, Route } from "react-router";
import Settings from "./pages/Settings";
import { useState } from "react";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="w-full md:ml-64">
          {/* Mobile Header */}
          <header className="md:hidden h-16 bg-white border-b border-slate-200 flex items-center px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100"
              aria-label="Open navigation"
            >
              ☰
            </button>
            <h1 className="ml-3 text-lg font-semibold text-slate-800">
              Job Tracker
            </h1>
          </header>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
