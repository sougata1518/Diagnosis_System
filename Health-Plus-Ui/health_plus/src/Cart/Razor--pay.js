import { savePaymentDetailsOnServer } from "../Service/Public/Priv_Axios/Payment-service"
import logo from '../Navbar/Img/logo.jpeg'
import { getCurrentUserDetail } from "../LocalStorage";


export const handleRazorPay = (pay, type, event,navigate) => {
    event.preventDefault();

    const user = getCurrentUserDetail();

    const data = {
        amount: pay
    }
    savePaymentDetailsOnServer(type, data).then((response) => {

        let option = {
            key: 'rzp_test_ayVY180uYv1UJf',
            amount: response.amount,
            currency: 'INR',
            name: 'Health Plus',
            description: 'Payment',
            image: { logo },
            order_id: response.id,

            handler: function (response) {
                console.log(response.rezorpay_payment_id)
                console.log(response.rezorpay_order_id)
                console.log(response.rezorpay_signature)
                console.log('payment successfull')
                navigate("/");
            },
            prefill:{
                name:user.name,
                email:user.email,
                contact:user.phone
            },
            notes:{
                address:"Health Plus"
            },
            theme:{
                color:"#1a504c"
            }
        };

        let rzp = new window.Razorpay(option);
        rzp.open();

    }).catch(error => {
        console.log(error);
    })
}