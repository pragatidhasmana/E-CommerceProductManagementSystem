/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { Category } from "../Models/Category";
import { GetToken } from "../GetToken";


const api = axios.create({
    baseURL:"http://localhost:5035/api"
});

const auth = () => {
    const token = GetToken()
    //console.log(token)

    const header = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    return header
}



export const  getCategories = () =>{
    //console.log(auth())
    return api.get("/Category",auth());
}


export const  deleteCategories = (id: any) => {
    return api.delete(`/Category/${id}`,auth());
}

export const  getCategoriesById = (id:any) =>{
    return api.get(`/Category/${id}`,auth());
}

export const  updateCategoryById = (id:any,categoryData : Category) =>{
    return api.put(`/Category/${id}`,categoryData,auth());
}

export const  getProduct = () =>{
    return api.get("/Products",auth());
}

export const  getProductById = (id:any) =>{
    return api.get(`/Products/${id}`,auth());
}

export const  deleteProduct = (id: any) => {
    return api.delete(`/Products/${id}`,auth());
}

export const loginUser = (payload:any) =>{
    return api.post(`/Auth/login`,payload);
}










    
