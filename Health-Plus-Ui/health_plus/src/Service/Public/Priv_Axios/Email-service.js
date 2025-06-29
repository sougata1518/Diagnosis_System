import { myAxios, privateAxios } from "../Helper"

export const sendDoctorBookingMail = (email)=>{
    return privateAxios.post(`/sendBookingEmail`,email).then(response=>response.data)
}

export const sentOtpToMailThroughServer = (email)=>{
    return myAxios.post(`/sendOtp`,email).then(response=>response.data);
}