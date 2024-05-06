import { useNavigate } from "react-router-dom"
import { useContext,useRef,useEffect } from "react";
import { UserContext } from '../../UserContext';
import Image from "./Image";

export default function ChatBody({messages,socket,friendUserName}){
    const navigate = useNavigate();

    const handleLeaveChat = () => {
        localStorage.removeItem(`${socket.id}`);
        navigate('/');
        window.location.reload();
    }

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  
    useEffect(() => {
      scrollToBottom()
    }, [messages]);
    

    function getMessageTime(timestamp){
        const msgDate = new Date(timestamp);
        const hours = msgDate.getHours();
        const mins = msgDate.getMinutes();

        const date = msgDate.getDate();
        const month = msgDate.getMonth();

        console.log(`${date}/${month}`);
        console.log(`${hours}:${mins}`);
    }

    const{user} = useContext(UserContext);
    
    const renderMessage = (message) => {

        //console.log(message)
        //console.log("nmesage" + message.to);
        
        if(message.from === user.username){
            
            //console.log(message.message)
            //console.log("here in from ")

            if(message.type === "text"){
                return (
                    <div className="message__chats" key={message.id}>
                        <div className="message__compartment_user">
                            {/* <p className="sender__name"></p> */}
                            <div className="message__sender">
                                <p>{message.message}</p>
                                <div>{getMessageTime(message.timestamp)}</div>
                            </div>
                        </div>
                    </div>
                )
            }else if(message.type === "file"){
                return (

                    <div className="message__chats" key={message.id}>
                        <div className="message__compartment_user">
                            {/* <p className="sender__name"></p> */}
                            <div className="message__sender">
                                <Image filename={message.filename} imageSrc={message.message}></Image>
                                <div>{getMessageTime(message.timestamp)}</div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
        else if(message.to === user.username){
            //console.log("here in to ")
            //console.log(message.message)

            if(message.type === "text"){
                return (
                    <div className="message__chats" key={message.id}>
                        <div className="message__compartment_friend">
                            <p className="message_friendname">{friendUserName}</p>
                            <div className="message__recipient">
                                <p>{message.message}</p>
                                <div>{getMessageTime(message.timestamp)}</div>
                            </div>
                        </div>
                    </div>
                )

            }  else if(message.type === "file"){
                return (
                    <div className="message__chats" key={message.id}>
                        <div className="message__compartment_friend">
                        <p className="message_friendname">{friendUserName}</p>
                            <div className="message__recipient">
                                <Image filename={message.filename}  imageSrc={message.message}></Image>
                                <div>{getMessageTime(message.timestamp)}</div>
                            </div>
                        </div>
                    </div>
                )
            }
        }  else {
            //console.log(user)
            return (
                <div>

                </div>
            )
        }
    }

    return (
        <div>
            <div className="message__container">   
                {messages && messages.map((message) => 
                    <div key={message._id}>{renderMessage(message)}</div>              
                )}
                {/* <div className="message__status"></div> */}
                <div ref={messagesEndRef} />
            </div>
        </div>    
    )
}

