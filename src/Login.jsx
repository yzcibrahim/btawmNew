import axios from "axios";
import { useState } from "react";
import { Navigate,useNavigate } from "react-router-dom";

import Cookies from 'universal-cookie';


export default function Login(props){

    let navigate = useNavigate();

    const[user,setUser]=useState({userName:'',password:''});

    const cookies = new Cookies();

    const setVals=(event)=>{
        setUser({...user, [event.target.name]: event.target.value});
    }
    
    const Login=()=>{
        axios.post("http://localhost:44514/api/Account/Authenticate",user)
        .then((res)=>{
        //    console.log(res.data);
            props.setToken(res.data);
           
            cookies.set('tokenCookie', res.data, { path: '/' });
            return navigate('/words');
        })
    }

    

    return <div>
       
    <div>
        userName:<input type='text' name="userName" onChange={setVals} />
    </div>

    <div>
        password:<input type='password' name="password" onChange={setVals} />
    </div>

    <div><button onClick={Login}>Login</button></div>
        
    </div>;
}