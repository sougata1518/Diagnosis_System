import { privateAxios } from "../Public/Helper"


export const deleteProductDataFromAdmin = (prodId) => {
    return privateAxios.delete(`/product/delete/${prodId}`).then(response=>response.data);
}

export const addProductCateDataFromAdmin = async (data) => {
    return await privateAxios.post(`/product/cat/save`,data).then(response=>response.data);
}

export const addProductDataFromAdmin = async (data,prodCatId) => {
    return await privateAxios.post(`/product/save/ProductCate/${prodCatId}`,data).then(response=>response.data);
}

export const addProductImageDataFromAdmin = async (image,prodId,prodCatId) => {
    let formData = new FormData();
    formData.append("image",image);
    return await privateAxios.post(`/product/save/image/upload/${prodId}/${prodCatId}`,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }).then(response=>response.data)
}

export const updateProductDataFromAdmin = async (prodId,data) => {
    return await privateAxios.put(`/product/update/${prodId}`,data).then(response=>response.data)
}