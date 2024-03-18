import { useState,useEffect } from "react";
import axios from "axios";

import "./chooseTurfCss.css"
export default function ChooseTurf({step,setStep,turfName,setTurfName,setLocation}){
    
    const[turfInfo,setTurfInfo] = useState([]);
    const[serchInput,setSearchInput] = useState('');
    const[selectedTurf,setSelectedTurf] = useState('')

    useEffect(() => {
        
        axios.get('/turf/getAll').then((response) => {
            setTurfInfo(response.data);
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

    function handleTurfChoice(name,location){
        setLocation(location);
        setTurfName(name);
        setSelectedTurf(name)
    }

    return (
        <div className="chooseTurf_turf_container_box">

            <div className="turf_not_found_container">
                <div className="turf_name_input_label">Enter name of the turf</div>
                <input className="turf_name_input" type="text" placeholder="turf name" onChange={(e) => {setTurfName(e.target.value)}}></input>
                <div className="turf_location_input_label">Enter location of the turf</div>
                <input className="turf_location_input" type="text" placeholder="turf location" onChange={(e) => {setLocation(e.target.value)}}></input>
            </div>

            <div className="turf_not_found_question">OR</div>
            <div className="turf_not_found_question">Search or Select turf Below</div>
               
                
            <div className="turfShowCase_Container_search">
                <input className="turfShowCase_search_input" type="text" placeholder="search turf name" onChange={(e) => {setSearchInput(e.target.value)}}></input>
                <button className="turfShowCase_game_seach_btn"  onClick={getSearchResult}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="search_icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                </button>
            </div>

        {turfInfo && turfInfo.length > 0 && turfInfo.map((turf) => (
            <div className={turfName === turf.name ? "chooseTurf_turf_container selectedTurf_bg" : "chooseTurf_turf_container"} onClick={() => {handleTurfChoice(turf.name,turf.location)}}>
                <div className="chooseTur_turf_container_img_container">
                    <img className="chooseTur_turf_container_img" src={turf.photos[0]}></img>
                </div>
                <div className="chooseTur_turf_container_information">
                    <div className="chooseTur_turf_container_name">{turf.name}</div>
                   
                    <div className="chooseTur_turf_container_price">₹{turf.pricePerHour}/hour</div>
                 {/* <div className="chooseTur_turf_container_address">{turf.location}</div> */}
                 {turfName && turfName === turf.name && ( 
                    <div className="selected_turf_container">
                        <div>Selected</div> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="selected_icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </div>
                 )}
                </div>
            </div>
        ))}

        

        </div>
    )
}