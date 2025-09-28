import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout.js";
import Dashboard from "./Pages/Dashboard.js";
import Learn from "./Pages/Learn.js";
import Placeholder from "./Pages/Placeholder.jsx";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/projects" element={<Placeholder />} />
          <Route path="/challenges" element={<Placeholder />} />
          <Route path="/chat" element={<Placeholder />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;