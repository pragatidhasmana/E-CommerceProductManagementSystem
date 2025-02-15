/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { Category } from "../Models/Category";

const api = axios.create({
    baseURL:"http://localhost:5035/api"
});

export const  getCategories = () =>{
    return api.get("/Category");
}


export const  deleteCategories = (id: any) => {
    return api.delete(`/Category/${id}`);
}

export const  getCategoriesById = (id:any) =>{
    return api.get(`/Category/${id}`);
}

export const  updateCategoryById = (id:any,categoryData : Category) =>{
    return api.put(`/Category/${id}`,categoryData);
}

export const  getProduct = () =>{
    return api.get("/Products");
}

export const  getProductById = (id:any) =>{
    return api.get(`/Products/${id}`);
}

export const  deleteProduct = (id: any) => {
    return api.delete(`/Products/${id}`);
}










    
