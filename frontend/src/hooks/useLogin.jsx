import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = ()=>{
const [error,setError]= useState(null)
const [isLoading,setItLoading] = useState(null)
const {dispatch} = useAuthContext()
const login =async(email,password)=>{
    setItLoading(true)
    setError(null)

    const response =await fetch('http://localhost:8080/api/user/login',{
        method:'POST',
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify({email,password})
    })
    const json =await response.json()
    if(!response.ok){
        setItLoading(false)
        setError(json.err)
    }
    if(response.ok){
        //save user to local storage
        localStorage.setItem('user',JSON.stringify(json))
        window.location.replace("/");
        // update the auth context
        dispatch({type:'LOGIN',payload:json})
        setItLoading(false)
    }
}
return{login,isLoading,error}
}