import { privateAxios } from "../Public/Helper";

export const getAllUserDataFromServerToAdmin = () => {
    return privateAxios.get(`/user/getAllUsers`).then(response=>response.data);
}