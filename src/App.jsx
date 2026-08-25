import Sidebar from "./components/Sidebar"
import Applications from "./pages/Applications";
import Dashboard from "./pages/Dashboard"
import Interviews from "./pages/Interviews";
import Profile from "./pages/Profile";
import {Routes,Route} from 'react-router'
import Settings from "./pages/Settings";

function App() {

  return (
    <>
      <div className="flex">
        <Sidebar />

        <main className="ml-66 flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/settings" element={<Settings/>}/>
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App
