import { useEffect, useState, useContext } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { UserContext } from '../../UserContext';
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ChatPage({socket}){

    const[messages, setMessages] = useState([]);
    const[chatRoomId,setChatRoomId] = useState('');
    const {friendUserName} = useParams();
    
    const{user} = useContext(UserContext);
    const navigate = useNavigate(); 

    useEffect(() => {
        //get and set messages

        if(user){
        
            axios.get('http://localhost:5003/chat/getChat', {params : {
            
                "user1":user.username,
                "user2":friendUserName
                
            }}).then((response) => {
                
                setMessages(response.data.messages);
                setChatRoomId(response.data._id);
                //console.log(messages)
                
                socket.emit('joinChatRoom',response.data._id);

            }).catch((err) => {
                console.log(err)
            })
        }
        
    },[user,friendUserName])

    useEffect(() => {
        
        socket.on('messageResponse', (data) => {
           
            console.log(data)
            setMessages([...messages,data]);
        });

        //console.log(messages);
        
    },[socket,messages]);

    return (
        <div className="chat_page_container_box">
            <div className="chat_container"> 
                <div className="chat">
                    <div className="friendName_container">
                        <div className="back_icon_container" onClick={() => {navigate('/chats')}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="go_back_icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </div>
                        <div>{friendUserName}</div>
                    </div>
                    {/* <ChatBar/> */}
                    <div className="chat__main">
                        <ChatBody messages={messages} socket={socket} friendUserName={friendUserName}/>
                        <ChatFooter socket={socket} friendUserName={friendUserName} roomId={chatRoomId}/>
                    </div>
                </div>
            </div>
        </div>
    )
}