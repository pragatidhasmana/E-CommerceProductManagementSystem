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
    //console.log(formData);

    //formData.append("imgURL", `C:\\image\\${Object.fromEntries(formData.entries()).imageURL.name}`);
    //formData.delete('imageURL')
    //console.log(Object.fromEntries(formData.entries()).imageURL.name)
    //const product = Object.fromEntries(formData.entries())

    //formData.delete('imageURL')

    //

    //console.log(product.imgURL.name)
    /* Validate Form Fields 
    if()
      */

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

        //console.log(product);
        //product Created correctly
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

    // console.log(product);
  };


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
                    </div>
                    
                    <div className="form-floating py-2 col-12">
                      <input
                        type="file"
                        name="file"
                        className="form-control border-0 shadow"
                      />
                      <label className="ms-2">Upload File</label>
                    </div>
                    <div className="form-floating py-2 col-12">
                    <select
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
  