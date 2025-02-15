import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteProduct, getProductById } from "../../Data/APIs/API";
import { useEffect, useState } from "react";
import { Product } from "../../Data/Models/Product";
import { toast } from "react-toastify";

const ProductDelete = () => {

  const {id} = useParams();
  const [product,setProduct] = useState<Product>();

  const navigate = useNavigate();

  const getProductFromDB = async () =>{
    const res = await getProductById(id)
    setProduct(res.data);
  }
  //console.log(product)

  useEffect(()=>{
    getProductFromDB();
  },[])

  const notify = () => {
      // Calling toast method by passing string
      toast.success("Product Deleted Successfully!");
    };

  const handleSubmit = async (event) =>{
    event.preventDefault()
    const res = await deleteProduct(id)

    if (res.status === 204) {
      console.log("Deleted");
      notify();
      navigate("/product/index", { replace: true });
  }

}


  return (
    <>
      <div className="shadow border-0 my-4 mb-5 mx-auto col-10">
        <div className="card-header bg-secondary bg-gradient ml-0 py-3">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="text-white py-2">Delete Product</h2>
            </div>
          </div>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="border p-3">
              <div className="form-floating py-2 col-12">
                <input
                  name="name"
                  className="form-control border-0 shadow"
                  placeholder="Enter Product Name"
                  value={product?.name}
                  disabled
                />
                <label  className="ms-2">Name</label>
             </div>
              <div className="form-floating py-2 col-12">
                <textarea
                  name="description"
                  className="form-control border-0 shadow"
                  placeholder="Enter Description"
                  value={product?.description}
                  disabled
                ></textarea>
                <label className="ms-2">Description</label>
              </div>
              <div className="form-floating py-2 col-12">
                <input
                  name="price"
                  className="form-control border-0 shadow"
                  placeholder="Enter Price"
                  value={product?.price}
                  disabled
                />
                <label className="ms-2">Price</label>
              </div>
              <div className="form-floating py-2 col-12">
                <input
                  name="stock"
                  className="form-control border-0 shadow"
                   placeholder="Enter Stocks"
                   value={product?.stock}
                  disabled
                />
                <label className="ms-2">Stock Quantity</label>
              </div>

              <div className="row pt-2">
                <div className="col-6 col-md-3">
                  <button
                    className="btn btn-primary form-control"
                    type="submit"
                  >
                    Delete
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
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductDelete;
