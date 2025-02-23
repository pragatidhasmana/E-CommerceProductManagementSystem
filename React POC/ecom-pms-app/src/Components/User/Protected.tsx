import { useEffect } from "react";
import { GetLoggedInUserRole, GetToken } from "../../Data/GetToken";
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
    const{Component} = props;
    const{allowedRoutes} = props;
    const userRole = GetLoggedInUserRole();
    const navigate = useNavigate()
    console.log(allowedRoutes);
    
    useEffect(()=>{
        const IsLoggedIn= GetToken();
        if(!IsLoggedIn)
        {
            navigate("/login", { replace: true })  
        }
        else if(!allowedRoutes.includes(userRole!))
        {
            navigate("/unauthorized", { replace: true }) 
        }
    },[])
    return(
        <>
            <Component></Component>
        </>
        )
}


export default Protected;