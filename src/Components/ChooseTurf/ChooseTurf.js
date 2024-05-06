import { useState,useEffect } from "react";
import axios from "axios";
import ImageSilder from "../Index/ImageSlider";
import "./chooseTurfCss.css"
import TurfShowCase from "../TurfShowCase/TurfShowCase";
import TurfInfo from "../TurfInfo/TurfInfo";

export default function ChooseTurf({step,setStep,turfName,setTurfName,setLocation,setPhotos,setTurfId}){
    
    const[turfInfo,setTurfInfo] = useState([]);
    const[serchInput,setSearchInput] = useState('');
    const[selectedTurf,setSelectedTurf] = useState('')
    const[openTurfHostPage,setOpenTurfHostPage] = useState(false);
    const[currentTurfId,setcurrentTurfId] = useState('');

    useEffect(() => {
        
        axios.get('/turf/getAll').then((response) => {
            setTurfInfo(response.data);
        }).catch((err) => {
            console.log(err);
        });

    },[]);

    function getSearchResult(){

        if(serchInput.length > 0){

            axios.get('/turf/getOneByName',{
                params:{
                    turfName:serchInput
                }
            }
            ).then((response) => {
                setTurfInfo(response.data);
                console.log(serchInput)
            }).catch((err) => {
                setTurfInfo([]);
                setSearchInput('');
            })
        }
        
    }

    function handleTurfChoice(name,location,photos,id){
        setLocation(location);
        setTurfName(name);
        setSelectedTurf(name);
        setPhotos(photos);
        setTurfId(id);
    }

    function openTurfHost(id){
        setOpenTurfHostPage(true);
        setcurrentTurfId(id);
    }

    return (
        <div className="chooseTurf_turf_container_box">
            
            <>

                <div className={openTurfHostPage ? "turfInfo_host_page open" : "turfInfo_host_page"}>
                    {/* <TurfInfo turf_id={currentTurfId}></TurfInfo> */}
                    <TurfInfo turf_id={currentTurfId} hostPageVisible={false}></TurfInfo>
                    {openTurfHostPage && openTurfHostPage === true && (
                        <div className="turfInfo_host_page_close" onClick={() => {setOpenTurfHostPage(false)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="turfInfo_host_page_close_svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                    )}
                </div>

                <div className="turfShowCase_Container_chooseTurf_changes">

                    <div className="turfShowCase_Container_box">
                    <div className="turfShowCase_Container_search">
                        <input className="turfShowCase_search_input" type="text" placeholder="search turf name" onChange={(e) => {setSearchInput(e.target.value)}}></input>
                        <button className="turfShowCase_game_seach_btn"  onClick={getSearchResult}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="search_icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                        </button>
                    </div>

                    <div className="index_page_turf_container_slider">
                        
                        {turfInfo && turfInfo.length === 0 && (
                            <div>No Turf found with this name</div>
                        )}

                        {turfInfo && turfInfo.length > 0 && turfInfo.map((turf) => (
                            <div className={turfName === turf.name ?"index_page_turf_Container_Img_slider_Container selectedTurf_bg" : "index_page_turf_Container_Img_slider_Container"}key={turf._id} >
                                <div className="see_turf_details_container" onClick={() => {openTurfHost(turf._id)}}>See Details</div>
                                
                                {turfName && turfName === turf.name && (
                                    <div className="choose_turf_selected_turf">
                                        <div>Selected</div>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="selected_turf_icon">
                                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                            </svg>

                                       
                                    </div>
                                )}
                                <div className="index_page_turf_container_slider_item_img_container">
                                    {/* <img src="https://lh3.googleusercontent.com/p/AF1QipNRFPQVEuMUd0JMWvxGNCb55L8Kia9PZL_uKxyi=s680-w680-h510" className="index_page_turf_container_slider_item_img"></img> */}
                                    <ImageSilder photos={turf.photos}></ImageSilder>
                                </div>
                            
                                
                                {/* <ImageSilder photos={turf.photos}></ImageSilder> */}

                                {/* <div className="index_page_turf_container_slider_item_information" onClick={() => {navigate(`/turfInfo/${turf._id}`)}}> */}
                                <div className="index_page_turf_container_slider_item_information" onClick={() => {handleTurfChoice(turf.name,turf.location,turf.photos,turf._id)}}>
                                    <div className="index_page_turf_container_slider_item_information_name">{turf.name}</div>
                                    
                                    <div className="index_page_turf_container_slider_item_information_location">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="index_page_turf_container_slider_item_information_location_svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                        </svg>

                                        <div className="index_page_turf_container_slider_item_information_location_text">{turf.location}</div>
                                    </div>
                                    
                                    <div className="index_page_turf_container_slider_item_information_price">{`₹${turf.pricePerHour}/hour`}</div>

                                    <div className="index_page_turf_container_slider_item_information_games">
                                        {turf.gamesAvailable && turf.gamesAvailable.map((game) => (
                                            <div className="index_page_turf_container_slider_item_information_game" key={game}>{game}</div>
                                        ))}
                                    </div>


                                </div>
                        
                            </div>
                        ))}
                        
                        
                    
                    </div>
                </div>
                </div>
            </>
    
            <div className="turf_not_found_question">OR</div>
            <div className="turf_not_found_container">
                <div className="turf_name_input_label">Enter name of the turf</div>
                <input className="turf_name_input" type="text" placeholder="turf name" onChange={(e) => {setTurfName(e.target.value)}}></input>
                <div className="turf_location_input_label">Enter location of the turf</div>
                <input className="turf_location_input" type="text" placeholder="turf location" onChange={(e) => {setLocation(e.target.value)}}></input>
            </div>

        </div>
    )
}