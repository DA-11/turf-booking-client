import { useEffect, useState } from "react"
import './indexPageCss.css'
export default function ImageSilder({photos = []}){
    
    let i = 0;
    const[currentIdx,setCurrentIdx] = useState(0);
    
    // const[photoSrc,setPhotoSrc] = useState(photos[0]);
    
    function changeSliderIdx(increment){
        let idx = (currentIdx + increment) % photos.length;
        
        setCurrentIdx(idx);
        // setPhotoSrc(photos[Math.abs(currentIdx)]);
    }

    return (
        <> 
            {photos && photos.length > 1 && (
                <div className="turfInfo_Container_image_slider_container_arrow" onClick={() => {changeSliderIdx(-1)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="image_slider_arrow_left" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </div>
            
            )}

            {/* {currentIdx && ( 
                <img src={photos[Math.abs(currentIdx === null ? 0 : currentIdx)]} className="turfInfo_Container_image_slider_container_img"></img>
             )} */}

            {photos && ( 
                <img src={photos[Math.abs(currentIdx)]} className="turfInfo_Container_image_slider_container_img"></img>
            )}

            {photos && photos.length === 0 && <img src="https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg" className="turfInfo_Container_image_slider_container_img"></img>} 

            
            {photos && photos.length > 1 && (
            <div className="turfInfo_Container_image_slider_container_arrow" onClick={() => {changeSliderIdx(1)}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="image_slider_arrow_right">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
            </div>
              )}
            
        </>
    )
}