import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { CountContext } from "./Storage";

export default function AddLng(props){

    console.log(props);
    const [cntFromContext,setCntFromContext]=useContext(CountContext)
    const [id,setId]=useState(0);
    const [name,setName]=useState('');
    const [code,setCode]=useState('');
    const Kaydet=()=>{
      //  alert("kaydedilecek"+"name:"+name+" code:"+code);
        let lng={id:id,name:name,code:code};
        console.log(lng);
       
        if(id)
        {
           axios.put('http://localhost:12263/api/Lang/'+id,lng)
           .then(()=>{ props.refreshFunc();})
        }
        else
        {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(lng)
        };
        fetch('http://localhost:12263/api/Lang', requestOptions)
            .then(()=>{
               // alert("kaydedildi");
               console.log(props) ;
               props.refreshFunc();
            })
            
        }

    }

    useEffect(
        ()=>{
    setId(props.lngToUpdate.id);
    setCode(props.lngToUpdate.code);
    setName(props.lngToUpdate.name);
        },[props.lngToUpdate]
    );

    return <div>
            <div className="form-group">
                id:<input value={id}  readOnly className="form-control" type="text" />
            </div>

            <div className="form-group">
                name:<input value={name} onChange={(event)=>{setName(event.target.value)}} className="form-control" type="text" />
            </div>

            <div className="form-group">
                code:<input value={code} onChange={(event)=>{setCode(event.target.value)}} className="form-control" type="text" />
            </div>
                    <div>
                    <button onClick={Kaydet}>Kaydet</button>    
                    </div>
                    <div>count for adlng={ cntFromContext}</div>
                    <button onClick={()=>{setCntFromContext(cntFromContext+2)}}>arttır</button>
         </div>

}