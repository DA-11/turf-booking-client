import { useState,useContext, useEffect } from 'react'
import './hostGameCss.css'
import ChooseTurf from '../ChooseTurf/ChooseTurf';
import DayTimePicker from '@mooncake-dev/react-day-time-picker';
import axios from 'axios';
import { UserContext } from '../../UserContext';
import { useParams } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import TurfShowCase from '../TurfShowCase/TurfShowCase';
import TurfInfo from '../TurfInfo/TurfInfo';
export default function HostGame(){

    const {turf_id} = useParams();

    const[step,setStep] = useState(1);
    const[turfName,setTurfName] = useState('');
    const[timeSlotSize,setTimeSlotSize] = useState(60);
    const[location,setLocation] = useState('');
    const[gameDate,setGameDate] = useState(new Date());
    const[fromTime,setFromTime] = useState('');
    const[toTime,setToTime] = useState('');
    const[players,setPlayers] = useState(1);
    const[game,setGame] = useState('Football');
    const[totalNoOfPlayers,setTotalNoOfPlayers] = useState(10);
    const[price,setPrice] = useState(1000);
    const[turfBooked,setTurfBooked] = useState(false);
    
    const[hostGameLoading,setHostGameLoading] = useState(false);
    const[hostGameInfo,setHostGameInfo] = useState('');

    const[showAlertWindow,setShowAlertWindow] = useState(false);
    const[alertWindowMessage,setAlertwindowMessage] = useState('');

    const[turfInfo,setTurfInfo] = useState({});
    const[photos,setPhotos] = useState([]);
    const[turfId,setTurfId] = useState('');

    const {user} = useContext(UserContext)
 
    const navigate = useNavigate();
    
    useEffect(() => {
        console.log(turf_id);
        if(turf_id === undefined){
            
        } else {

            axios.get('/turf/getOneById',{
                params:{
                    "id":turf_id
                }
            }).then((response) => {
                const data = response.data;
                setTurfName(data.name);
                setLocation(data.location);
                setTurfId(turf_id);
                setPhotos(data.photos);
                nextStep();
                console.log(data);
            }).catch((err) => {
                console.log(err)
            });
            
        }
    },[])

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleScheduled = date_Time => {
        
        const dateTime = date_Time.toString();
        const formatedDate = formatDate(dateTime.substring(0,16));
        setGameDate(formatedDate);
        console.log(formatedDate);

        const timePortion = dateTime.substring(16);
        const fromTime = timePortion.substring(0,5);

        const toTime = timePortionHandler(fromTime);

        setFromTime(fromTime);
        setToTime(toTime);

        nextStep();
    }

    function timePortionHandler(fromTime){
        const slot_size = timeSlotSize/30;
        let toTime = ``;

        if(slot_size % 2 === 0){
            
            const additional_hours = slot_size/2;
            let hourPortion = (Number (fromTime.substring(0,2)) + additional_hours) % 24;

            hourPortion = `${hourPortion}`.length % 2 === 1 ? `0${hourPortion}` : `${hourPortion}`;
            toTime = `${hourPortion}:${fromTime.substring(3,5)}`;
        }
        else 
        {

            if((Number (fromTime.substring(3,5))) === 30){
               
                const minPortion = `00`;
                const additional_hours = ((slot_size - 1)/2) + 1;
                let hourPortion = (Number (fromTime.substring(0,2)) + additional_hours) % 24;
                hourPortion = `${hourPortion}`.length % 2 === 1 ? `0${hourPortion}` : `${hourPortion}`;
                toTime = `${hourPortion}:${minPortion}`;
                
            } else {
            
                const minPortion = `30`;
                const additional_hours = (slot_size - 1)/2 ;
                let hourPortion = (Number (fromTime.substring(0,2)) + additional_hours) % 24;
                hourPortion = `${hourPortion}`.length % 2 === 1 ? `0${hourPortion}` : `${hourPortion}`;
                toTime = `${hourPortion}:${minPortion}`;
                
            }
        }

        return toTime;
    }

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    function handleHostGame(){
      
        //setHostGameLoading(true);

        if(!user){
            handleAlertWindow("Please Login to Host a Game");
        } else {
            console.log(gameDate);
            console.log(fromTime);
            console.log(toTime);
            
            const hostData = {
                "username":user.username,
                "turfName" : turfName,
                "location" : location,
                "fromTime" :`${gameDate}T${fromTime}:00.000+00:00`,
                "toTime" : `${gameDate}T${toTime}:00.000+00:00`,
                players,
                game,
                // totalNoOfPlayers,
                price,
                "booked":turfBooked
            };

            axios.post('/game/createGame',hostData).then((response) => {
                console.log(response.data);
                setHostGameInfo("Game Hosted, redirecting")
                navigate('/hostedGames');
            }).catch((err) => {
                setHostGameInfo("Some Error Occurred, pls try to host again ")
                console.log(err);
                handleAlertWindow(err.response.data.message);
            })

            console.log(hostData);
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
   
    function bookingFlagHandler(e){
        setTurfBooked(e.target.value === 'Yes' ? true : false);
    }

   

    function getSelectedTurfInfo(name){
        axios.get('/turf/getOneByName',{
            params:{
                turfName:name
            }
        }
        ).then((response) => {
            setTurfInfo(response.data);
            console.log(response.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    function displayTurfName(){
        console.log(turfName)
        console.log(turfId)
        if(turfId.length() === 0){
            return (
                <div>{turfName}</div>
            )
        }
        
    }

    function renderFormPage(){
        switch (step){
            case 1: 
                return (
                    <div className='step_form_container'>
                        <div className='step_form_heading'>Select Turf</div>
                        <div>
                            <ChooseTurf step={step} turfName={turfName} setStep={setStep} setTurfName={setTurfName} setLocation={setLocation} setPhotos={setPhotos} setTurfId={setTurfId}></ChooseTurf>
                            {/* <TurfShowCase></TurfShowCase> */}
                        </div>
                        <div className='prev_next_btns_container'>
                            {turfName && turfName !== '' && (
                                <div onClick={nextStep} className={turfName === '' ? 'next_step_btn' : 'next_step_btn next_step_btn_fixed'}>
                                    <div>Next</div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="next_btn_icon">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>
                )
            case 2: 
                return (
                    <div className='step_form_container'>
                        <div className='step_form_heading'>Select Date and Time</div>
                        <div className='time_slot_choice_container'>
                            
                            <div className='duration_choice_container'>
                                <div className='time_slot_duration_label'>Duration of your booking</div>
                            </div>

                            <div className='time_slot_duration_picker'> 
                                {timeSlotSize && timeSlotSize > 30 && (
                                    <button className='increment_timeSlotsize_container' onClick={() => {setTimeSlotSize(timeSlotSize - 30)}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="minute_btn">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                        </svg>
                                    </button>
                                )}
                            
                                <div className='time_slot_duration_mins_container'>{timeSlotSize} mins</div>
                                <button className='decrement_timeSlotsize_container' onClick={() => {setTimeSlotSize(timeSlotSize + 30)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="minute_btn">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                            </div>
                            
                        </div>

                        <div className='date_time_selector_container'>Date and Time</div>           
                        
                        <div className="customDatePickerWidth">
                            <DayTimePicker timeSlotSizeMinutes={30} onConfirm={handleScheduled}/>
                        </div>
                        <div className='prev_next_btns_container'>
                        <div onClick={prevStep} className='prev_step_btn'>
                               
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="step-btn-icon-right">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                            </svg>

                            <div>Prev</div>

                           </div>
                        </div>
                    </div>
                    
                )
            case 3:
                return (
                    <div className='step_form_container'>
                        
                        
                        <div className='step_form_heading'>Select no. of players and Price</div>
                        <div>
                            {/* <div className='player_count_container'>
                                <label className='players_choice_label info-icon-container'>
                                    <div>Total players </div>
                                    <div className='info-icon-hover'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="info-icon">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                        </svg>
                                    </div>

                                    <div className='information'>
                                        Total number of players who can at the venue.
                                    </div>
                                </label>
                                <input className='players_choice_label_input' placeholder="Total players (including you)" type='number' onChange={(e) => {setTotalNoOfPlayers(e.target.value)}}></input>
                            </div> */}
                            <div className='player_count_container'>
                                <label className='players_choice_label info-icon-container'>
                                <div>Slots available </div>
                                    <div className='info-icon-hover'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="info-icon">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                        </svg>
                                    </div>  

                                    <div className='information'>
                                        No. of slots left for new players to join. This will be total players - any of your friends you may have invited personally ( including yourself). Ex: Total Players = 10, slots left in case you invited no one will be 9 (including yourself) 
                                    </div>  
                                </label>
                                <input className='players_choice_label_input' type='number' placeholder='Slots left' onChange={(e) => {setPlayers(e.target.value)}}></input>
                            </div>
                            <div className='player_count_container'>
                                <label className='players_choice_label'>Booking price</label>
                                <input className='players_choice_label_input' type='number' placeholder='1000' onChange={(e) => {setPrice(e.target.value)}}></input>
                            </div>

                            <div className='player_count_container'>
                                <label className='players_choice_label'>Sport</label>
                                <input className='players_choice_label_input' type='text' placeholder="Eg: Football \ Cricket \..." onChange={(e) => {setGame(e.target.value)}}></input>
                            </div>
                            <div className='player_count_container'>
                                <label className='turfInfo_Container_form_label'>Turf Booked</label>
                                <select className='players_choice_label_input' onChange={bookingFlagHandler}> 
                                    <option className={turfBooked === true ? 'hostGame_booking_btn_booked hostGame_booking_btn_bg' : 'hostGame_booking_btn_booked'} name="Yes" value="Yes">Yes</option>
                                    <option className={turfBooked === false ? 'hostGame_booking_btn_not_booked hostGame_booking_btn_bg' : 'hostGame_booking_btn_not_booked'} name="No" value="No">No</option>
                                </select>
                                {/* <div className='hostGame_booking_btns'>
                                    <div className={turfBooked === true ? 'hostGame_booking_btn_booked hostGame_booking_btn_bg' : 'hostGame_booking_btn_booked'} onClick={() => {setTurfBooked(true)}}>YES</div>
                                    <div className={turfBooked === false ? 'hostGame_booking_btn_not_booked hostGame_booking_btn_bg' : 'hostGame_booking_btn_not_booked'} onClick={() => {setTurfBooked(false)}}>NO</div>
                                </div> */}
                            </div> 
                        </div>
                        <div className='prev_next_btns_container'>
                            <div onClick={prevStep} className='prev_step_btn'>
                               
                               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="step-btn-icon-right">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                               </svg>
   
                               <div>Prev</div>
   
                            </div>
                            <div onClick={nextStep} className='next_step_btn'>
                                <div>Next</div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="step-btn-icon-left">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                            </div>
                        </div>
                    </div>
                )
            case 4:
                return (

                    <>
                    <div className='step_form_container'> 

                        
                        {/* {photos && photos.length > 0 && photos.map((photo) => (
                            <div className='selected_turf_photo_container'>
                                <img className='selected_turf_photo' src={photo}></img>
                            </div>
                        ))} */}

                        {hostGameLoading && hostGameLoading === true && (
                            <div className='hostGame_loading_info'>{`${hostGameInfo}`}</div>
                        )}
                       

                        <div className='step_form_heading'>Preview Information and Host</div>
                        
                        <div className='image_slider_container'>
                            
                            <div className='selected_turf_photo_container'>
                                {photos && photos.length > 0  && (
                                    <img className='selected_turf_photo' src={photos[0]}></img>
                                )}
                                
                                {photos && photos.length === 0  && (
                                    <img className='selected_turf_photo' src={`https://content.jdmagicbox.com/comp/def_content/sports-ground/sports-ground1-sports-ground-1-7d9x4.jpg`}></img>
                                )}

                            </div>
                        
                            <div className='preview_info_name_div_container'>
                                <div className='preview_info_detail_label'>Game at-</div>
                                <div className='preview_info_detail'>
                                    
                                    
                                    {/* <>{displayTurfName()}</> */}
                                
                                    {/* {turfId === undefined && (
                                        <div>
                                            {turfName}
                                        </div>
                                    )} */}
                                    
                                
                                    <Link to={turfId !== undefined ? `/turfInfo/${turfId}` : ``} target='_blank' className='link'>
                                       <div className='turf_name_and_info_icon_container'>
                                            <div>{turfName}</div>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="turf_info_icon">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                                                </svg>
                                            </div>
                                        </div>
                                    </Link>
                                    


                                    
                                   
                                </div>
                            </div>

                            {/* <div className='info-icon-container'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="info-icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                </svg>
                            </div> */}

                            <div className='info_time_container_box'>        
                                <div className='info_time_container'>
                                    <div className='info_time'>
                                        <div className='info_time_label'>Date</div>
                                        <div className='info_time_value'>{gameDate}</div>  
                                    </div>
                                </div>

                                <div className='info_time_container'>
                                    <div className='info_time'>
                                        <div className='info_time_label'>Time</div>
                                        <div className='info_date_value'>{getTimeInFormat(fromTime) + " - " + getTimeInFormat(toTime)}</div>  
                                    </div>
                                </div>

                                <div className='info_time_container'>
                                    <div className='info_time'>
                                        <div className='info_time_label'>Slots left</div>
                                        <div className='info_date_value'>{players}</div>  
                                    </div>
                                </div>

                                {/* <div className='info_time_container'>
                                    <div className='info_time'>
                                        <div className='info_time_label'>Total Players</div>
                                        <div className='info_date_value'>{totalNoOfPlayers}</div>  
                                    </div>
                                </div> */}

                                <div className='info_time_container'>
                                    <div className='info_time'>
                                        <div className='info_time_label'>Turf booked</div>
                                        <div className='info_date_value'>{!!turfBooked === true ? "YES" : "NO"}</div>  
                                    </div>
                                </div>
                            </div>

                        </div>

                       
                                
                        {/* <div className='preview_info_container'>

                            <div className='preview_info_div_container'>
                                <div className='preview_info_label'>Date & Time</div>
                                <div className='preview_info_time_and_date_detail'>{gameDate} - {getTimeInFormat(fromTime) + " - " + getTimeInFormat(toTime)}</div>
                            </div>

                            <div className='preview_info_div_container'>
                                <div className='preview_info_label'>Slots available</div>
                                <div className='preview_info_detail'>{players}</div>
                            </div>

                            <div className='preview_info_div_container'>
                                <div className='preview_info_label'>Total Players</div>
                                <div className='preview_info_detail'>{totalNoOfPlayers}</div>
                            </div>

                            <div className='preview_info_div_container'>
                                <div className='preview_info_label'>Venue booked</div>
                                <div className='preview_info_detail'>{!!turfBooked === true ? "YES" : "NO"}</div>
                            </div>
                        </div> */}
                        <div className='prev_next_btns_container'>
                            <div onClick={prevStep} className='edit_info_btn'>
                                <div>Edit</div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="edit_info_btn_icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>

                            </div>
                            <div onClick={handleHostGame} className='prev_step_btn'>Host</div>
                        </div>
                    </div>

                    
                </>
                )

        }
    }

    function handleAlertWindow(msg){
        setShowAlertWindow(true);
        setAlertwindowMessage(msg)
    }

    return (
        <div className="hostGame_Container">
            <div className="hostGame_Container_box">

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


            <div>{renderFormPage()}</div>
            </div>
        </div>
    )
}