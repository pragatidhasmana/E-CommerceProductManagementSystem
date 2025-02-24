import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteCategories, getCategoriesById } from "../../Data/APIs/API";
import { toast } from "react-toastify";

const Delete = () => {

    const navigate = useNavigate();

    const [ctgory, setCategory] = useState({ name: "", id: 0 });

    const { id } = useParams();

     const notify = () => {
                // Calling toast method by passing string
                toast.success("Category Deleted Successfully!"); 
        };

    const getData = async () => {
      const res = await getCategoriesById(id);
      setCategory({
        id: res.data.id,
        name: res.data.name,
      });
    };

    useEffect(() => {
      getData();
    }, []);

    const DeleteCategory = async (e:React.FormEvent) =>{
        e.preventDefault()
        const res = await deleteCategories(id)
        console.log(res);
        notify();
        navigate("/category/index", { replace: true })     
    }
    

  return (
    <>
      <div className="shadow border-0 mt-4 mx-auto col-8">
        <div className="card-header bg-secondary bg-gradient ml-0 py-3">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="text-white py-2">Delete Category</h2>
            </div>
          </div>
        </div>
        <div className="card-body p-4">
          <form >
            <div className="border p-3">

            <div className="form-floating py-2 col-12">
                <input type="number" name="id"
                  className="form-control border-0 shadow"
                  placeholder="Enter Display Order"
                  value={ctgory.id}
                  disabled
                />
                <label className="ms-2" ></label>
              </div>

              <div className="form-floating py-2 col-12">
                <input type="text" name="name"
                  className="form-control border-0 shadow"
                  placeholder="Enter Category Name"
                  value={ctgory.name}
                  disabled
                />
                <label className="ms-2"></label>
              </div>
              
              <div className="row pt-2">
                <div className="col-6 col-md-3">
                  <button className="btn btn-danger form-control" onClick={DeleteCategory}>
                  Confirm Delete
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

export default Delete;
