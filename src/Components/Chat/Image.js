
export default function Image({imageSrc,filename}){
    
    return (
        <img style={{width:"100%",height:"100%",objectFit:"cover"}} src={imageSrc} alt={filename}></img>
    )
}