import { useState,useContext } from "react"
import { UserContext } from '../../UserContext';
import axios from "axios";
export default function ChatFooter({socket,friendUserName,roomId}){
    
    const[message,setMessage] = useState('');
    //const[fileMessage,setFileMessage] = useState("")
    const[file,setFile] = useState()
    const[fileLoaded,setFileLoaded] = useState(false);
    const{user} = useContext(UserContext);

    const handleSendMessage = (e) => {
        e.preventDefault();

        
        if(user.username && file){
            
            const data = new FormData();
           
            data.append('file',file[0]);
            

            console.log(data)

            //setFileMessage("");

            axios.post('http://localhost:5003/uploads',data,{
                headers: {'Content-Type':'multipart/form-data'}
            }).then((response) => {

                console.log(response.data.photos);

                const messageObj = {
                    "from":user.username,
                    "to":friendUserName,
                    "message":response.data.photos[0],
                    "type":"file",
                    "mimeType":file.type,
                    "filename":file.name,
                    "timestamp":new Date(),
                    roomId
                }

                console.log(messageObj);

                axios.post('http://localhost:5003/message/create',messageObj).then((response) => {
                    console.log(response.data);
                    setFileLoaded(false);
                }).catch((err) => {
                    console.log(err);
                })

                socket.emit('message', messageObj);   
                setFile();    

            }).catch((err) => {
                console.log(err);
                setFileLoaded(false);
            }) 
        }
        
        if(user.username && message){

            console.log('inside type text block')
           
            const messageObj = {
                "from":user.username,
                "to":friendUserName,
                "message":message,
                "type":"text",
                "mimeType":null,
                "filename":null,
                "timestamp":new Date(),
                roomId
            }

            axios.post('http://localhost:5003/message/create',messageObj).then((response) => {
                console.log(response.data);
            }).catch((err) => {
                console.log(err);
            })

            socket.emit('message', messageObj);
            setMessage('');
        }     

        
    }

    const selectfile = (e) => {
        console.log(e.target.file)
        setFileLoaded(true);
        setFile(e.target.files)
        console.log(file)
    }

    return (
        <div className="chat__footer">
            {fileLoaded && fileLoaded === true && (
                <div className="loaded_file_container">
                    File Loaded
                </div>
            )}
            <form className="chat_footer_form" onSubmit={handleSendMessage}>
                <input
                 type="text"
                 placeholder="message"
                 className="message"
                 value={message}
                 onChange={(e) => {setMessage(e.target.value)}}>
                 </input>

                 <label className="file_upload_label">
                    <input className="file_upload_input" type="file" onChange={selectfile} accept="image/*"></input>
                    <div className="file_upload_icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="chat_send_icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                        </svg>
                    </div>

                 </label>
                 <button className="sendBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="chat_send_icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>

                 </button>
            </form>
        </div>
    )
}