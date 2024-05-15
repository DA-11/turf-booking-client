import './profileCss.css';
import { useContext,useEffect,useState } from 'react';
import { UserContext } from '../../UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import HostedGames from './HostedGames';
import RequestedGames from './RequestedGames';

export default function(){

    const{user,setUser,setGame} = useContext(UserContext);
    
    const[hostedPageOpen,setHostedPageOpen] = useState(false);
    const[reqPageOpen,setReqPageOpen] = useState(false);
    
    const navigate = useNavigate();


   function handlePageVisibility(val){
        if(val === "hostedGames"){
            setHostedPageOpen(true);
            setReqPageOpen(false);
        } else if(val === "requestedGames") {
            setReqPageOpen(true);
            setHostedPageOpen(false);
        }
    }


    function handleLogOut(){
        if(user.oAuth === true){
            googleLogout();  
        } 

        setUser(null);    
        navigate('/');
        axios.post('/user/logout').then((response) => {
            console.log(response.data);
        }).catch((err) => {
            console.log(err);
        })

    }

    if(hostedPageOpen){
        return (
            <HostedGames></HostedGames>
        )
    }

    if(reqPageOpen){
        return (
            <RequestedGames></RequestedGames>
        )
    }

  
    return (

        <>
        
        <div className='profile_container_box'>

        <div className='profile_container'>

            {user && user.name && (
                <div className='profile_container_greeting_logout'>
                    <div>Hi, {user.name}</div>
                    <div className="profile_container_logout">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icons">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                        </svg>
                        <div onClick={handleLogOut}>Logout</div>
                    </div>
                    
                </div>
            )}

            <div className='profile_container_photo_container'>
                {user && (
                    <>
                    <img src={`${user.photo_url}`} className='profile_container_photo'></img>
                   </>
                )}    
    
            </div>
            
            {user && (
                <>
                    <div className='profile_container_username'>
                        {user.username}
                    </div>

                    
                </>
            )}

            <div className='profile_container_feature_btn'>
                <div className='feature_btn_option' onClick={() => {navigate('/hostedGames')}}>
                    Hosted Games 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icons">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>

                </div>
                
                <div className='feature_btn_option' onClick={() => {navigate('/requestedGames')}}>
                    Requested Games 
                    <img src='https://playo.co/_next/image?url=https%3A%2F%2Fplayo.gumlet.io%2FV3SPORTICONS%2FSP2.png%3Fq%3D20&w=1920&q=50' className='icons_img'></img>
                </div>
                
                <div className='feature_btn_option' onClick={() => {navigate('/chats')}}>
                    Chats
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icons">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                    </svg>

                </div>
                
                
            </div>
               
           
           

        </div>

        </div>
        </>
    )
}
