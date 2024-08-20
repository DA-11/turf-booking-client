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

    function removePhoto(filename,e){
        e.preventDefault();
        onChange([...photos.filter((photo) => photo !== filename)])
    }

    function selectAsMainPhoto(filename,e){
        e.preventDefault();
        onChange([filename,...photos.filter((photo) => photo !== filename)]);
    }
    

    return (
        <div>
            {!loading && loading === false && (
                <>
                    <label className='turf_upload_form_label'>Photos
                    <div className='upload_icon_container'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="upload_turf_icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                        </svg>
                        <input type='file' multiple className='turf_upload_form_input_photos' onChange={uploadPhoto} accept='image/*'></input>      
                    </div>
                    </label>
                </>
            )}

            <div className='uploaded_images_container_box'>
                {photos && photos.length > 0 && photos.map(link => {
                    return (
                        <div className="uploaded_images_container" key={link}>
                            <img className="uploaded_image" src={link} src="image"></img>
                            <button onClick={(e) => removePhoto(link,e)} className="remove_uploaded_photo">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="remove_photo_icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <button onClick={(e) => selectAsMainPhoto(link,e)} className="make_uploaded_photo_main">
                                {link === photos[0] && (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                    </svg>
                                )}
                                {link !== photos[0] && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                    </svg>
                                    
                                )}
                            </button>
                        </div>
                    )}
                )}
            </div>


            {loading && loading === true && (
                <div className='loading_container'>
                     <span className='loader'></span>
                    Loading...
                </div>
            )}

           
        
        </div>
    )
}
