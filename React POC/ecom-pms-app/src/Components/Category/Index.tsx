import { Link } from "react-router-dom";
import { Category } from "../../Data/Models/Category";
import { useEffect, useState } from "react";
import {getCategories} from "../../Data/APIs/API";


const Index = () => {

  const[ctgory,setCategory]=useState<Category[]>([]);

  const getPostData= async ()=>{
    const res = await getCategories();
    setCategory(res.data);
  }

  useEffect(()=>{
    getPostData();
  },[])

  return (
    <>
      <div className="shadow border-0 mt-4 mb-4 col-8 mx-auto">
        <div className="card-header bg-secondary bg-gradient ml-0 py-3">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="text-white py-2">Category List</h2>
            </div>
          </div>
        </div>
        <div className="card-body p-4">
          <div className="row pb-3">
            <div className="col-6"></div>
            <div className="col-6 text-end">
              <Link className="btn btn-primary" to='/category/create' >
                {" "}
                <i className="bi bi-plus-circle"></i> Create New Category
              </Link>
            </div>
          </div>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th scope="col">Category Id</th>
                <th scope="col">Category Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                ctgory.map((Categories)=>(
                  <tr key={Categories.id}>
                    <td>{Categories.id}</td>
                    <td>{Categories.name}</td>
                    <td className="text-center">
                      <Link to={`/category/edit/${Categories.id}` } className="btn btn-sm btn-info me-2"><i className="bi bi-pencil-square"></i> Edit</Link>
                      <Link to={`/category/delete/${Categories.id}` } className="btn btn-sm btn-danger me-2" ><i className="bi bi-trash"></i> Delete</Link>
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

export default Index;
