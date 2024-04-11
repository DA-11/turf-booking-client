import axios from 'axios';
import './turfUploadCss.css'

export default function PhotosUploader({photos,onChange,loading,setLoading}){

    function uploadPhoto(e){
        setLoading(true);

        const files = e.target.files;
        console.log(files);

        const data = new FormData();
        for(let i = 0 ; i < files.length ; i++){
            data.append('file',files[i]);
        }

        console.log(data);
        axios.post('/uploads', data, {
            headers: {'Content-Type':'multipart/form-data'}
        }).then((response) => {
            onChange((prev) => {
                return [...prev,...response.data.photos]
            });

            setLoading(false);
        }).catch((err) => {
            alert(err.data);
            setLoading(false);
        })

        
    }
    

    return (
        <div>
            {!loading && loading === false && (
                <>
                    <label className='turf_upload_form_label'>Photos</label>
                    <input type='file' multiple className='turf_upload_form_input_photos' onChange={uploadPhoto} accept='image/*'></input>      
                </>
            )}

            {loading && loading === true && (
                <div className='loading_container'>
                     <span className='loader'></span>
                    Loading...
                </div>
            )}

           
        
        </div>
    )
}