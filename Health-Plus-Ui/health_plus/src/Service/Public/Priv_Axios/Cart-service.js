import { getCurrentUserDetail } from "../../../LocalStorage";
import { privateAxios } from "../Helper";


export const saveCartDataByHandlingSave = async (cartData)=>{
    const user = await getCurrentUserDetail()
    console.log(user.id);
    return privateAxios.post(`/cart/save/user/${user.id}`,cartData).then(response=>response.data);   // user id is needed
}

export const getCartDataFromTheServer = async ()=>{
    const user = await getCurrentUserDetail()
    let userId=0;
    if(user != null){
        userId = user.id;
    }
    return privateAxios.get(`/cart/getAllCart/user/${userId}`).then(response=>response.data)
}

export const updateCartDataToServer = (qty,id)=>{
    return privateAxios.put(`/cart/updateCartData/${id}/${qty}`).then(response=>response.data)
}

export const deleteCartData = (id)=>{
    return privateAxios.delete(`/cart/delete/cart/${id}`).then(response=>response.data)
}