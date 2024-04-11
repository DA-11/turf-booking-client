import ImageSilder from "../Index/ImageSlider";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './turfShowCaseCss.css'
import TurfInfo from "../TurfInfo/TurfInfo";

export default function TurfShowCase(){

    const[turfInfo,setTurfInfo] = useState([]);
    const[serchInput,setSearchInput] = useState('');
    const[openTurfHostPage,setOpenTurfHostPage] = useState(false);
    const[currentTurfId,setcurrentTurfId] = useState('');

    
    useEffect(() => {
        
        axios.get('/turf/getAll').then((response) => {
            setTurfInfo(response.data);
        });

    },[]);

    function openTurfHost(id){
        setOpenTurfHostPage(true);
        setcurrentTurfId(id);
    }

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

    return (
        <>

        <div className={openTurfHostPage ? "turfInfo_host_page open" : "turfInfo_host_page"}>
            {/* <TurfInfo turf_id={currentTurfId}></TurfInfo> */}
            <TurfInfo turf_id={currentTurfId}  hostPageVisible={true}></TurfInfo>
            {openTurfHostPage && openTurfHostPage === true && (
                <div className="turfInfo_host_page_close" onClick={() => {setOpenTurfHostPage(false)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="turfInfo_host_page_close_svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>
            )}
        </div>
        
        <div className="turfShowCase_Container">

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
                    <div className="index_page_turf_Container_Img_slider_Container" key={turf._id} >
                                
                        <div className="index_page_turf_container_slider_item_img_container">
                            {/* <img src="https://lh3.googleusercontent.com/p/AF1QipNRFPQVEuMUd0JMWvxGNCb55L8Kia9PZL_uKxyi=s680-w680-h510" className="index_page_turf_container_slider_item_img"></img> */}
                            <ImageSilder photos={turf.photos}></ImageSilder>
                        </div>
                    
                        
                        {/* <ImageSilder photos={turf.photos}></ImageSilder> */}

                        {/* <div className="index_page_turf_container_slider_item_information" onClick={() => {navigate(`/turfInfo/${turf._id}`)}}> */}
                        <div className="index_page_turf_container_slider_item_information" onClick={() => {openTurfHost(turf._id)}}>
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
    )
}