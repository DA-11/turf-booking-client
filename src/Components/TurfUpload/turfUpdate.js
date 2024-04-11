import './turfUploadCss.css'
import { useContext, useEffect, useState } from 'react'
import {UserContext} from "../../UserContext"
import GamesAvailable from './GamesAvailable';
import Perks from './Perks';
import PhotosUploader from './PhotosUploader';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function TurfUpdate(){

    const{id} = useParams();

    const[turfName,setTurfName] = useState('');
    const[location,setLocation] = useState('');
    const[pricePerHour,setPricePerHour] = useState(null);
    const[gamesAvailable,setGamesAvailable] = useState([]);
    const[perks,setPerks] = useState([]);
    const[number,setNumber] = useState(null);
    const[additionalInfo,setAdditionalInfo] = useState('');
    const[photos,setPhotos] = useState([]);

    useEffect(() => {
        if(!id){
            return;
        }

        axios.get('/turf/getOne',{id}).then((response) => {
            const data = response.data;
            setTurfName(data.turfName);
            setLocation(data.location);
            setPricePerHour(data.pricePerHour);
            setGamesAvailable(data.gamesAvailable);
            setPerks(data.perks);
            setNumber(data.contactNumber);
            setPhotos(data.photos);
        });

    },[id]);

    
    function uploadTurf(e){
        e.preventDefault();

        const data = {
            "name":turfName,
            location,
            pricePerHour,
            gamesAvailable,
            perks,
            "contactNumber":number,
            additionalInfo,
            photos
        }

        axios.post('http://localhost:5003/turf/create',data).then((response) => {
            console.log(response.data);
            alert(response.data);
        }).catch((err) => {
            console.log(err);
        })
    }


    return(
        <div className="turf_Upload_Container_box">
            <div className='turf_Upload_Container'>
                <div className='turf_Upload_Container_Heading'>
                    <div>Make Your Turf Visible</div>
                </div>        

                       
                <form className='turf_upload_form' onSubmit={uploadTurf}>
                <label className='turf_upload_form_label'>Turf Name</label>
                    <div className='turf_upload_form_input_div'>
                        <input type='text' 
                            className='turf_upload_form_input' 
                            value={turfName} 
                            required
                            onChange={(e) => {setTurfName(e.target.value)}}></input>
                    </div>

                    <div className='turf_upload_form_input_div'>
                        <label className='turf_upload_form_label'>Address</label>
                        <input type='text' 
                            className='turf_upload_form_input' 
                            value={location} 
                            required
                            onChange={(e) => {setLocation(e.target.value)}}></input>
                    </div>

                    <div className='turf_upload_form_input_div'>
                        
                        <label className='turf_upload_form_label'>Price per hour</label>
                        <input type='number' 
                            className='turf_upload_form_input' 
                            value={pricePerHour}
                            onChange={(e) => {setPricePerHour(e.target.value)}}
                            placeholder='1000'
                            required
                            ></input>
                    </div>

                    <div className='turf_upload_form_input_div'>
                        <GamesAvailable selected={gamesAvailable} onChange={setGamesAvailable}></GamesAvailable>
                    </div>

                    <div className='turf_upload_form_input_div'>
                       <Perks selected={perks} onChange={setPerks}></Perks>
                    </div>

                    <div className='turf_upload_form_input_div'>
                        
                        <label className='turf_upload_form_label'>Contact no.</label>
                        <input type='number' 
                            className='turf_upload_form_input'
                            value={number}
                            onChange={(e) => {setNumber(e.target.value)}}
                            placeholder='9098789870'
                            required
                            ></input>
                    </div>

                    <div className='turf_upload_form_input_div'>
                        
                        <label className='turf_upload_form_label'>Additional Info/ rules</label>
                        <input type='textarea' 
                            className='turf_upload_form_input'
                            value={additionalInfo}
                            onChange={(e) => {setAdditionalInfo(e.target.value)}}
                            ></input>
                    </div>

                    <div className='turf_upload_form_input_div'>
                        <PhotosUploader photos={photos} onChange={setPhotos}></PhotosUploader>
                    </div>

                    <div className='turf_upload_form_input_submit_div'>
                        <button className='turf_upload_form_submit_btn'>Save</button>
                    </div>

                </form>
            </div>
        </div>
    )
}