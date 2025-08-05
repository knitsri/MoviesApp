import { createContext } from "react";
import { useState,useEffect } from "react";
 
const AuthContext = createContext()

function AuthProvider({children}) {
    const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "";
  });
  const [password, setPassword] = useState(() => {
    return localStorage.getItem("password") || "";
  });

  
   useEffect(() => {
         localStorage.setItem("username",username)
         localStorage.setItem("password",password)
   },[username,password])
   return(
    <AuthContext.Provider value={{username,setUsername,password,setPassword}}>
        {children}
    </AuthContext.Provider>
   )
}

export {AuthContext,AuthProvider}
