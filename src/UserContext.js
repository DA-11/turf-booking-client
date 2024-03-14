import { createContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
export const UserContext = createContext({});

export function UserContextProvider({children}){
    
    const[user,setUser] = useState(null);
    const[game,setGame] = useState(null);

    useEffect(() => {

        if(!user){
            
            axios.get('/user/profile').then((res) => {
                console.log(res.data);
                setUser(res.data);

            }).catch((err) => {
                console.log(err)
            })
        }

    },[])

  
    return (
        <UserContext.Provider value={{user,setUser,game,setGame}}>
            {children}
        </UserContext.Provider>
    )
}