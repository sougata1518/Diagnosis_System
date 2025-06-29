import React, { useState } from 'react';
import * as Components from './Components';
import './Style.css';
import { checkUserEmailFromServer, loginUserDataFromServer, signupUserDataOnServer } from '../Service/Public/Pub_Axios/User-service';
import { NavLink, useNavigate } from 'react-router-dom';
import { doLogin } from '../LocalStorage';
import Header from '../Navbar/Header';
import { toast } from 'react-toastify'
import { sentOtpToMailThroughServer } from '../Service/Public/Priv_Axios/Email-service';

const Useraccount = () => {
    const navigate = useNavigate();
    const [signIn, toggle] = useState(true);
    const [password, setPassword] = useState({ confirmPassword: '' });
    const [login, setLogin] = useState({ email: '', password: '' });
    const [signup, setSignup] = useState({ name: '', email: '', phone: '', password: '', role: 'USER' });
    const [errors, setErrors] = useState({ phone: '', password: '', login: '' });

    const handleLoginChange = (event, fieldName) => {
        setLogin({ ...login, [fieldName]: event.target.value });
    };

    const handleSignupChange = (event, fieldName) => {
        setSignup({ ...signup, [fieldName]: event.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        loginUserDataFromServer(login).then(response => {
            if (response === "Credentials Invalid !!") {
                setErrors({ ...errors, login: "Invalid credentials" });
            } else {
                doLogin(response, () => {
                    toast.success("Login Successful !!", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined
                    })
                    navigate("/");
                });
            }
        }).catch(error => {
            console.log(error);
            setErrors({ ...errors, login: "An error occurred. Please try again." });
        });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        let hasError = false;
        const newErrors = { phone: '', password: '' };

        if (signup.phone.length !== 10) {
            hasError = true;
            newErrors.phone = "Enter a valid phone number";
        }

        if (signup.password !== password.confirmPassword) {
            hasError = true;
            newErrors.password = "Password and confirm password do not match";
        }

        setErrors(newErrors);

        if (!hasError) {
            signupUserDataOnServer(signup).then(response => {
                toast.success("New User Sign Successfully !!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                })
                navigate("/");
            }).catch(error => console.log(error));
        }
    };

    const handleSendemail = (event) => {
        event.preventDefault();

        checkUserEmailFromServer(login.email).then(response => {
            sentOtpToMailThroughServer({
                email: login.email
            }).then(response => {
                localStorage.setItem("otp", response)
                navigate("/otp", { state: login });
            }).catch(error => console.log(error))
        }).catch(error => {
            console.log(error);
            toast.error("Invalid Email !", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            })
        })



    }
    return (
        <Header>
            <div className='account-card'>
                <Components.Container>
                    <Components.SignUpContainer signinIn={signIn}>
                        <Components.Form onSubmit={handleSignup}>
                            <Components.Title>Create Account</Components.Title>
                            <Components.Input type='text' placeholder='Enter your name' onChange={(e) => handleSignupChange(e, 'name')} />
                            <Components.Input type='email' placeholder='Enter your e-mail' onChange={(e) => handleSignupChange(e, 'email')} />
                            <Components.Input type='number' placeholder='Enter your phone number' onChange={(e) => handleSignupChange(e, 'phone')} />
                            {errors.phone && <p className='error'>{errors.phone}</p>}
                            <Components.Input type='password' placeholder='Set A Password' onChange={(e) => handleSignupChange(e, 'password')} />
                            <Components.Input type='password' placeholder='Confirm Password' onChange={(e) => setPassword({ ...password, confirmPassword: e.target.value })} />
                            {errors.password && <p className='error'>{errors.password}</p>}
                            <Components.Button type='submit'>Sign Up</Components.Button>
                        </Components.Form>
                    </Components.SignUpContainer>

                    <Components.SignInContainer signinIn={signIn}>
                        <Components.Form onSubmit={handleLogin}>
                            <Components.Title>Sign in</Components.Title>
                            <Components.Input type='email' placeholder='Enter Email' onChange={(e) => handleLoginChange(e, 'email')} />
                            <Components.Input type='password' placeholder='Enter Password' onChange={(e) => handleLoginChange(e, 'password')} />
                            {errors.login && <p className='error'>{errors.login}</p>}
                            <NavLink className="otp" onClick={(e) => handleSendemail(e)}>Forgot your password?</NavLink>
                            <Components.Button type='submit'>Sign In</Components.Button>
                        </Components.Form>
                    </Components.SignInContainer>

                    <Components.OverlayContainer signinIn={signIn}>
                        <Components.Overlay signinIn={signIn}>
                            <Components.LeftOverlayPanel signinIn={signIn}>
                                <Components.Title>Welcome Back!</Components.Title>
                                <Components.Paragraph>
                                    To keep connected with us please login with your personal info
                                </Components.Paragraph>
                                <Components.GhostButton onClick={() => toggle(true)}>
                                    Sign In
                                </Components.GhostButton>
                            </Components.LeftOverlayPanel>

                            <Components.RightOverlayPanel signinIn={signIn}>
                                <Components.Title>Hello, Friend!</Components.Title>
                                <Components.Paragraph>
                                    Enter Your personal details and start journey with us
                                </Components.Paragraph>
                                <Components.GhostButton onClick={() => toggle(false)}>
                                    Sign Up
                                </Components.GhostButton>
                            </Components.RightOverlayPanel>
                        </Components.Overlay>
                    </Components.OverlayContainer>
                </Components.Container>
            </div>
        </Header>
    );
};

export default Useraccount;
