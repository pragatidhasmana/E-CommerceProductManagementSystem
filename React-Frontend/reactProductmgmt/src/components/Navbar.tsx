import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

const Navbar = () => {
    const isAuthenticated = AuthService.isAuthenticated();
    const navigate = useNavigate();

    return (
        <nav className='navbar navbar-strong bg-light px-3'>
            <a className='navbar-brand' href='/'>React Auth</a>
            {
                localStorage.getItem("Role")==="Admin" &&
                (
                    <>
                    <a href="./product">Products</a>
                    <a href="./category" >Category</a>
                    </>
                )
            }
             
                {localStorage.getItem("Role") === "User" &&
                (
                    <>
                    
                    <a href="./view-products">View Products</a> 
                    </>
                )}
            
            {isAuthenticated && (
                <><span> {localStorage.getItem("username")} ({localStorage.getItem("Role")})</span><button
                    className='btn btn-danger'
                    onClick={() => { AuthService.logout(); navigate("/login", { replace: true }); } }>Logout</button></>
            )}
        </nav>
    )

}

export default Navbar;