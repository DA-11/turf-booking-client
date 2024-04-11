import { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import ImageSilder from "./ImageSlider";
import './indexPageCss.css';
import TurfInfo from '../TurfInfo/TurfInfo'

export default function IndexPageTurfComponent(){
    
    const[turfInfo,setTurfInfo] = useState([]);
    const[showCaseTurfs,setShowCaseTurfs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        
        axios.get('/turf/getAll').then((response) => {
            const data = response.data;
            setTurfInfo([data[0],data[1],data[2],data[3]]);
            setShowCaseTurfs(response.data);
        });

    },[]);

    


    return (
        <>

        <div className="index_page_turf_container_slider">

            {turfInfo && turfInfo.length > 0 && turfInfo.map((turf) => (
                <div className="index_page_turf_Container_Img_slider_Container" key={turf._id} >
                            
                    <div className="index_page_turf_container_slider_item_img_container">
                        {/* <img src="https://lh3.googleusercontent.com/p/AF1QipNRFPQVEuMUd0JMWvxGNCb55L8Kia9PZL_uKxyi=s680-w680-h510" className="index_page_turf_container_slider_item_img"></img> */}
                         <ImageSilder photos={turf.photos}></ImageSilder>
                    </div>
                   
                    
                    {/* <ImageSilder photos={turf.photos}></ImageSilder> */}

                    {/* <div className="index_page_turf_container_slider_item_information" onClick={() => {navigate(`/turfInfo/${turf._id}`)}}> */}
                    <div className="index_page_turf_container_slider_item_information"  onClick={() => {navigate('/turfShowCase')}}>
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
        </>
        
    )
}