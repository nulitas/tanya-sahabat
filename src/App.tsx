import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Chat } from "./pages/Chat";

import { SidebarLayout } from "./components/SidebarLayout";
function App() {
  return (
    <div className="font-sans">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<SidebarLayout />}>
            <Route index element={<Chat />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
