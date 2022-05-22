import React, {useState, useEffect,useContext} from "react";
import AddLng from "./AddLng";
export default function Language(props){

    const[langs, setLangs]=useState([{id:1,name:'türkçe',code:'tr'}]);
    const[refreshCount,setRefreshCount]=useState(false);
    const[lng,setLng]=useState({id:0,name:'',code:''})
    console.log(langs);
    useEffect(
        ()=>{
    fetch("http://localhost:12263/api/lang")
    .then((res)=>{return res.json()})
    .then((response)=>{setLangs(response);props.setLangsForapp(response)})
        },
        [refreshCount]
    )

    const refreshLang=()=>{
        setRefreshCount(!refreshCount)
    }

    const deleteLng=(id)=>{
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:12263/api/Lang/'+id, requestOptions)
            .then(()=>{
               // alert("kaydedildi");
               refreshLang();
            })
            
    }

    const updateLng=(lng)=>{
        setLng(lng);
    }

    return <div>
        <div>count={props.cnt}</div>
        <div className="row">
            <div className="col-md-6"> {langs.map((lng)=>{
                        return <div key={lng.id}>
                            <button onClick={()=>{deleteLng(lng.id)}} >Delete</button>
                            <button onClick={()=>{updateLng(lng)}} >Update</button>
                            {lng.id} || {lng.code} || {lng.name}
                            </div>
                })}
                    <button onClick={refreshLang}>Refresh</button></div>
            <div className="col-md-4">
                <AddLng cnt={props.cnt} lngToUpdate={lng} refreshFunc={refreshLang} />
            </div>
               
        </div>
    </div> 
}