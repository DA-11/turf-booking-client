import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function RequestedGames(){
    const[userPendingReqSectionOpen,setUserPendingReqSectionOpen] = useState(true);
    const[userReqHistorySectionOpen,setUserReqHistorySectionOpen] = useState(false);
    const[userGameswithReq,setUserGamesWithReq] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        axios.get('/gameRequest/getRequestingUserGames').then((response) => {
            console.log(response.data)
            setUserGamesWithReq(response.data);
            console.log(userGameswithReq);

        }).catch((err) => {
            console.log(err);
        })
    },[])

    function handleSectionVisibility(val){
        if(val === 'userPendingReq'){
            
            setUserReqHistorySectionOpen(false);
            setUserPendingReqSectionOpen(true);
        } else if(val === 'userReqHistory'){
           
            setUserPendingReqSectionOpen(false);
            setUserReqHistorySectionOpen(true);
        }
    }

    function getMonthDateFromTime(time){

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

    function viewPendingReqSection(){
        const pendingGames = userGameswithReq.filter((game) => {
            return game.requestStatus === "pending"
        })

        if(pendingGames.length === 0){
            return (
                <>
                    <div className="gameInfo_Container">
                            
                    <div className="gameInfo_Container_Request_heading">
                        <div>You have no Pending request</div>                   
                    </div>
    
                    </div>

                    <div className="requestGames_findgame_option" onClick={() => {navigate('/findGame')}}>Find games</div>
                </>
            )
        }

        return pendingGames.map((game) => (
           
            <div className="gameInfo_Container">
                        
                <div className="gameInfo_Container_Request_heading">
                    <div>Request By :- {game.requestingUser}</div> 
                    <div>{getMonthDateFromTime(game.gameData[0].fromTime)}</div>
                </div>
                <div className="gameInfo_Container_information">
                    <div className="gameInfo_Container_game"></div>
                    <div className="gameInfo_Container_time">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icons">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                        <div style={{display:"flex",width:"100%",justifyContent:"space-between"}}> 
                            <div>
                                {getTimeInFormat(game.gameData[0].fromTime.substring(11,16))} - {getTimeInFormat(game.gameData[0].toTime.substring(11,16))}
                            </div>

                           
                        </div>
                    </div>

                    <div className="gameInfo_Container_location">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icons">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>

                        <div>{game.gameData[0].turfName}</div>
                    </div>

                    <div className="gameInfo_Container_players">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icons">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>

                        <div>{game.gameData[0].players} players Coming</div>    
                    </div>

                    <div className="pending_req_container">
                        Request Pending
                    </div>

                </div>
                </div>
          
            
        )
        )
    }

    function viewReqHistorySection(){

        const reqHistory = userGameswithReq.filter((game) => {
            return game.requestStatus !== "pending";
        })

        if(reqHistory.length === 0){
            return (
                <div className="gameInfo_Container">
                        
                <div className="gameInfo_Container_Request_heading">
                    <div>No Requests Resolved</div>                   
                </div>
                
            </div>
            )
        }
        
        return reqHistory.map((game) => (
            <div className={game.requestStatus === "approved" ? "gameInfo_Container green_container_bg" : "gameInfo_Container red_container_bg"}>
                        
                <div className="gameInfo_Container_Request_heading">
                    <div>Hosted By :- {game.hostingUser}</div> 
                    <div>{getMonthDateFromTime(game.gameData[0].fromTime)}</div>
                </div>

                {game.requestStatus === "approved" && (
                    <div className="approved_req">Request Approved</div>
                )}

                {game.requestStatus === "declined" && (
                    <div className="declined_req">Request Declined</div>
                )}

                <div className="gameInfo_Container_information">
                    <div className="gameInfo_Container_game"></div>
                    <div className="gameInfo_Container_time">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icons">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                        <div style={{display:"flex",width:"100%",justifyContent:"space-between"}}> 
                            <div>
                                {getTimeInFormat(game.gameData[0].fromTime.substring(11,16))} - {getTimeInFormat(game.gameData[0].toTime.substring(11,16))}
                            </div>

                           
                        </div>
                    </div>

                    <div className="gameInfo_Container_location">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icons">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>

                        <div>{game.gameData[0].turfName}</div>
                    </div>

                    <div className="gameInfo_Container_players">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icons">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>

                        <div>{game.gameData[0].players} players Coming</div>    
                    </div>

                </div>
                </div>
        )
        )


    }

    return (
        <div className="findGame_Container">
        <div className="findGame_Container_box">
        <div className="user_hosted_games_container">

            <div className="user_hosted_games_btns">
                <div className='games_btn' onClick={() => {handleSectionVisibility('userPendingReq')}}>Pending Requests</div>
                <div className='games_btn' onClick={() => {handleSectionVisibility('userReqHistory')}}>Resolved Requests</div>
            </div>

            

            {userPendingReqSectionOpen && userPendingReqSectionOpen === true && (
                <div>{viewPendingReqSection()}</div>
            )}

            {userReqHistorySectionOpen && userReqHistorySectionOpen === true && (
                <div>{viewReqHistorySection()}</div>
            )}


        </div>
        </div>
        </div>
    )
}