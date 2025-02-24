import { Link, useNavigate, useParams } from "react-router-dom";
import { getCategories, getProductById } from "../../Data/APIs/API";
import { useEffect, useState } from "react";
import { Category } from "../../Data/Models/Category";
import { Product } from "../../Data/Models/Product";
import { toast } from "react-toastify";
import { imageFileServer } from "../../Data/Constant";
import { GetToken } from "../../Data/GetToken";
//import { imageFileServer } from "../../Data/Constant";


const ProductEdit = () => {

  const POST_API = "http://localhost:5035/api/Products";

  const token = GetToken();

  const [catgories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState(0);
  const [product, setProduct] = useState<Product>();
  const [errors, setErrors] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  const getCategoryDDL = async () => {
    const res = await getCategories();
    setCategories(res.data);
  };

  const getProduct = async () => {
    const res = await getProductById(id);
    setProduct(res.data);
    setCategoryId(res.data.categoryId);
  };

  const handleCategoryChange = (event) => {
    setCategoryId(event.target.value);
  };

  const handleChange = (identifier: string, newValue: string) => {
    setProduct((prevInput) => {
      return {
        ...prevInput,
        [identifier]: newValue,
      };
    });
  };

  //console.log(categoryId);

  useEffect(() => {
    getCategoryDDL();
    getProduct();
  }, []);

  const notify = () => {
    // Calling toast method by passing string
    toast.success("Product Updated Successfully!");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const newErrors = ValidateFormData(Object.fromEntries(formData.entries()));
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Form submission logic here
      console.log("Form submitted successfully!");
      try {
        //console.log(JSON.stringify(product) );
        const res = await fetch(`${POST_API}/${id}`, {
          method: "PUT",
          body: formData, //JSON.stringify(product)  ,
          headers: {
              'Authorization' : `Bearer ${token}`
          }
        });
  
        console.log(res);
        //const data=await res.json()
  
        if (res.ok) {
          console.log("Updated");
  
          notify();
          navigate("/product/index", { replace: true });
        } else if (res.status === 400) {
          //validation error
        } else {
          //unable to create product
        }
      } catch (error) {
        alert(`unable connect to server - ${error}`);
      }

    } else {
      console.log("Form submission failed due to validation errors.");
    }
  // console.log(product);
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

      // if(!data.file.name.trim())
      // {
      //   errors.file = "Please Upload Product Image."
      // }

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
                  Edit Product
                </h2>
              </div>
            </div>
          </div>
          <div className="card-body p-4">              
            <form onSubmit={handleSubmit}  className="row" encType="multipart/form-data">
              <div className="row">
                <div className="col-10">
                  <div className="border p-3">
                  
                    <div className="form-floating py-2 col-12">
                      <input
                        name="name"
                        className="form-control border-0 shadow"
                        placeholder="Enter Product Name"
                        value={product?.name}
                        onChange={(event)=>handleChange("name",event?.target.value)}
                      />
                      <label className="ms-2">Name</label>
                      {
                        errors.name && (
                          <span className="text-danger">{errors.name}</span>
                        )
                      }
                    </div>
  
                    <div className="form-floating py-2 col-12">
                      <textarea
                        name="description"
                        className="form-control border-0 shadow"
                        placeholder="Enter Product Description"
                        value={product?.description}
                        onChange={(event)=>handleChange("description",event?.target.value)}
                      ></textarea>
                      <label
                        className="ms-2"
                      >Description</label>
                      {
                        errors.description && (
                          <span className="text-danger">{errors.description}</span>
                        )
                      }
                    </div>
                    <div className="form-floating py-2 col-12">
                      <input
                        name="price"
                        className="form-control border-0 shadow"
                        placeholder="Enter Price"
                        value ={product?.price}
                        onChange={(event)=>handleChange("price",event?.target.value)}
                      />
                      <label className="ms-2" >Price</label>
                      {
                        errors.price && (
                          <span className="text-danger">{errors.price}</span>
                        )
                      }
                    </div>
                    <div className="form-floating py-2 col-12">
                      <input
                        name="stock"
                        className="form-control border-0 shadow"
                        placeholder="Enter Manufacture"
                        value={product?.stock}
                        onChange={(event)=>handleChange("stock",event?.target.value)}
                      />
                      <label
                        className="ms-2"
                      >Stock Quantity</label>
                      {
                        errors.stock && (
                          <span className="text-danger">{errors.stock}</span>
                        )
                      }
                    </div>
                    
                    <div className="form-floating py-2 col-12">
                      <input
                        type="file"
                        name="file"
                        className="form-control border-0 shadow"
                      />
                      <label className="ms-2">Upload File</label>
                      {/* {
                        errors.file && (
                          <span className="text-danger">{errors.file}</span>
                        )
                      } */}
                    </div>
                    <div className="form-floating py-2 col-12">
                    <select id = "ddlCategory"
                      className="form-select border-0 shadow"
                     onChange={handleCategoryChange}
                      name ="categoryId"
                      value={categoryId}
                      //value={category}
                    >
                      <option disabled>
                        --Select Category--
                      </option>
                      {catgories.map(c=>(
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                    <label
                      className="ms-2"
                    >Category</label>
                    {
                        errors.categoryId && (
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
                            Update
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
                <div className="col-2">
                  <img
                    src={`${imageFileServer}${product?.imgURL}`}
                    width="100%"
                   // style="border-radius:5px;border:1px solid #bbb9b9"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  };
  
  export default ProductEdit;
  