import React,{createContext,useEffect,useState} from 'react'
import axios from 'axios'

export const UserContext=createContext({}) //Null at the beginnig


export function UserContextProvider({children}) {
    const [user,setUser] = useState(null);  //define if a user is  logged
    const [auth,setAuth] = useState(false); // like auth and set auth
    useEffect(() => {
      if (!user) {
        axios.get('/profile').then(({data}) => {
          setUser(data);
          setAuth(true);
        });
      }
    }, [user]);
    return (
      <UserContext.Provider value={{user,setUser,auth}}>  {/* pass user and auth state as a global state and setUser function*/}
        {children}
      </UserContext.Provider>
    );
  }

