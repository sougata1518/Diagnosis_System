import { myAxios, privateAxios } from "../Helper";

export const getProductCatDataFromServer = async ()=>{
    return await myAxios.get(`/product/cat/get/allProductCate`).then(response=>response.data)
}

export const getProductDataFromServer = (id)=>{
    return privateAxios.get(`/product/getProductData/byId/${id}`).then(response=>response.data)
}