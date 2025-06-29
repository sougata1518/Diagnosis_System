import { myAxios, privateAxios } from "../Helper";

export const getDoctorCatFromServer = async ()=>{
    return await myAxios.get(`/doc/cate/get/allCategories`).then(response=>response.data)
}

export const getDoctorCategoryByDocIdFromServer = (id)=>{
    return privateAxios.get(`/doc/cate/getDoc/${id}`).then(response=>response.data)
}