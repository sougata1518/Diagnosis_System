import { privateAxios } from "../Public/Helper"


export const deleteDoctorDataFromAdmin = async (docId) => {
    return await privateAxios.delete(`/doctors/deleteDoc/${docId}`).then(response=>response.data);
}

export const addDoctorCategoryFromAdmin = async (data) => {
    return await privateAxios.post(`/doc/cate/save`,data).then(response=>response.data)
}

export const addImageOnDocCategoryFromAdmin = async (image,doc_cat_id) => {
    let formData = new FormData();
    formData.append("image",image);
    return await privateAxios.post(`/doc/cate/save/image/upload/${doc_cat_id}`,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }).then(response=>response.data)
}

export const addDoctorFromAdmin = async (data,docCatId) => {
    return await privateAxios.post(`/doctors/save/doc/cat/${docCatId}`,data).then(response=>response.data);
}

export const updateDoctorDataFromAdmin = async (docId,data) => {
    return await privateAxios.put(`/doctors/update/${docId}`,data).then(response=>response.data);
}