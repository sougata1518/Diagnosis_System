import { privateAxios } from "../Helper";

export const postConsultUsDataToServer = (data)=>{
    return privateAxios.post('/consult_us/save',data).then(response=>response.data)
}