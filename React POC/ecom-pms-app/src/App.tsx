import Header from "./Header";
import Footer from "./Footer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./Components/Category/Index";
import Create from "./Components/Category/Create";
import { ToastContainer } from "react-toastify";
import Delete from "./Components/Category/Delete";
import Edit from "./Components/Category/Edit";

function App() {
  return (
    <>
      <Router>
      <Header />
      <div className="container">

      </div>
      <ToastContainer /> 
      <Footer />
        <Routes>
        <Route path="/" element={<Index />} />
          <Route path="/category/index" element={<Index />} />
          <Route path="/category/create" element={<Create />} />
          <Route path="/category/delete/:id" element={<Delete />} />
          <Route path="/category/edit/:id" element={<Edit />} />
        </Routes>
      </Router>;
    </>
  );
}

export default App;
