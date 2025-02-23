import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../Data/APIs/API";

const Login = () => {
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");

    const navigate = useNavigate();

    const handleSubmit = () =>{
        const payload = {
            UserName:username,
            Password:password
        }
        loginUser(payload)
        .then((res)=>{
            localStorage.setItem("jwtToken",JSON.stringify(res.data.token))
            localStorage.setItem("LoggedInUserName",JSON.stringify(res.data.name))
            localStorage.setItem("LoggedInUserRole",JSON.stringify(res.data.role))
           // console.log("Login Success",res)    
            navigate("/", { replace: true })         
        })
        .catch((err)=>{
            console.log("Login Falied",err);  
        }
    )
           
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
                        //value={category.name}
                        onChange={(event)=>setUsername(event.target.value)}
                        />
                        <label className="ms-2">UserName</label>
                    </div>
                    <div className="form-floating py-2 col-12">
                        <input name="Password" type="password"
                        className="form-control border-0 shadow"
                        placeholder="Enter Password" 
                        //value={category.name}
                        onChange={(event)=>(setPassword(event.target.value))}
                        />
                        <label className="ms-2">Password</label>
                    </div>
                    <div className="row pt-2">
                        <div className="col-12 col-md-6  mx-auto">
                            <button onClick={handleSubmit}
                                className="btn btn-primary form-control"
                                //onClick={AddCategory }
                            >
                                Continue
                            </button>  
                        </div>
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
