import axios from "axios";
import { useState,useContext } from "react"
import { useNavigate } from "react-router-dom";
import {UserContext} from "../../UserContext"

import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode'
import './LoginRegisterCss.css'

export default function LoginRegisterModal(){
    
    const[loginFormOpen,setLoginFormOpen] = useState(true);
    
    const[name,setName] = useState('');
    const[username,setUsername] = useState('');
    const[email,setEmail] = useState('');
    const[phoneNumber,setPhoneNumber] = useState(0);
    const[password,setPassword] = useState('');
    const[photo,setPhoto] = useState('');

    const {user,setUser} = useContext(UserContext);

    const[showAlertWindow,setShowAlertWindow] = useState(false);
    const[alertWindowMessage,setAlertwindowMessage] = useState('');
    const[loading,setLoading] = useState(false);
    
    const navigate = useNavigate()

    function uploadPhoto(e){

        setLoading(true);
        const files = e.target.files;
        console.log(files);

        const data = new FormData();
        for(let i = 0 ; i < files.length ; i++){
            data.append('file',files[i]);
        }

        console.log(data);
        axios.post('/uploads', data, {
            headers: {'Content-Type':'multipart/form-data'}
        }).then((response) => {
            console.log(response.data);
            setPhoto(response.data.photos[0]);
            setLoading(false);
        }).catch((err) => {
            handleAlertWindow(err.data.err.message)
            console.log(err.data.err.message)
            setLoading(false);
        })

       
    }

    const callLoginApi = (e) => {
        e.preventDefault();      
        
        const loginInfo = {
            username,
            password
        }
        
        axios.post('/user/login',loginInfo).then((response) => {
            console.log(response.data);
            setUser(response.data);
            navigate("/");
        }).catch((err) => {
            handleAlertWindow(`${err.message}, try logging in with your username`)
            console.log(err);
        })  
    } 

    function registerUser(e){
        e.preventDefault();

        const userData = {
            name,
            username,
            email, 
            password,
            "contactNumber":phoneNumber,
            photo_url:photo,
            oAuth:false
        }

        console.log(userData);
        axios.post('/user/register',userData).then((response) => {
            console.log(response.data);
            callLoginApi(e);
        }).catch((err) => {
            console.log(err);
        })
    }

    function handleGoogleLogin(credentialResponse){
        const userData = jwtDecode(credentialResponse.credential);
        
        const data = {
            "name":userData.name,
            "username":userData.email.substring(0,userData.email.length - 10),
            "email":userData.email, 
            photo_url:userData.picture,
            oAuth:true
        }
        
        axios.post('user/register',data).then((response) => {
            console.log(response.data);
            
            const loginInfo = {
                "username":userData.email.substring(0,userData.email.length - 10),
            }

            axios.post('/user/login',loginInfo).then((response) => {
                console.log(response.data);
                setUser(response.data);
                navigate("/");

            }).catch((err) => {
                console.log(err);
            })  

        }).catch((err) => {
            console.log(err.response.data.message);

            if(err.response.data.message === "User with username Already exists" || 
            err.response.data.message === "User with Email Already exists"){
                console.log(true);

                const loginInfo = {
                    "username":userData.email.substring(0,userData.email.length - 10),
                }

                axios.post('/user/login',loginInfo).then((response) => {
                    console.log(response.data);
                    setUser(response.data);
                    navigate("/");
    
                }).catch((err) => {
                    console.log(err);
                })
            }
        })


    }

    function handleAlertWindow(msg){
        setShowAlertWindow(true);
        setAlertwindowMessage(msg)
    }

    return (
        <div className="login_register_form_container">

           
            <div style={{display:"flex",justifyContent:"center"}}>
                <div className="login_register_form_container_register_login_btns">
                    <div className={loginFormOpen === true ? "login_btn btn_pressed" : "login_btn"} onClick={() => {setLoginFormOpen(true)}}>Login</div>
                    <div className={loginFormOpen === false ? "register_btn btn_pressed" : "register_btn"} onClick={() => {setLoginFormOpen(false)}}>Register</div>
                 </div>
            </div>

            <div className="login_register_modal">

                <div className="googleAuthLoginBtn">
                        <GoogleLogin
                                onSuccess={credentialResponse => {handleGoogleLogin(credentialResponse)}}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                        />
                </div>

                {showAlertWindow && showAlertWindow === true && (
                <div className="alert_window_container">
                    <div className="alert_window_message">{`${alertWindowMessage}`}</div>
                    <div className="alert_window_close" onClick={() => {setShowAlertWindow(false)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="alert_window_icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    </div>
                </div>
            )}

                
                {loginFormOpen === true && (
                    <div style={{display:"flex",justifyContent:"center"}}>
                    <form className="login_form" onSubmit={callLoginApi}>

                        <div className="form_field_container">
                            <label className="form_label">Username</label>
                            <input className="form_input" type="text" onChange={(e) => {setUsername(e.target.value)}}></input>
                        </div>

                        <div className="form_field_container">
                            <label className="form_label">Password</label>
                            <input className="form_input" type="password" onChange={(e) => {setPassword(e.target.value)}}></input>
                        </div>                

                        <div style={{textAlign:"center"}}>
                            
                                <button className="login_form_submit_btn">Login</button>
                           
                        </div>

                    </form>
                    </div>
                )} 

                 {loginFormOpen === false && (
                    <div style={{display:"flex",justifyContent:"center"}}>
                    <form className="register_form" onSubmit={registerUser}>

                        <div className="form_field_container">
                            <label className="form_label">Name</label>
                            <input required className="form_input" type="text" onChange={(e) => {setName(e.target.value)}}></input>
                        </div>

                        <div className="form_field_container">
                            <label className="form_label">Username</label>
                            <input required className="form_input" type="text" onChange={(e) => {setUsername(e.target.value)}}></input>
                        </div>

                        <div className="form_field_container">
                            <label className="form_label">Email</label>
                            <input required className="form_input" type="email" onChange={(e) => {setEmail(e.target.value)}}></input>

                        </div>                

                        <div className="form_field_container">
                            <label className="form_label">Phone No.</label>
                            <input className="form_input" type="Number" onChange={(e) => {setPhoneNumber(e.target.value)}}></input>

                        </div>                

                        <div className="form_field_container">
                            <label className="form_label">Password</label>
                            <input required className="form_input" type="password" onChange={(e) => {setPassword(e.target.value)}}></input>
                        </div>                
                        
                        <div className="form_field_container">
                            <label className="form_label">Profile Pic</label>
                            <input type='file' className='form_input' onChange={uploadPhoto} accept='image/*'></input>
                        </div>
                        
                        <div style={{display:"flex",justifyContent:"center"}}>
                        {loading === false && (
                            <button className="register_form_submit_btn">Register</button>
                        )}
                        </div>

                        {loading && loading === true && (
                            <div className='loading_container'>
                                <span className='loader'></span>
                                <div>Loading...</div>
                            </div>
                        )}
                    </form>
                    </div>
                )}
            </div>
        </div>
    )
}