import IndexPageImageContainerComponent from "../SubComponents/IndexPageImageContainerComponent";
import IndexPageTurfComponent from "../SubComponents/IndexPageTurfComponent";

export default function IndexPage(){
    return(
       
        <>    
            <div className="index_page_img_container">
                
                <IndexPageImageContainerComponent></IndexPageImageContainerComponent>
                
            </div>

            <div className="index_page_turf_container">
                
                <div className="index_page_turf_container_heading">PLAY AT NEARBY TURF</div>

                <div className="index_page_turf_container_slider">
                               
                    <IndexPageTurfComponent></IndexPageTurfComponent>
                    <IndexPageTurfComponent></IndexPageTurfComponent>
       
                </div>
            </div>
            
        </>
       
    )
}