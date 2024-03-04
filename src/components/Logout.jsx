import React,{useEffect,useContext} from 'react'
import {useNavigate} from "react-router-dom"
import { UserContext } from '../App';
const Logout = () => {
    const {state,dispatch} = useContext(UserContext)
    const navigate = useNavigate();
    useEffect(()=>{
        fetch('/logout', {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }).then((res)=>{
               
                navigate("/Login") 
                dispatch({ type: 'USER', payload: false });
                alert("logout succesfully")
                if(!res.status === 200){
                    const error = new Error(res.error);
                    throw error;
                }
            }).catch((err)=>{
                console.log(err)
            })

    },[])
  
}

export default Logout