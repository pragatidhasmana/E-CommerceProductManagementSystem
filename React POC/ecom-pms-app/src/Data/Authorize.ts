import { GetToken } from "./GetToken";

export const IsAuthorize = () =>{
    // useEffect(()=>{
    //    CheckIsAuth()
    // },[])

    // const CheckIsAuth = () =>{
        const token = GetToken();
        if(token != null)
        {
            return true;
        }
        return false;
    //}    
}