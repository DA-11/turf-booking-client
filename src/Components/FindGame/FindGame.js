import { useEffect, useState, useContext } from "react"
import axios from 'axios';
import './findGameCss.css'
import { UserContext } from '../../UserContext';
import { useNavigate } from "react-router-dom";

export default function FindGame(){
    
    const[games,setGames] = useState([]);
    const[serchInput,setSearchInput] = useState('');

    const {user} = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        
        axios.get('/game/getAllGames').then((response) => {
            console.log(response.data);
            setGames(response.data);
        }).catch((err) => {
            console.log(err);
        })
    },[])
    
    function getMonthDateFromTime(time){

        console.log(time);

        let month = time.substring(5,7);
        let date_ = time.substring(8,10);

        switch (month) {
            case '01' :
                return `Jan ${date_}`
            case '02' :
                return `Feb ${date_}`
            case '03' : 
                return `Mar ${date_}`
            case '04' : 
                return `Apr ${date_}`
            case '05' :
                return `May ${date_}`
            case '06' :
                return `Jun ${date_}`
            case '07' :
                return `Jul ${date_}`
            case '08' :
                return `Aug ${date_}`
            case '09' :
                return `Sep ${date_}`
            case '10' : 
                return `Oct ${date_}`
            case '11' :
                return `Nov ${date_}`
            case '12' : 
                return `Dec ${date_}`
            default :
                return ``;
        }
    }

    function getTimeInFormat(time){
        let hour = (Number)(time.substring(0,2));
        let min = time.substring(3,5);

        if(hour/12 === 0){
            return `${hour%12}:${min} AM`
        } else {
            return `${hour%12}:${min} PM`
        }
    }

    function getSearchResult(){

        if(serchInput.length > 0){

            axios.get('/game/getGameAfterTime',{
                params:{
                    turfName:serchInput,
                    date:new Date()
                }
            }
            ).then((response) => {
                console.log(response.data);
                setGames(response.data);
                setSearchInput('');
            }).catch((err) => {
                console.log(err)
                setGames([]);
                setSearchInput('');
            })
        }
        
    }

    function handleGameRequest(game){
        console.log(user)
        if(!user){
            alert("Please login to Join a Game")
        } 
        // else if(game.username === user.username){
        //     alert("You Cannot request to be part of your game")
        // }
        else {
            const requestData = {
                "gameID" : game._id,
                "requestingUsername":user.username,
                "hostingUsername":game.username
            }

            console.log(requestData)

            axios.post('gameRequest/createGameRequest',requestData).then((response) => {
                console.log(response.data);
                alert("Request sent to host");
            }).catch((err) => {
                console.log(err);
                alert(err.response.data.message)
            })

        }

    }

    const redirectToChatPage = (friendUserName) => {
        
        console.log(friendUserName);

        const users = {
            "user1":user.username,
            "user2":friendUserName
        }

        axios.post('http://localhost:5003/chat/create',users).then((response) => {
            console.log(response.data);
            navigate(`/chat/${friendUserName}`);
        }).catch((err) => {
            console.log(`somethign went wrong while creating Chat ${err}` );
        })

    }

    return (
        <div className="findGame_Container">
            <div className="findGame_Container_box">

                <div className="gameInfo_Container_search">
                    <input type="text" placeholder="search turf name" onChange={(e) => {setSearchInput(e.target.value)}}></input>
                    <button onClick={getSearchResult}>Search</button>
                </div>
                
                {games && games.length === 0 && (
                    <div className="gameInfo_Container_No_game">No games Found</div>
                )}

                {games && games.length > 0 && games.map((game) => (
                    <div className="gameInfo_Container">
                        
                        <div className="gameInfo_Container_date">
                            <div>{getMonthDateFromTime(game.fromTime)}</div> 
                            <div>{game.game}</div>
                        </div>
                        <div className="gameInfo_Container_information">
                            <div className="gameInfo_Container_game">Hosted by {game.username}</div>
                            <div className="gameInfo_Container_time">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icons">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>

                                <div>
                                    {getTimeInFormat(game.fromTime.substring(11,16))} - {getTimeInFormat(game.toTime.substring(11,16))}
                                </div>

                            </div>

                            <div className="gameInfo_Container_location">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icons">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>

                                <div>{game.turfName}</div>
                            </div>

                            <div className="gameInfo_Container_players">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icons">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                </svg>

                                <div>{game.players} players coming</div>    
                            </div>

                            <div className="gameInfo_Container_host_info">
                               
                                <div className="gameInfo_Container_host_info_chat_option">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icons">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                                    </svg>

                                    <div>
                                        Chat with <div onClick={() => {redirectToChatPage(game.username)}}>{game.username}</div>
                                    </div>
                                </div>
                                
                                <div className="gameInfo_Container_join_game" onClick={() => {handleGameRequest(game)}}>
                                    {user && user.username === game.username && (
                                        <>See Requests</>
                                    )}

                                    {!user && (
                                        <>JOIN GAME</>
                                    )}

                                    {user && user.username !== game.username && (
                                        <>JOIN GAME</>
                                    )}


                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}