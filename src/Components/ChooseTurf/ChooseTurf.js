import { useState,useEffect } from "react";
import axios from "axios";

import "./chooseTurfCss.css"
export default function ChooseTurf({step,setStep,turfName,setTurfName}){
    const[turfInfo,setTurfInfo] = useState([]);
    const[serchInput,setSearchInput] = useState('');

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

    function handleTurfChoice(name){
        setTurfName(name);
        setStep(step + 1);
    }

    return (
        <div className="chooseTurf_turf_container_box">

            <div className="turfShowCase_Container_search">
                <input type="text" placeholder="search turf name" onChange={(e) => {setSearchInput(e.target.value)}}></input>
                <button onClick={getSearchResult}>Search</button>
            </div>

        {turfInfo && turfInfo.length > 0 && turfInfo.map((turf) => (
            <div className="chooseTurf_turf_container" onClick={() => {handleTurfChoice(turf.name)}}>
                <div className="chooseTur_turf_container_img_container">
                    <img className="chooseTur_turf_container_img" src={turf.photos[0]}></img>
                </div>
                <div className="chooseTur_turf_container_information">
                    <div className="chooseTur_turf_container_name">{turf.name}</div>
                    {/* <div className="chooseTur_turf_container_address">{turf.location}</div> */}
                    <div className="chooseTur_turf_container_price">₹{turf.pricePerHour}/hour</div>
                </div>
            </div>
        ))}

        <div>
            <div>Could not find the turf you were looking for ?</div>
            <div>Enter name of the turf</div>
            <input type="text" placeholder="turf name" onChange={(e) => {setTurfName(e.target.value)}}></input>
            
        </div>
        </div>
    )
}