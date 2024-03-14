
export default function Image({imageSrc,filename}){
    
    return (
        <img style={{width:"full",height:"auto"}} src={imageSrc} alt={filename}></img>
    )
}