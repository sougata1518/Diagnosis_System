import { privateAxios } from "../Public/Helper";

export const getAllConsultDataFromServerToAdmin = () => {
    return privateAxios.get(`/consult_us/getAllData`).then(response=>response.data)
}