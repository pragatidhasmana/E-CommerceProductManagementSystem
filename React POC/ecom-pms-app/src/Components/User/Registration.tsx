import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {

    const navigate =useNavigate();

    const[errors,setErrors] = useState({});
    const[servererror,setServerError] = useState("");

     const POST_API = 'http://localhost:5035/api/Auth/registration'

    const handleSubmit = async (event) =>{
        event.preventDefault();

        const formData = new FormData(event.target) 
        const registerUser = Object.fromEntries(formData.entries())

        const newErrors = validateData(registerUser)
        setErrors(newErrors);

        if(Object.keys(newErrors).length === 0)
        {
            console.log('Form submitted successfully!');
            const res = await fetch(POST_API,{
                method:"POST",
                body: JSON.stringify(registerUser)  ,    
                headers:{
                    'Content-Type': 'application/json'
                }
             })
    
             if(res.ok){
                
                navigate("/login", { replace: true }) 
              }
              else if(res.status===400)
              {
                //validation error
                setServerError("UserName Already Exists");

              }
              else{
                //unable to create product
              }
        }
        else{
            console.log('Form submission failed due to validation errors.');
        }
    }

    const validateData = (data) =>{
        const errors = {};
        const e = document.getElementById("ddlRole");
        if(!data.Name.trim())
        {
            errors.Name = "Name is required field."
        }
        else if(data.Name.length > 20)
        {
            errors.Name = "Username must be at least less than 20 characters."
        }

        if(!data.UserName.trim())
        {
            errors.UserName = "UserName is required field."
        }
        else if(data.UserName.length > 10)
        {
            errors.UserName = "Username must be at least less than 10 characters."
        }

        if(!data.Password.trim())
        {
            errors.Password = "Password is required field."
        }
        else if (data.Password.length > 20) {
            errors.Password = 'Password must be less than 20 characters.';
        }

        if(e.options[e.selectedIndex].value === "0")
        {
            errors.Role = "Please select role for user. "
        }

        return errors;
    }

    return(
    <>
    <div className="shadow border-0 mt-4 mx-auto col-8">
        <div className="card-header bg-secondary bg-gradient ml-0 py-3">
            <div className="row">
                <div className="col-12 text-center">
                    <h2 className="text-white py-2">Sign Up</h2>
                </div>
            </div>
        </div>
        <div className="card-body p-4">
            <form onSubmit={handleSubmit} >
                <div className="border p-3">
                <div className="form-floating py-2 col-12">
                        <input name="Name" type="text"
                        className="form-control border-0 shadow"
                        placeholder="Enter Name"                        
                        
                        />
                        <label className="ms-2">Name</label>
                        {
                            errors.Name && (
                                <span className="text-danger">{errors.Name}</span>
                            )
                        }
                    </div>
                    <div className="form-floating py-2 col-12">
                        <input name="UserName" type="text"
                        className="form-control border-0 shadow"
                        placeholder="Enter User Name"                         
                        
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
                        
                        
                        />
                        <label className="ms-2">Password</label>
                        {
                            errors.Password && (
                                <span className="text-danger">{errors.Password}</span>
                            )
                        }
                    </div>
                    <div className="form-floating py-2 col-12">
                        <select id ="ddlRole"
                        className="form-select border-0 shadow"
                        
                        name ="Role"
                        >
                            <option value="0">--Select Role--</option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                        </select>
                        <label className="ms-2">Role</label>
                        {
                            errors.Role && (
                                <span className="text-danger">{errors.Role}</span>
                            )
                        }
                    </div>
                    <div className="row pt-2">
                        <div className="col-12 col-md-6  mx-auto">
                            <button
                                className="btn btn-primary form-control"
                                
                            >
                                Continue
                            </button>  
                        </div>
                        {
                            servererror && (
                                <span className="text-danger pt-2 text-center">{servererror}</span>
                            )
                        }
                    </div>
                    <div className="row pt-2">
                        <div className="col-12 col-md-3 mx-auto">
                            Already have an account? <Link to="/login">Log In
                            </Link> 
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    </>
)}

export default Registration;
