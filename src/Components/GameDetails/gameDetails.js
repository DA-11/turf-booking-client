import { useParams } from "react-router-dom"
import './gameDetailsCss.css'
import { useContext, useEffect, useState } from "react";
import { UserContext } from '../../UserContext';
import axios from "axios";

export default function GameDetails(){
    
    const{game,user} = useContext(UserContext);
    const[requests,setRequests] = useState([]);

    useEffect(() => {

        if(user && game && user.username === game.username){
            axios.get('/gameRequest/getGameRequestForHost').then((response) => {
                console.log(response.data);
                setRequests(response.data);
            }).catch((err) => {
                console.log(err);
            })
        }

    },[])

    function showGameDetails(){
        console.log(game);
        console.log(user)
    }

    function getTimeInFormat(time){
        console.log(time)
        let hour = (Number)(time.substring(0,2));
        let min = time.substring(3,5);

        if(hour/12 === 0){
            return `${hour%12}:${min} AM`
        } else {
            return `${hour%12}:${min} PM`
        }
    }

    function getMonthDateFromTime(time){
        let month = time.substring(5,7);
        let date_ = time.substring(11,13);

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

    return (
        <div className="gameDetails_Container">
            
            <div className="gameDetails_Container_box" onClick={showGameDetails}>
                {game && (
                    <>
                        <div className="gameDetails_Container_host_name">
                            {game.username}'s {game.game} Activity
                        </div>

                        <div className="gameDetails_Container_game_info">
                            <img src="https://playo.co/_next/image?url=https%3A%2F%2Fplayo-website.gumlet.io%2Fplayo-website-v2%2Fshare-pages%2FSport%2B1.png&w=32&q=75" className="gameActivityImg"></img>
                            {game.game}
                        </div>

                        <div className="gameDetails_Container_time">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icons">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                            <div>
                                {getTimeInFormat(game.fromTime.substring(11,16))} - {getTimeInFormat(game.toTime.substring(11,16))}
                            </div>

                        </div>

                        <div className="gameDetails_Container_date">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icons">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                            </svg>

                            
                            <div>{getMonthDateFromTime(game.fromTime)}</div> 
                        </div>

                        <div className="gameDetails_Container_location">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icons">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>

                            <div>
                                {game.turfName}
                            </div>

                        </div>
                    </>
                )}

                {game && user && game.username === user.username && requests && requests.length > 0 && requests.map((request) => {
                    <div>
                        {request._id}
                    </div>
                })}
            </div>

        </div>
    )
}