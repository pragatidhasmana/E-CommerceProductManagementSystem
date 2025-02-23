import { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { IsAuthorize } from "./Data/Authorize";
import { GetLoggedInUserName, GetLoggedInUserRole } from "./Data/GetToken";

const Welcome = () => {

    const navigate = useNavigate();
     //const isAuthenticated = IsAuthorize();    

    //  useEffect(()=>{
    //     console.log(isAuthenticated);
    //  },[isAuthenticated])

    //console.log(IsAuthorize());
    
    return(
    <>
    {IsAuthorize() && 
    (<div className="pb-2 text-primary-emphasis" >
        Welcome {GetLoggedInUserName()}&nbsp;<span className="badge rounded-pill bg-dark">{GetLoggedInUserRole()}</span></div>)}
    </>
    )
};
export default Welcome;