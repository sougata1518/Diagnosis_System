import {privateAxios} from '../Public/Helper'

export const deleteLabTestDataFromAdmin = async (testId) => {
    return await privateAxios.delete(`/labTest/delete/${testId}`).then(response=>response.data)
}

export const addLabTestDataFromAdmin = async (data,labCatId) => {
    return await privateAxios.post(`/labTest/save/${labCatId}`,data).then(response=>response.data);
}

export const addLabTestImageFromAdmin = async (image,labId,labCatId) => {
    let formData = new FormData();
    formData.append("image",image);
    return await privateAxios.post(`/labTest/save/image/upload/${labId}/${labCatId}`,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }).then(response=>response.data);
}

export const updateLabTestDataFromAdmin = async (labId,data) => {
    return await privateAxios.put(`/labTest/update/${labId}`,data).then(response=>response.data);
}