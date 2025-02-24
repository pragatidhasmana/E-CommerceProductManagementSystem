
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


const Create = () => {

    const [errors, setErrors] = useState({});

    const POST_API = 'http://localhost:5035/api/Category'

    const token = JSON.parse(localStorage.getItem("jwtToken"));

    const navigate = useNavigate();

    const [category, setCategory] = useState({  name: ''});

    const handleChange = (inputIdentifier: string,newValue: string) => {

      setCategory( prevInput =>{
            return {
                ...prevInput,
                [inputIdentifier]: newValue
            }
        });

    }

    const notify = () => {
        toast.success("Category Added Successfully!"); 
    };
  
    const AddCategory = async (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors = validateForm(category);
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        // Form submission logic here
        console.log("Form submitted successfully!");
        const data = await axios.post(
          POST_API,
          document.querySelector("#add-form"),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        notify();
        navigate("/category/index", { replace: true });
      } else {
        console.log("Form submission failed due to validation errors.");
      }
    };

    const validateForm = (data) =>
    {

      console.log(data);
      
      const errors = {};
          if (!data.name.trim()) 
          {
            errors.name = "Category Name is a required field.";
          } 
          else if (data.name.length > 100) 
          {
            errors.name = "Category Name must be less than or equal to 100 characters.";
          }
          return errors
    }

  return (
    <>
      <div className="shadow border-0 mt-4 mx-auto col-8">
        <div className="card-header bg-secondary bg-gradient ml-0 py-3">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="text-white py-2">Create Category</h2>
            </div>
          </div>
        </div>
        <div className="card-body p-4">
          <form id="add-form" >
            <div className="border p-3">

             <div className="form-floating py-2 col-12">
                <input name="name" type="text"
                  className="form-control border-0 shadow"
                  placeholder="Enter Category Name" 
                  value={category.name}
                  onChange={(event)=>handleChange("name",event?.target.value)}
                />
                <label className="ms-2">Name</label>
                {errors.name && (
                        <span className="text-danger">
                            {errors.name}
                        </span>
                    )}
              </div>

              
              <div className="row pt-2">
                <div className="col-6 col-md-3">
                  <button
                    className="btn btn-primary form-control"
                    onClick={AddCategory }
                  >
                    Create
                  </button>  
                </div>
                <div className="col-6 col-md-3">
                  <Link
                    to='/category/index'
                    className="btn btn-outline-primary form-control"
                  >
                    Back To List
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
