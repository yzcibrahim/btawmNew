import { useContext, useState } from "react";
import { CountContext } from "./Storage";

export default function Home(){

    const [cnt,setCnt] = useContext(CountContext);
    const[deger,setDeger]=useState('asd')
    //var asd="asd";

    const degistir=()=>{
        asd="değişti";
        setDeger(asd);
    }

    return <div>
        <div>var değişken:{asd}</div>
        <button onClick={degistir}> değiştir</button>
    </div>

    // return <div onClick={()=>{setCnt(5)}}>HOme.....{cnt}</div>
}