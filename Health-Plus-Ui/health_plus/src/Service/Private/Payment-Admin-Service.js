import { privateAxios } from "../Public/Helper";

export const getAllPaymentDataFromServerToAdmin = () =>{
    return privateAxios.get(`/payment/getAllPayment`).then(response=>response.data)
}