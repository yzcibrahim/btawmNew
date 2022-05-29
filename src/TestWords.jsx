import axios from "axios";
import { useEffect, useState } from "react"

export default function TestWord(props){
    const[answer,setAnswer]=useState('');
    const[question,SetQuestion]=useState('');
    const[testCount,setTestCount]=useState(0);
    useEffect(
        ()=>{
            console.log("start");
            axios.get("http://localhost:18647/api/Words/getRandom/1")
            .then((res)=>{
                SetQuestion(res.data);
            })
        }
        ,[]

    );
    

    const SubmitAnswer=()=>{

        // if(question.meanings.filter(c=>c.meaning===answer).length>0)
        // {
        //     alert("doğru");
        // }
        // else{
        //     alert("yanlış");
        // }
        let token='Bearer '+props.token;

        axios.get("http://localhost:18647/api/Words/CheckAnswer/"+answer+"/"+question.id+"/"+testCount,
        {
            headers: {
                'Authorization': token
              }
        }
        )
            .then((res)=>{
                setTestCount(testCount+1);
                if(res.data.result==true)
                {
                    alert("Doğru")
                }
                else
                {
                    alert("yanlış")
                }
                SetQuestion(res.data.wordDef);
            })

    }


    return <div>
       <div className="row">
            {question.word}
       </div>
       <div className="row">
           <input type="text" value={answer} onChange={(event)=>{setAnswer(event.target.value)}}  />
       </div>
       <div className="row">
           <button onClick={SubmitAnswer}>Submit</button>
       </div>
    </div>

}