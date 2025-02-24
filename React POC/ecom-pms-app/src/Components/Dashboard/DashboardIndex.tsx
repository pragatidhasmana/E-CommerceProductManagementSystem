import { useEffect, useState } from "react";
import { Product } from "../../Data/Models/Product";
import { getProduct } from "../../Data/APIs/API";
import { imageFileServer } from "../../Data/Constant";
import { Link } from "react-router-dom";

const DashboardIndex = () => {
  const [product, setProduct] = useState<Product[]>([]);

  const getPostData = async () => {
    const res = await getProduct();
    console.log(res.data);
    setProduct(res.data);
  };

  useEffect(() => {
    getPostData();
  }, []);

  return (
    <>
      <div className="row row-cols-4 row-cols-md-4 mb-5 mx-auto col-10">
        {product.map((currElement) => ( 
          <div className="col mb-4" key={currElement.productId}>
            <div className="card h-100 border-0 p-3 shadow border-top border-5 rounded">
              <img
                src={`${imageFileServer}${currElement?.imgURL}`}
                className="card-img-top rounded"
              />
              <div className="card-body pb-0 mb-0">
                <div className="pl-1">
                  <p className="card-title h10 text-dark opacity-75 text-uppercase text-center">
                    {currElement.name}
                  </p>
                </div>
                <div className="pl-1">
                  <p className="text-dark opacity-100 text-center mb-0">
                    <span>
                      <strong className="h5">
                        &#8377;{currElement.price}
                      </strong>
                    </span>
                  </p>
                </div>
                <div className="pl-1">
                  <p className="card-title text-warning text-center">
                    <small>
                      Stocks Available :
                      <span className="text-dark opacity-100 text-center mb-0">
                        &nbsp; {currElement.stock}
                      </span>
                    </small>
                  </p>
                </div>
              </div>
              <Link to={`/details/${currElement.productId}`} className="btn btn-primary bg-gradient border-0 form-control">
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DashboardIndex;
