import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { IsAuthorize } from "./Data/Authorize";

const Header = () => {

const navigate =useNavigate();

console.log(IsAuthorize());

  const handleLogout = () =>{
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("LoggedInUserName");
    localStorage.removeItem("LoggedInUserRole");
    navigate("/login", { replace: true })
    }

  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-dark bg-primary border-bottom box-shadow mb-3">
        <div className="container-fluid">
          <a className="navbar-brand">EcomEasy</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target=".navbar-collapse"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
            <ul className="navbar-nav flex-grow-1">
              <li className="nav-item">
                <Link to='/' className="nav-link">Home</Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Content Management
                </a>
                <ul className="dropdown-menu">
                  <li className="nav-item">
                    {/* <a className="dropdown-item">Category</a> */}
                    <Link to='/category/index' className="dropdown-item">Category</Link>
                  </li>
                  <li className="nav-item">
                  <Link to='/product/index' className="dropdown-item">Product</Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="navbar-nav justify-content-end">
              <li className="nav-item">
                  {(IsAuthorize() && (
                    <div>
                    <a
                        className='navbar-brand'
                        onClick={handleLogout}
                        ><i className="bi bi-box-arrow-in-right"></i></a>
                    </div>
                    
                )) || ( <Link to = '/login'
                className='navbar-brand'
                ><i className="bi bi-box-arrow-in-left"></i></Link>)
                } 
              </li>
            </ul>
            
          </div>
        </div>
      </nav>
    </header>
  )

};

export default Header;
