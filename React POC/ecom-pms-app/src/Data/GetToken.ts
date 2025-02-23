
export const GetToken = () => {
    return JSON.parse(localStorage.getItem("jwtToken"));
}

export const GetLoggedInUserName = () => {
    return JSON.parse(localStorage.getItem("LoggedInUserName"));
}

export const GetLoggedInUserRole = () => {
    return JSON.parse(localStorage.getItem("LoggedInUserRole"));
}

// export const DecodeToken = () =>{
//     const arrayToken = GetToken().split('.');
//     console.log(jwtDecode(GetToken()));
//     console.log(jwtDecode(GetToken()).iss);
//     //console.log(JSON.parse(atob(arrayToken[1])));
    



