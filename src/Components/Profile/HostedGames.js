import axios from "axios";
import { useEffect, useState } from "react"

export default function HostedGames(){
    
    const[userGamesSectionOpen,setUserGamesSectionOpen] = useState(true);
    const[userPendingReqSectionOpen,setUserPendingReqSectionOpen] = useState(false);
    const[userReqHistorySectionOpen,setUserReqHistorySectionOpen] = useState(false);

    const[userHostedGames,setUserHostedGames] = useState([]);

    useEffect(() => {
        axios.get('/game/getAllUserGames').then((response) => {
        
            setUserHostedGames(response.data);
            console.log(userHostedGames);

        }).catch((err) => {
            console.log(err);
        })
    })
    
    function handleSectionVisibility(val){
        if(val === 'userGames'){
            setUserPendingReqSectionOpen(false);
            setUserReqHistorySectionOpen(false);
            setUserGamesSectionOpen(true);
        } else if(val === 'userPendingReq'){
            setUserGamesSectionOpen(false);
            setUserReqHistorySectionOpen(false);
            setUserPendingReqSectionOpen(true);
        } else if(val === 'userReqHistory'){
            setUserGamesSectionOpen(false);
            setUserPendingReqSectionOpen(false);
            setUserReqHistorySectionOpen(true);
        }
    }

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
    return (
        <div className="findGame_Container">
        <div className="findGame_Container_box">
        <div className="user_hosted_games_container">

            <div className="user_hosted_games_btns">
                <div className='games_btn' onClick={() => {handleSectionVisibility('userGames')}}>Your Games</div>
                <div className='games_btn' onClick={() => {handleSectionVisibility('userPendingReq')}}>Pending Requests</div>
                <div className='games_btn' onClick={() => {handleSectionVisibility('userReqHistory')}}>Requests History</div>
            </div>

            {userGamesSectionOpen && userGamesSectionOpen === true && userHostedGames && userHostedGames.map((game) => (
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

                </div>
                </div>
            ))}

        </div>
        </div>
        </div>
    )
}