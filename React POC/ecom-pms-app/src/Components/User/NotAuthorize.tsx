import { Link } from "react-router-dom";

const NotAuthorize = () => {
  return (
    <>
       <div className="col-10 mx-auto border-0">
        <div className="alert alert-dismissible alert-light">
          {/* <button type="button" className="btn-close" data-bs-dismiss="alert"></button> */}
          <h4 className="alert-heading">Unauthorize Access!</h4>
          <p className="mb-0">
                Access Denied: You do not have the necessary privileges to view this page.<br/>
                Please contact administration.<br/>
            <Link to="/" className="alert-link">
              Go To Dashboard
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default NotAuthorize;
