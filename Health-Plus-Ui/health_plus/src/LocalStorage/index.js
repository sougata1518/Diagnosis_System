// doLogin 
export const doLogin = async (data,next) =>{
    await localStorage.setItem("data",JSON.stringify(data))
    next()
}

// doLogout
export const doLogout = (next) =>{
    localStorage.removeItem("data");
    next()
}

// isLoggedIn
export const isLoggedIn = () =>{
    let data = localStorage.getItem("data");
    if(data == null){
        return false;
    } 
    else{
        return true;
    }
}

// get currentUser
export const getCurrentUserDetail = () =>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data"))?.userClientResponse;
    }else{
        return undefined;
    }
}

// getToken
export const getToken = () =>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data")).jwtToken;
    }else{
        return null;
    }
}

