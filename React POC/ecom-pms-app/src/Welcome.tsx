import {  useNavigate } from "react-router-dom";
import { IsAuthorize } from "./Data/Authorize";
import { GetLoggedInUserName, GetLoggedInUserRole } from "./Data/GetToken";

const Welcome = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const navigate = useNavigate();
    
    return(
    <>
    {IsAuthorize() && 
    (<div className="pb-2 text-primary-emphasis" >
        Welcome {GetLoggedInUserName()}&nbsp;<span className="badge rounded-pill bg-dark">{GetLoggedInUserRole()}</span></div>)}
    </>
    )
};
export default Welcome;