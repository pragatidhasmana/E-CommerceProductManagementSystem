import { Link, useNavigate } from "react-router-dom";

const Registration = () => {

    const navigate =useNavigate();

     const POST_API = 'http://localhost:5035/api/Auth/registration'

    const handleSubmit = async (event) =>{
        event.preventDefault();
        const formData = new FormData(event.target) 
        const registerUser = Object.fromEntries(formData.entries())

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
          }
          else{
            //unable to create product
          }

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
                    </div>
                    <div className="form-floating py-2 col-12">
                        <input name="UserName" type="text"
                        className="form-control border-0 shadow"
                        placeholder="Enter User Name"                         
                        
                        />
                        <label className="ms-2">UserName</label>
                    </div>
                    <div className="form-floating py-2 col-12">
                        <input name="Password" type="password"
                        className="form-control border-0 shadow"
                        placeholder="Enter Password" 
                        
                        
                        />
                        <label className="ms-2">Password</label>
                    </div>
                    <div className="form-floating py-2 col-12">
                        <select
                        className="form-select border-0 shadow"
                        
                        name ="Role"
                        >
                            <option value="">--Select Role--</option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                        </select>
                        <label className="ms-2">Role</label>
                    </div>
                    <div className="row pt-2">
                        <div className="col-12 col-md-6  mx-auto">
                            <button
                                className="btn btn-primary form-control"
                                
                            >
                                Continue
                            </button>  
                        </div>
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
