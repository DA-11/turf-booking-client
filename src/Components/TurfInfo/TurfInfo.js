import { useContext, useEffect, useState } from 'react';
import './turfInfoCss.css'
import { useParams } from "react-router-dom"
import axios from 'axios';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';

export default function TurfInfo({turf_id,hostPageVisible}){
    
    let {id} = useParams();
    id = id === undefined ? turf_id : id;
    const[data,setData] = useState(null);
    
    const[gameDate,setGameDate] = useState(new Date());
    const[fromTime,setFromTime] = useState('');
    const[toTime,setToTime] = useState('');
    const[players,setPlayers] = useState(1);
    const[game,setGame] = useState('Football');
    const[totalNoOfPlayers,setTotalNoOfPlayers] = useState(10);
    const[price,setPrice] = useState(1000);

    const[turfBooked,setTurfBooked] = useState(false);

    const[viewImagesPage,SetViewImagesPage] = useState(false);
    const[photoIdx,setPhotoIdx] = useState(0);

    const {user} = useContext(UserContext)
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/turf/getOneById',{
            params:{
                id
            }
        }).then((response) => {
            const data = response.data;
            setData(data);
            console.log(data);
        }).catch((err) => {
            console.log(err)
        });

    },[id]);

    function handleHostGame(e){
        e.preventDefault();

        if(!user){
            alert("Please Login to Host a Game");
        } else {

            console.log(gameDate);
            console.log(fromTime);
            console.log(toTime);
            
            const hostData = {
                "username":user.username,
                "turfName" : data.name,
                "location" : data.location,
                "fromTime" :`${gameDate}T${fromTime}:00.000+00:00`,
                "toTime" : `${gameDate}T${toTime}:00.000+00:00`,
                players,
                game,
                totalNoOfPlayers,
                price,
                "booked":turfBooked
            };

            axios.post('/game/createGame',hostData).then((response) => {
                console.log(response.data);
            }).catch((err) => {
                console.log(err);
                alert(err.response.data.message);
            })

            console.log(hostData);
        }
    }   
    
    function handleImageIndex(val){

        const len = data.photos.length;
        const currentIdx = photoIdx + (val);

        if(currentIdx >= 0 && currentIdx < len){
            setPhotoIdx(currentIdx);
        }
    }

    return (

        <>
         
         {viewImagesPage && viewImagesPage === true && (
            <div className='view_images_page'>
                <div className='close_view_images_page' onClick={() => {SetViewImagesPage(false)}}>
                    X
                </div>

                <div className='choose_left_image_option' onClick={() => {handleImageIndex(-1)}}>
                    {'<'}
                </div>
                
                <div className='choose_right_image_option' onClick={() => {handleImageIndex(1)}}>
                    {'>'}
                </div>

                <div className='view_images_page_gallery'>
                    {data && data.photos && data.photos.length > 0 && (
                        <img src={data.photos[photoIdx]} alt="image" className='turfInfo_Container_Img_slider_Container_img'></img>
                    )}
                </div>
            </div>
         )}
        
        <div className="turfInfo_Container_box">
            <div className="turfInfo_Container"> 
                
                <div className='turfInfo_Container_Img_slider_Container'>
                    {data && (
                        <div className='turfInfo_Container_view_images_Container' onClick={() => {SetViewImagesPage(true)}}>
                            View Images
                        </div>
                    )}
                    {data && data.photos && data.photos.length > 0 && (
                        <img src={data.photos[0]} alt="image" className='turfInfo_Container_Img_slider_Container_img'></img>
                    )}
                    {/* <img src='https://www.powerleague.com/wp-content/uploads/2022/10/FIND-1024x576.webp' className='turfInfo_Container_Img_slider_Container_img'></img> */}
                </div>        
            
                {data && (
                <div className='turfInfo_Container_information_Container'>
                    
                    <div className='turfInfo_Container_name_Container'>
                        {data.name}
                    </div>

                    
                    <div className='turfInfo_Container_location_Container'>
                        <div className='turfInfo_Container_location_Container_2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="turfInfo_Container_location_Container_svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>

                        {data.location}
                        </div>
                    </div>

                    {data && data.mapLocation && (
                        <div className='turfInfo_Container_map_location_Container'>
                            <iframe src={data.mapLocation} className='turfInfo_Container_map_location' style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    )}


                    <div className='turfInfo_Container_price_Container'>
                        ₹ {data.pricePerHour}/Hour
                    </div>

                    <div className='turfInfo_Container_games_Container'>
                    
                        {data.gamesAvailable && data.gamesAvailable.length > 0 && data.gamesAvailable.map((game) => (
                            <div className='turfInfo_Container_game'>{game}</div>        
                        ))}
                    </div>

                    {hostPageVisible && hostPageVisible === true && (
                        <div className='host_here_option_container'>
                            <div className='host_here_question_container'>Have a Booking here?</div>
                            <div className='host_here_btn' onClick={() => {navigate(`/hostGame/${data._id}`)}}>Host here</div>
                        </div>
                    )}
                    
                
                    {/* <div className='slot_check_container'>
                        <div className="turfInfo_Container_slot_heading">Host Game</div>
                        
                        <div className='turfInfo_form_Container'>
                        <form className='turfInfo_Contianer_slot_availability_form' onSubmit={handleHostGame}>
                       
                            <div className="turfInfo_Container_slot_start_time turfInfo_Container_form_div">
                                <label className='turfInfo_Container_form_label'>Date</label>
                                <input type='date' required onChange={(e) => setGameDate(e.target.value)} className='turfInfo_Container_form_input'></input>
                                
                            </div>


                            <div className="turfInfo_Container_slot_start_time turfInfo_Container_form_div">
                                <label className='turfInfo_Container_form_label'>Start time</label>
                                <input type='time' required onChange={(e) => setFromTime(e.target.value)} className='turfInfo_Container_form_input'></input>
                                
                            </div>

                            <div className="turfInfo_Container_slot_end_time turfInfo_Container_form_div">
                                <label className='turfInfo_Container_form_label'>End time</label>
                                <input type='time' required onChange={(e) => setToTime(e.target.value)} className='turfInfo_Container_form_input'></input>
                            </div>

                            <div className='turfInfo_Container_form_div'>
                                <label className='turfInfo_Container_form_label '>Players already in</label>
                                <input type='number' required onChange={(e) => setPlayers(e.target.value)} className='turfInfo_Container_form_input'></input>
                            </div>

                            <div className='turfInfo_Container_form_div'>
                                <label className='turfInfo_Container_form_label'>Game</label>
                                <input type='text' required onChange={(e) => setGame(e.target.value)} className='turfInfo_Container_form_input'></input>
                            </div>

                            <div className='turfInfo_Container_form_div'>
                                <label className='turfInfo_Container_form_label'>Total no. of players</label>
                                <input type='number' required onChange={(e) => setTotalNoOfPlayers(e.target.value)} className='turfInfo_Container_form_input'></input>
                            </div>

                            <div className='turfInfo_Container_form_div'>
                                <label className='turfInfo_Container_form_label'>price</label>
                                <input type='number' required onChange={(e) => setPrice(e.target.value)} className='turfInfo_Container_form_input'></input>
                            </div> 
                                
                            <div className='turfInfo_Container_form_div turf_booked_div'>
                                <label className='turfInfo_Container_form_label'>Turf Booked</label>
                                <div className='turfInfo_booking_btns'>
                                    <div className={turfBooked === true ? 'turfInfo_booking_btn_booked turfInfo_booking_btn_bg' : 'turfInfo_booking_btn_booked'} onClick={() => {setTurfBooked(true)}}>YES</div>
                                    <div className={turfBooked === false ? 'turfInfo_booking_btn_not_booked turfInfo_booking_btn_bg' : 'turfInfo_booking_btn_not_booked'} onClick={() => {setTurfBooked(false)}}>NO</div>
                                </div>
                            </div> 
                        
                            <div className='turfInfo_Container_host_btn'> 
                                <button className='host_btn'>Host Game</button>
                            </div>

                        </form>
                        </div>

                        

                    </div> */}
                
                    </div>
                )}
                
                
                        
            </div>
            
        </div>
        </>
    )
}
