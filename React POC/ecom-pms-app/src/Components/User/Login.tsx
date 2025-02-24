import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../Data/APIs/API";

const Login = () => {
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const[errors,setErrors]=useState({});
    const[res,setRes]=useState("");

    const navigate = useNavigate();

    const handleSubmit = () =>{
        const payload = {
            UserName:username,
            Password:password
        }
        const newErrors = validateData(payload)
        setErrors(newErrors);

        if(Object.keys(newErrors).length === 0)
        {
            console.log('Form submitted successfully!');
            loginUser(payload)
              .then((res) => {
                localStorage.setItem(
                  "jwtToken",
                  JSON.stringify(res.data.token)
                );
                localStorage.setItem(
                  "LoggedInUserName",
                  JSON.stringify(res.data.name)
                );
                localStorage.setItem(
                  "LoggedInUserRole",
                  JSON.stringify(res.data.role)
                );
                // console.log("Login Success",res)
                navigate("/", { replace: true });
              })
              .catch((err) => {
                console.log("Login Falied", err);
                setRes("Invalid Username or Password");
              });
        }
        else{
            console.log('Form submission failed due to validation errors.');
        }                 
    }

    const validateData = (data) =>{
        const errors = {};

        if(!data.UserName.trim())
        {
            errors.UserName = "UserName is required field."
        }

        if(!data.Password.trim())
        {
            errors.Password = "Password is required field."
        }
        return errors;
    }

    return(
    <>
    <div className="shadow border-0 mt-4 mx-auto col-8">
        <div className="card-header bg-secondary bg-gradient ml-0 py-3">
            <div className="row">
                <div className="col-12 text-center">
                    <h2 className="text-white py-2">Login</h2>
                </div>
            </div>
        </div>
        <div className="card-body p-4">
                <div className="border p-3">
                    <div className="form-floating py-2 col-12">
                        <input name="UserName" type="text"
                        className="form-control border-0 shadow"
                        placeholder="Enter User Name"
                        
                        onChange={(event)=>setUsername(event.target.value)}
                        />
                        <label className="ms-2">UserName</label>
                        {
                            errors.UserName && (
                                <span className="text-danger">{errors.UserName}</span>
                            )
                        }
                    </div>
                    <div className="form-floating py-2 col-12">
                        <input name="Password" type="password"
                        className="form-control border-0 shadow"
                        placeholder="Enter Password" 
                        
                        onChange={(event)=>(setPassword(event.target.value))}
                        />
                        <label className="ms-2">Password</label>
                        {
                            errors.Password && (
                                <span className="text-danger">{errors.Password}</span>
                            )
                        }
                    </div>
                    <div className="row pt-2">
                        <div className="col-12 col-md-6  mx-auto">
                            <button onClick={handleSubmit}
                                className="btn btn-primary form-control"
                                
                            >
                                Continue
                            </button>  
                        </div>
                        {
                            res && (
                                <span className="text-danger pt-2 text-center">{res}</span>
                            )
                        }
                    </div>
                    <div className="row pt-2">
                        <div className="col-12 col-md-3 mx-auto">
                            Don't have an account? <Link to="/registration">Sign Up
                            </Link> 
                        </div>
                    </div>
                </div>
        </div>
    </div>
    </>
)}

export default Login;
