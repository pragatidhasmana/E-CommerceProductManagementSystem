import { Link } from "react-router-dom";
import { getProduct } from "../../Data/APIs/API";
import { useEffect, useState } from "react";
import { Product } from "../../Data/Models/Product";

const ProductIndex = () => {

    
    const[product,setProduct]=useState<Product[]>([]);
    
      const getPostData= async ()=>{
        const res = await getProduct();
        console.log(res.data);
        setProduct(res.data);
      }
  
     
      useEffect(()=>{
        getPostData();
      },[])

  return (
    <>
      <div className="shadow border-0 mt-4 mb-5 mx-auto col-10">
        <div className="card-header bg-secondary bg-gradient ml-0 py-3">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="text-white py-2">Product List</h2>
            </div>
          </div>
        </div>
        <div className="card-body p-4">
          <div className="row pb-3">
            <div className="col-6"></div>
            <div className="col-6 text-end">
              <Link to="/product/create" className="btn btn-primary" >
                <i className="bi bi-plus-circle"></i> Create New Product
              </Link>
            </div>
          </div>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th scope="col">Product Name</th>
                <th scope="col">Price</th>
                <th scope="col">Stock Quantity</th>
                <th scope="col">Category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
                {
                    product.map((currElement)=>(
                        <tr key={currElement.productId}>
                            <td>{currElement.name}</td>
                            <td>{currElement.price}</td>
                            <td>{currElement.stock}</td>
                            <td>{currElement.categoryName}</td>
                            <td className="text-center">
                            <Link to={`/product/edit/${currElement.productId}` } className="btn btn-sm btn-info me-2"><i className="bi bi-pencil-square"></i> Edit</Link>
                            <Link to={`/product/delete/${currElement.productId}` } className="btn btn-sm btn-danger me-2" ><i className="bi bi-trash"></i> Delete</Link>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductIndex;
