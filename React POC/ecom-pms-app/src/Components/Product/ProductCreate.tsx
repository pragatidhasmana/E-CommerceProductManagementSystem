import { Link, useNavigate } from "react-router-dom";
import { Category } from "../../Data/Models/Category";
import { useEffect, useState } from "react";
import { getCategories } from "../../Data/APIs/API";
import { toast } from "react-toastify";

const ProductCreate = () => {

  const POST_API = 'http://localhost:5035/api/Products'
  
  const navigate = useNavigate();

  const[ctgory,setCategory]=useState<Category[]>([]);
  
  //const[selectedCategory , setSelectedCategory]=useState([{'name':"",'id':""}]);
 
    const getPostData= async ()=>{
      const res = await getCategories();
      setCategory(res.data);
      //console.log(res.data[0]);
      //setSelectedCategory(res.data[0]);
    }
  
    useEffect(()=>{
      getPostData();
    },[])

    // const handleCategoryChange = (event) =>{
    //   const selectedCategoryId = event.target.value;
    //   const selected = ctgory.find(c=>c.id===parseInt(selectedCategoryId));
    //   //setSelectedCategory(selected);
    //   }

      const handleSubmit = async (event) => {
        event.preventDefault();
        const formData=new FormData(event.target)
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
          const res = await fetch(POST_API,{
              method:"POST",
              body:formData//JSON.stringify(product)  ,   
            //   headers: {
            //     'Content-Type': 'application/json',
            // }   
            })

             console.log(res)
            //const data=await res.json() 

            if(res.ok){
              //console.log(product);
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
      
       // console.log(product);
      }

    const notify = () => {
            // Calling toast method by passing string
            toast.success("Product Added Successfully!"); 
        };

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
                      // onChange={(event)=>handleChangeuUserField("name",event.target.value)}
                      // value={product.name}
                    />
                    <label className="ms-2">Name</label>
                  </div>

                  <div className="form-floating py-2 col-12">
                    <textarea
                      name="description"
                      className="form-control border-0 shadow"
                      placeholder="Enter Product Description"
                      // onChange={(event)=>handleChangeuUserField("description",event.target.value)}
                      // value={product.description}
                    ></textarea>
                    <label
                      className="ms-2"
                    >Description</label>
                  </div>
                  <div className="form-floating py-2 col-12">
                    <input
                      type="number"
                      name="price"
                      className="form-control border-0 shadow"
                      placeholder="Enter Price"
                      // onChange={(event)=>handleChangeuUserField("price",event.target.value)}
                      // value={product.price}
                    />
                    <label className="ms-2" >Price</label>
                  </div>
                  <div className="form-floating py-2 col-12">
                    <input
                      type="number"
                      name="stock"
                      className="form-control border-0 shadow"
                      placeholder="Enter Stocks"
                      // onChange={(event)=>handleChangeuUserField("stock",event.target.value)}
                      // value={product.stock}
                    />
                    <label
                      className="ms-2"
                    >Stock Quantity</label>
                  </div>
                  
                  <div className="form-floating py-2 col-12">
                    <input id="file"
                      type="file"
                      name="file"
                      className="form-control border-0 shadow"
                      // onChange={handleimageChange}
                      // value={product.imgURL}
                    />
                     <label className="ms-2">Upload File</label>
                  </div>
                  <div className="form-floating py-2 col-12">
                    <select
                      className="form-select border-0 shadow"
                     // onChange={handleCategoryChange}
                      name ="categoryId"
                      defaultValue={"0"}
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
                  </div>
                  <div className="row pt-2">
                    <div className="col-6 col-md-3">

                        <button
                          className="btn btn-primary form-control"
                          //onClick={AddProduct}
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
              {/* <div className="col-2">
                <img
                  src="@Model.Product.ImageUrl"
                  width="100%"
                 // style="border-radius:5px;border:1px solid #bbb9b9"
                />
              </div> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductCreate;
