import { useContext } from "react";
import { CountContext } from "./Storage";

export default function Home(){

    const [cnt,setCnt] = useContext(CountContext);
    return <div onClick={()=>{setCnt(5)}}>HOme.....{cnt}</div>
}