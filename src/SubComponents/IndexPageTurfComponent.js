import { useEffect, useState } from "react"
import axios from 'axios'
export default function IndexPageTurfComponent(){
    
    const[turfInfo,setTurfInfo] = useState([]);

    useEffect(() => {
        
        axios.get('get turf information api').then((response) => {
            setTurfInfo(response.data);
        });

    },[]);

    return (

      

        <div className="index_page_turf_container_slider_item">
                        
            <div className="index_page_turf_container_slider_item_img_container">
                <img src="https://lh3.googleusercontent.com/p/AF1QipNRFPQVEuMUd0JMWvxGNCb55L8Kia9PZL_uKxyi=s680-w680-h510" className="index_page_turf_container_slider_item_img"></img>
            </div>
            
            <div className="index_page_turf_container_slider_item_information">
                <div className="index_page_turf_container_slider_item_information_name">Green Sapphire “Futsal” @ Mansarovar Public School</div>
                
                <div className="index_page_turf_container_slider_item_information_location">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="index_page_turf_container_slider_item_information_location_svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>

                    <div className="index_page_turf_container_slider_item_information_location_text">Public School, Mansarovar, Bhopal</div>
                </div>
                
                <div className="index_page_turf_container_slider_item_information_price">₹1500/hour</div>

                <div className="index_page_turf_container_slider_item_information_games">
                    <div className="index_page_turf_container_slider_item_information_game">7-a-side Football</div>
                    <div className="index_page_turf_container_slider_item_information_game">Cricket</div>
                </div>
  
            </div>
              
        </div>
    )
}