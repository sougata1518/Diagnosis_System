import { myAxios, privateAxios } from "../Helper";

export const getLabTestCatDataFromServer = async ()=>{
    return await myAxios.get(`/lab/cat/getAll`).then(response=>response.data)
}

export const getLabTestDataByIdFromServer = async (id)=>{   
    return await privateAxios.get(`/labTest/getTestData/${id}`).then(response=>response.data)
}

export const addLabTestCateFromAdmin = async (data) => {
    return await privateAxios.post(`/lab/cat/createLabCate`,data).then(response=>response.data)
}

export const addImageOnLabCategoryFromAdmin = async (image,lab_cat_id) => {
    let formData = new FormData();
    formData.append("image",image);
    return await privateAxios.post(`/lab/cat/save/image/upload/${lab_cat_id}`,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }).then(response=>response.data)
}