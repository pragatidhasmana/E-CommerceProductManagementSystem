
export const GetToken = () => {
    return JSON.parse(localStorage.getItem("jwtToken"));
}

export const GetLoggedInUserName = () => {
    return JSON.parse(localStorage.getItem("LoggedInUserName"));
}

export const GetLoggedInUserRole = () => {
    return JSON.parse(localStorage.getItem("LoggedInUserRole"));
}




