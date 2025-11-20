import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import MaterialsPage from "./pages/MaterialsPage";
import VendorsPage from "./pages/VendorsPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/materials" element={<MaterialsPage />} />
          <Route path="/vendors" element={<VendorsPage />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
