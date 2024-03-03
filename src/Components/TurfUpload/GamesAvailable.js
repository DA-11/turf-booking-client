import './turfUploadCss.css'

export default function GamesAvailable({selected,onChange}){
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
            <label className='turf_upload_form_label'>Games Available</label>

            <div className='turf_upload_form_label_games'>
                
                <label className='turf_upload_form_checkbox_container'>
                    <input checked={selected.includes('7-A-Side football')} onClick={handleCbClick} onChange={handleOnChange} type='checkbox' name='7-A-Side football' className='turf_upload_form_input_checkbox' ></input>
                    <span className='turf_upload_form_label_span'>7-A-Side Football</span>
                </label>

                <label className='turf_upload_form_checkbox_container'>
                    <input checked={selected.includes('6-A-Side football')} onClick={handleCbClick} onChange={handleOnChange} type='checkbox' name='6-A-Side football' className='turf_upload_form_input_checkbox' ></input>
                    <span className='turf_upload_form_label_span'>6-A-Side Football</span>
                </label>

                <label className='turf_upload_form_checkbox_container'>
                    <input checked={selected.includes('5-A-Side football')} onClick={handleCbClick} onChange={handleOnChange} type='checkbox' name='5-A-Side football' className='turf_upload_form_input_checkbox' ></input>
                    <span className='turf_upload_form_label_span'>5-A-Side Football</span>
                </label>

                <label className='turf_upload_form_checkbox_container'>
                    <input checked={selected.includes('Cricket')} onClick={handleCbClick} onChange={handleOnChange} type='checkbox' name='Cricket' className='turf_upload_form_input_checkbox' ></input>
                    <span className='turf_upload_form_label_span'>Cricket</span>
                </label>
            </div>

        </div>
    )
}