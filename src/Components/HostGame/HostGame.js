import { useState } from 'react'
import './hostGameCss.css'
import ChooseTurf from '../ChooseTurf/ChooseTurf';
import DayTimePicker from '@mooncake-dev/react-day-time-picker';

export default function HostGame(){

    const[step,setStep] = useState(1);
    const[turfName,setTurfName] = useState('');
    const[timeSlotSize,setTimeSlotSize] = useState(60);

    const[gameDate,setGameDate] = useState(new Date());
    const[fromTime,setFromTime] = useState('');
    const[toTime,setToTime] = useState('');
    const[players,setPlayers] = useState(1);
    const[game,setGame] = useState('Football');
    const[totalNoOfPlayers,setTotalNoOfPlayers] = useState(10);
    const[price,setPrice] = useState(1000);

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleScheduled = date_Time => {
        
        const dateTime = date_Time.toString();
        const formatedDate = formatDate(dateTime.substring(0,16));
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

        

        if(slot_size % 2 == 0){
            
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

    function renderFormPage(){
        switch (step){
            case 1: 
                return (
                    <div className='step_form_container'>
                        <div className='step_form_heading'>Choose a Turf</div>
                        <div>
                            <ChooseTurf step={step} turfName={turfName} setStep={setStep} setTurfName={setTurfName}></ChooseTurf>
                        </div>
                        <div className='prev_next_btns_container'>
                            <div onClick={nextStep} className='next_step_btn'>Next</div>
                        </div>
                    </div>
                )
            case 2: 
                return (
                    <div className='step_form_container'>
                        <div className='step_form_heading'>Choose Date and Time</div>
                        <div className='time_slot_choice_container'>
                            
                            <div className='duration_choice_container'>
                                <div className='time_slot_duration_label'>Duration of your booking</div>
                            </div>

                            <div className='time_slot_duration_picker'> 
                                {timeSlotSize && timeSlotSize > 30 && (
                                    <button className='increment_timeSlotsize_container' onClick={() => {setTimeSlotSize(timeSlotSize - 30)}}>-</button>
                                )}
                            
                                <div className='time_slot_duration_mins_container'>{timeSlotSize} mins</div>
                                <button className='decrement_timeSlotsize_container' onClick={() => {setTimeSlotSize(timeSlotSize + 30)}}>+</button>
                            </div>
                            
                        </div>

                        <div className='date_time_selector_container'>Date and Time</div>           
                        <DayTimePicker timeSlotSizeMinutes={30} onConfirm={handleScheduled}/>
                        <div className='prev_next_btns_container'>
                            <div onClick={prevStep} className='prev_step_btn'>Prev</div>
                        </div>
                    </div>
                    
                )
            case 3:
                return (
                    <div className='step_form_container'>
                        <div className='step_form_heading'>Choose no. of players and Price</div>
                        <div className='prev_next_btns_container'>
                            <div onClick={prevStep} className='prev_step_btn'>Prev</div>
                            <div onClick={nextStep} className='next_step_btn'>Next</div>
                        </div>
                    </div>
                )
            case 4:
                return (
                    <div className='step_form_container'> 
                        <div className='step_form_heading'>Preview Information and Host</div>
                        <div className='prev_next_btns_container'>
                            <div onClick={prevStep} className='prev_step_btn'>Host</div>
                        </div>
                    </div>
                )

        }
    }
    return (
        <div className="hostGame_Container">
            <div className="hostGame_Container_box">
                <div>{renderFormPage()}</div>
            </div>
        </div>
    )
}