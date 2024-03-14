import axios from "axios"
import { useEffect, useState, useContext } from "react"
import { UserContext } from '../../UserContext';
import { useNavigate } from "react-router-dom";
export default function ChatBar(){

    const[chats,setChats] = useState([]);
    const{user} = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        
        if(user){
            axios.get('/chat/getAllUserChats',{
                params :{
                    "user":user.username
                }
            }).then((response) => {
                console.log(response.data);
                setChats(response.data);
            })
        }
    },[user]);

    function chat_friend(chat){

        console.log(chat)
        const friendName = chat.user1 === user.username ? chat.user2 : chat.user1
        return (
            <>
                <div className="chat_friendLogo">{friendName.charAt(0)}</div>
                <div className="chat_friendName">{friendName}</div>
            </>
        )

    }

    function navigateToChat(chat){
        const friendName = chat.user1 === user.username ? chat.user2 : chat.user1
        navigate(`/chat/${friendName}`);
    }

    return (
        <div className="chat_bar_container_box">
            <div className="chat_bar_container">
                {chats && chats.length > 0 && chats.map((chat) => (
                    <div key={chat._id} className="chat_bar_friend_container" onClick={() => {navigateToChat(chat)}}>
                        {chat_friend(chat)}
                    </div>
                ))}
            </div>
        </div>
    )
}