import { myAxios, privateAxios } from '../Helper'

export const signupUserDataOnServer = (data) => {
    return myAxios.post(`/user/save`,data).then(response=>response.data);
}

export const loginUserDataFromServer = (data) => {
    return myAxios.post(`/auth/login`,data).then(response=>response.data);
}

export const updateUserDataToServer = async (data,id,token) => {
    return await privateAxios.put(`/user/update/userData/${id}/${token}`,data).then(response=>response.data);
}

export const checkUserEmailFromServer = async (data) => {
    console.log(data);
    return await myAxios.get(`/user/getByEmail/${data}`).then(response=>response.data);
}

export const UpdatePassword = (data) => {
    console.log(data.email);
    return myAxios.post(`/user/updatePass`,data).then(response=>response.data);
}