import { Link, useParams } from "react-router-dom";
import { getProductById } from "../../Data/APIs/API";
import { useEffect, useState } from "react";
import { Product } from "../../Data/Models/Product";
import { imageFileServer } from "../../Data/Constant";

const DashboardDetail = () => {

    const {id} = useParams()

    const[product ,setProduct] = useState<Product>();

    const[count,setCount] = useState(1);

    const[discount,setDiscount] = useState(1);

    const handleCountChange = (e) => {
        e.preventDefault()
        setCount(e.target.value)
    }

    const getProductFromDB = async () =>{
        const res = await getProductById(id)
        setProduct(res.data);
        console.log(res.data);     
    }
    //console.log(product);
    

    useEffect (() =>{
        getProductFromDB()
        randomNumber()
    },[])

    const randomNumber = () => {
    setDiscount(Math.floor(Math.random() * (30)) + 1);}

    const getDiscountedPrice = 
    product?.price - ((product?.price * discount) / 100);   

  return (
    <>
      <div className="card shadow border-0 mt-4 mb-5 mx-auto col-10" >
        <div className="card-header bg-secondary bg-gradient text-light py-4">
          <div className="row">
            <div className="col-12 text-center">
              <h3 className="text-white text-uppercase">{product?.name}</h3>
              {/* <p className="text-white-50 fw-semibold mb-0">
                by {}
              </p> */}
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="py-3">
            <div className="row">
              <div className="col-6 col-md-2 offset-lg-1 pb-1">
                <Link
                  to='/'
                  className="btn btn-outline-primary bg-gradient mb-5 fw-semibold btn-sm text-uppercase"
                >
                 <small>Back to home</small>
                </Link>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-lg-3 offset-lg-1 text-center mb-3">
                <img
                  src={`${imageFileServer}${product?.imgURL}`}
                  width="100%"
                  className="rounded"
                />
              </div>
              <div className="col-12 col-lg-6 offset-lg-1">
                <div className="col-12 col-md-6 pb-4">
                  <span className="badge">{product?.categoryName}</span>
                </div>
                <div className="row ps-2">
                  <h6 className="text-dark text-opacity-80 ">
                    {product?.description}
                  </h6>
                </div>
                <div className="col-12 col-md-6 pb-4">
                  <span className="badge text-bg-danger">
                    Limited time deal
                  </span>
                </div>
                <div className="row ps-2">
                  <h4 className="text-dark text-opacity-85  pb-2">
                    <span className="text-danger h5">
                      -{discount}%
                    </span>
                    <span>&#8377;{Math.round(getDiscountedPrice)}</span>
                  </h4>
                </div>
                <div className="row ps-2">
                  <h6 className="text-dark text-opacity-50  pb-2">
                    <span className="text-decoration-line-through">
                      <small>
                        M.R.P {product?.price}
                      </small>
                    </span>
                  </h6>
                </div>
{/*                 
                <div className="row text-center ps-2">
                  <div className="p-1 col-3 col-lg-2 bg-white border-bottom">
                    <div className="text-dark text-opacity-50 fw-semibold">
                      Quantity
                    </div>
                  </div>
                  <div className="p-1 col-3 col-lg-2 bg-white border-bottom">
                    <div className="text-dark text-opacity-50 fw-semibold">
                      1-50
                    </div>
                  </div>
                  <div className="p-1 col-3 col-lg-2 bg-white border-bottom">
                    <div className="text-dark text-opacity-50 fw-semibold">
                      51-100
                    </div>
                  </div>
                  <div className="p-1 col-3 col-lg-2 bg-white border-bottom">
                    <div className="text-dark text-opacity-50 fw-semibold">
                      100+
                    </div>
                  </div>
                </div>
                <div className="row text-center ps-2">
                  <div className="p-1 col-3 col-lg-2 bg-white text-warning fw-bold">
                    <div>Price</div>
                  </div>
                  <div className="p-1 col-3 col-lg-2 bg-white text-warning fw-bold">
                    <div>Price</div>
                  </div>
                  <div className="p-1 col-3 col-lg-2 bg-white text-warning fw-bold">
                    <div>Price50</div>
                  </div>
                  <div className="p-1 col-3 col-lg-2 bg-white text-warning fw-bold">
                    <div>Price100</div>
                  </div>
                </div>{" "}
                
                <div className="row pl-2 my-3">
                  <p className="text-secondary lh-sm">Description</p>
                 */}
                <div className="row pl-2 mb-3">
                  <div className="col-md-4">
                    <div className="input-group mb-3">
                      <span
                        className="input-group-text bg-primary text-white border-0 fw-semibold"
                        id="inputGroup-sizing-default"
                      >
                        Count
                      </span>
                      <input
                        type="number"
                        value={count}
                        onChange={handleCountChange}
                        className="form-control text-end"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                        min = "1"
                        max = {product?.stock}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6 pb-1">
                    <button
                      type="submit" disabled
                      className="btn btn-primary bg-gradient  w-100 py-2 text-uppercase fw-semibold"
                    >
                      Add to Cart (Coming Soon!)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default DashboardDetail;
