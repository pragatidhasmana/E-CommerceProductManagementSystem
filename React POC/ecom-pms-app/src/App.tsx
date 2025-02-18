import Header from "./Header";
import Footer from "./Footer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./Components/Category/Index";
import Create from "./Components/Category/Create";
import { ToastContainer } from "react-toastify";
import Delete from "./Components/Category/Delete";
import Edit from "./Components/Category/Edit";
import ProductCreate from "./Components/Product/ProductCreate";
import ProductEdit from "./Components/Product/ProductEdit";
import ProductDelete from "./Components/Product/ProductDelete";
import DashboardIndex from "./Components/Dashboard/DashboardIndex";
import ProductIndex from "./Components/Product/ProductIndex";
import DashboardDetail from "./Components/Dashboard/DashboardDetail";

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
          <Route path="/category/index" element={<Index />} />
          <Route path="/category/create" element={<Create />} />
          <Route path="/category/delete/:id" element={<Delete />} />
          <Route path="/category/edit/:id" element={<Edit />} />
          <Route path="/product/create"  element={<ProductCreate />} />
          <Route path="/product/edit/:id"  element={<ProductEdit />} />
          <Route path="/product/delete/:id"  element={<ProductDelete />} />
          <Route path="/product/index"  element={<ProductIndex />} />
          <Route path="/"  element={<DashboardIndex />} />
          <Route path="/details/:id"  element={<DashboardDetail />} />
        </Routes>
      </Router>;
    </>
  );
}

export default App;
