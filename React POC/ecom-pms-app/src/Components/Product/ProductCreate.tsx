import { Link, useNavigate } from "react-router-dom";
import { Category } from "../../Data/Models/Category";
import { useEffect, useState } from "react";
import { getCategories } from "../../Data/APIs/API";
import { toast } from "react-toastify";
import { GetToken } from "../../Data/GetToken";

const ProductCreate = () => {

  const [errors,setErrors] = useState({});

  const POST_API = 'http://localhost:5035/api/Products'

  const token = GetToken();
  
  const navigate = useNavigate();

  const[ctgory,setCategory]=useState<Category[]>([]);
  
    const getPostData= async ()=>{
      const res = await getCategories();
      setCategory(res.data);
    }
  
    useEffect(()=>{
      getPostData();
    },[])

    

      const handleSubmit = async (event) => {
        event.preventDefault();
        const formData=new FormData(event.target) 
        
        console.log(Object.fromEntries(formData.entries()))
        
        const newErrors = ValidateFormData(Object.fromEntries(formData.entries()));
        setErrors(newErrors);

        if(Object.keys(newErrors).length === 0)
        {
          console.log('Form submitted successfully!');
          try {
          
            const res = await fetch(POST_API,{
                method:"POST",
                body:formData,//JSON.stringify(product)  ,   
               headers: {
                  'Authorization' : `Bearer ${token}`
               }   
              })
  
               console.log(res)
              
  
              if(res.ok){
                
                //product Created correctly
                notify();
                navigate("/product/index", { replace: true }) 
              }
              else if(res.status===400)
              {
                //validation error
              }
              else{
                //unable to create product
              }
            }            
            
           catch (error) {
            alert(`unable connect to server - ${error}`)
          }
        }   
        else
        {
          console.log('Form submission failed due to validation errors.');
        }
      }

    const notify = () => {
            // Calling toast method by passing string
            toast.success("Product Added Successfully!"); 
        };

     const ValidateFormData = (data) => {
        const errors = {};
        const e = document.getElementById("ddlCategory");
        //console.log(e);
        
        if(!data.name.trim())
        {
          errors.name = "Product Name is a required field."
        }
        else if(data.name.length > 200 )
        {
          errors.name = "Product Name must be less than or equal to 200 characters.."
        }

        if(!data.description.trim())
        {
          errors.description = "Product Description is a required field."
        }

        if(!data.price.trim())
        {
          errors.price = "Product Price is a required field."
        }
        else if(data.price < 0)
        {
          errors.price = "Product Price cannot be a negative value."
        }
        
        if(!data.stock.trim())
        {
          errors.stock = "Product Stocks is a required field."
        }
        else if(data.stock < 0)
        {
          errors.stock = "Product Stocks cannot be a negative value."
        }

        if(!data.file.name.trim())
        {
          errors.file = "Please Upload Product Image."
        }

        if(e.options[e.selectedIndex].value === "0")
        {
          errors.categoryId = "Please Select Category"
        }
      return errors;
     }

 return (
    <>
      <div className="shadow border-0 my-4 mb-5 mx-auto col-10">
        <div className="card-header bg-secondary bg-gradient ml-0 py-3">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="text-white py-2">
                Create Product
              </h2>
            </div>
          </div>
        </div>
        <div className="card-body p-4">
          <form id="add-form" className="row" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row">
              <div className="col-12">
                <div className="border p-3">
                  <div className="form-floating py-2 col-12">
                    <input
                      type="text"
                      name="name"
                      className="form-control border-0 shadow"
                      placeholder="Enter Product Name"
                      
                      
                    />
                    <label className="ms-2">Name</label>
                    {errors.name && (
                        <span className="text-danger">
                            {errors.name}
                        </span>
                    )}
                  </div>

                  <div className="form-floating py-2 col-12">
                    <textarea
                      name="description"
                      className="form-control border-0 shadow"
                      placeholder="Enter Product Description"
                      
                      
                    ></textarea>
                    <label
                      className="ms-2"
                    >Description</label>
                    { 
                      errors.description && 
                      (
                        <span className="text-danger">{errors.description}</span>
                      )
                    }
                  </div>
                  <div className="form-floating py-2 col-12">
                    <input
                      type="number"
                      name="price"
                      className="form-control border-0 shadow"
                      placeholder="Enter Price"
                      
                      
                    />
                    <label className="ms-2" >Price</label>
                    { 
                      errors.price && 
                      (
                        <span className="text-danger">{errors.price}</span>
                      )
                    }
                  </div>
                  <div className="form-floating py-2 col-12">
                    <input
                      type="number"
                      name="stock"
                      className="form-control border-0 shadow"
                      placeholder="Enter Stocks"
                      
                      
                    />
                    <label
                      className="ms-2"
                    >Stock Quantity</label>
                    { 
                      errors.stock && 
                      (
                        <span className="text-danger">{errors.stock}</span>
                      )
                    }
                  </div>
                  
                  <div className="form-floating py-2 col-12">
                    <input id="file"
                      type="file"
                      name="file"
                      className="form-control border-0 shadow"
                    />
                     <label className="ms-2">Upload File</label>
                     { 
                      errors.file && 
                      (
                        <span className="text-danger">{errors.file}</span>
                      )
                    }
                  </div>
                  <div className="form-floating py-2 col-12">
                    <select id="ddlCategory"
                      className="form-select border-0 shadow"
                      name ="categoryId"
                      defaultValue="0"
                    >
                      <option disabled value="0">
                        --Select Category--
                      </option>
                      {ctgory.map(c=>(
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                    <label
                      className="ms-2"
                    >Category</label>
                    { 
                      errors.categoryId && 
                      (
                        <span className="text-danger">{errors.categoryId}</span>
                      )
                    }   
                  </div>
                  <div className="row pt-2">
                    <div className="col-6 col-md-3">

                        <button
                          className="btn btn-primary form-control"
                          
                          type="submit"
                        >
                          Create
                        </button>

                    </div>
                    <div className="col-6 col-md-3">
                      <Link
                        to="/product/index"
                        className="btn btn-outline-primary form-control"
                      >
                        Back To List
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductCreate;
