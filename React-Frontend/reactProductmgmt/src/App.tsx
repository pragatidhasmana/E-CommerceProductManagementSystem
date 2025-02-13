import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login"; // Adjust the path if needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Add other routes here, e.g., Dashboard */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
