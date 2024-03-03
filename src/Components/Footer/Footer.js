import { useNavigate } from 'react-router-dom'
import './footerCss.css'

export default function Footer(){

    const navigate = useNavigate();
    function openUploadTurf(){
        navigate('/turfUpload');
    }

    return (
        <div className='footer_container'>
            
            <div className='footer_logo'>
                FOOTER
            </div>
            <div className='footer_business_host' onClick={() => {openUploadTurf()}}>
                HOST YOUR BUSINESS WITH US
            </div>


        </div>
    )
}