import { Link } from "react-router-dom";

const Header = () => {
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
                <a className="nav-link">Home</a>
              </li>
              {/* <li className="nav-item">
                  <a
                    className="nav-link "
                    asp-area="Admin"
                    asp-controller="Order"
                    asp-action="Index"
                  >
                    Manage Order
                  </a>
                </li> */}
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
                    <a className="dropdown-item">Product</a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                </ul>
              </li>
              {/* <li className="nav-item">
                  <a
                    className="nav-link "
                    asp-area="Customer"
                    asp-controller="Cart"
                    asp-action="Index"
                  >
                    <i className="bi bi-cart"></i> &nbsp; (0)
                  </a>
                </li> */}
            </ul>
            {/* <partial name="_LoginLogout" /> */}
          </div>
        </div>
      </nav>
    </header>
  )

};

export default Header;
