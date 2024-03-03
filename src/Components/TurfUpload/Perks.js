
export default function Perks({selected,onChange}){

    function handleCbClick(event){
        const{checked,name} = event.target;

        if(checked){
            onChange([...selected,name]);
        } else {
            onChange([...selected.filter(selectedName => selectedName !== name)])
        }
    }

    function handleOnChange(){
        
    }

    return (
        <div>
            
            <label className="turf_upload_form_label">Perks</label>

            <div className='turf_upload_form_label_games'>
            <label className='turf_upload_form_checkbox_container' >
                <input checked={selected.includes('washroom')} name="washroom" onClick={handleCbClick} onChange={handleOnChange} type="checkbox"  className='turf_upload_form_input_checkbox' ></input>
                <span className='turf_upload_form_label_span'>Washroom</span>
            </label>

            <label className='turf_upload_form_checkbox_container'>
                <input checked={selected.includes('Parking')} name='Parking' onClick={handleCbClick} onChange={handleOnChange} type='checkbox' className='turf_upload_form_input_checkbox' ></input>
                <span className='turf_upload_form_label_span'>Parking</span>
            </label>

            <label className='turf_upload_form_checkbox_container'>
                <input checked={selected.includes('Changing Room')} name='Changing Room' onClick={handleCbClick} onChange={handleOnChange} type='checkbox' className='turf_upload_form_input_checkbox' ></input>
                <span className='turf_upload_form_label_span'>Changing Room</span>
            </label>

            </div>
        </div>
    )
}