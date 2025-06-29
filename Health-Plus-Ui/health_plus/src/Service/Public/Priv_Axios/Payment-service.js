import { getCurrentUserDetail } from "../../../LocalStorage";
import { privateAxios } from "../Helper";


export const savePaymentDetailsOnServer = async (type,data)=>{
    const user = await getCurrentUserDetail()
    return privateAxios.post(`/payment/save/user/${user.id}/${type}`,data).then(response=>response.data)
}

export const saveDocBookingDataOnServer = async (data)=>{
    const user = await getCurrentUserDetail()
    return privateAxios.post(`/payment/saveDocData/${user.id}`,data).then(response=>response.data)
}

export const getAllOrderFromServer = async () => {
    const user = await getCurrentUserDetail()
    let userId=0;
    if(user != null){
        userId = user.id;
    }
    return await privateAxios.get(`/payment/getAllOrder/${userId}`).then(response=>response.data)
}

