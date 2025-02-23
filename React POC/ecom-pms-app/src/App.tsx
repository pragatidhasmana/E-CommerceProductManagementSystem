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
import Login from "./Components/User/Login";
import Registration from "./Components/User/Registration";
import Protected from "./Components/User/Protected";
import Welcome from "./Welcome";
import NotAuthorize from "./Components/User/NotAuthorize";

function App() {
  return (
    <>
      <Router>
      <Header />
      <Welcome />
      
      <div className="container">

      </div>
      <ToastContainer /> 
      <Footer />
        <Routes>
          <Route path="/category/index" element={<Protected Component={Index} allowedRoutes={["Admin"]} />} />
          <Route path="/category/create" element={<Protected Component={Create} allowedRoutes={["Admin"]} />} />
          <Route path="/category/delete/:id" element={<Protected Component={Delete} allowedRoutes={["Admin"]} />} />
          <Route path="/category/edit/:id" element={<Protected Component={Edit} allowedRoutes={["Admin"]} />} />
          <Route path="/product/create"  element={<Protected Component={ProductCreate} allowedRoutes={["Admin"]} />} />
          <Route path="/product/edit/:id"  element={<Protected Component ={ProductEdit} allowedRoutes={["Admin"]} />} />
          <Route path="/product/delete/:id"  element={<Protected Component={ProductDelete} allowedRoutes={["Admin"]} />} />
          <Route path="/product/index"  element={<Protected Component = {ProductIndex} allowedRoutes={["Admin"]} />} />
          <Route path="/" element={<DashboardIndex/> } />
          <Route path="/details/:id"  element={<Protected Component={DashboardDetail} allowedRoutes={["Admin","User"]}/>} />
          <Route path="/login"  element={<Login />} />
          <Route path="/registration"  element={<Registration />} />
          <Route path="/unauthorized" element={<NotAuthorize/>}/>
        </Routes>
      </Router>;
    </>
  );
}

export default App;
