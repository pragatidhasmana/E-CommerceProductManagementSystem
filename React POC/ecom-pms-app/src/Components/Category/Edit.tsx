import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCategoriesById, updateCategoryById } from "../../Data/APIs/API";
import { toast } from "react-toastify";


const Edit = () => {

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const[ctgory,setCategory]=useState({ name: "", id: 0 });

    const {id} = useParams();

    const handleChange = (inputIdentifier: string,newValue: string) => {

        setCategory( prevInput =>{
            return {
                ...prevInput,
                [inputIdentifier]: newValue
            }
        });        
        
    }
    
    const notify = () => {
            // Calling toast method by passing string
            toast.success("Category Updated Successfully!"); 
    };

    const UpdateCategory = async (e:React.FormEvent) =>{
        e.preventDefault()
        const newErrors = validateForm(ctgory);
        setErrors(newErrors);
        
        if (Object.keys(newErrors).length === 0) {
          // Form submission logic here
          console.log("Form submitted successfully!");
          const res = await updateCategoryById(id,ctgory)
          console.log(res);

         notify();
         navigate("/category/index", { replace: true })   
          
        } else {
          console.log("Form submission failed due to validation errors.");
        }
       
    }
  
      const getData= async ()=>{
        const res = await getCategoriesById(id);
          setCategory({
            id : res.data.id ,
            name : res.data.name
        });
        }
    
      useEffect(()=>{
        getData();
      },[])

      const validateForm = (data) =>
        {
    
          console.log(data);
          
          const errors = {};
              if (!data.name.trim()) 
              {
                errors.name = "Category Name is a required field.";
              } 
              else if (data.name.length >= 100) 
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
              <h2 className="text-white py-2">Edit Category</h2>
            </div>
          </div>
        </div>
        <div className="card-body p-4">
          <form>
            <div className="border p-3">

            <div className="form-floating py-2 col-12">
                <input type="number"
                  className="form-control border-0 shadow"
                  placeholder="Enter Display Order" disabled
                  value={ctgory.id} 
                />
                <label className="ms-2">Id</label>
              </div>

              <div className="form-floating py-2 col-12">
                <input
                  name = "name"
                  className="form-control border-0 shadow"
                  placeholder="Enter Category Name"
                  value={ctgory.name}
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
                    onClick={UpdateCategory}
                  >
                    Update
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

export default Edit;
