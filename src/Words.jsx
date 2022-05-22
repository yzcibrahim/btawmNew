import axios from "axios";
import React, {useEffect, useState} from "react"
import AddWord from "./AddWord";

export default function Word(props){
    console.log(props.langs)

    const[words,setWords]=useState([]);
    const[expandedRow,setExpandedRow]=useState(-1);
    const[selectedWord,setSelectedWord]=useState({id:0,word:'',languageId:0,meanings:[]});
    const refreshWords=()=>{
        fetch("http://localhost:18647/api/Words")
        .then((res)=>{return res.json()})
        .then((reponse)=>setWords(reponse));

    }

    useEffect(
       // ()=>{refreshWords()}
       refreshWords,
        []
    );

    const deleteWord=(id)=>{
        axios.delete("http://localhost:18647/api/Words/"+id)
        .catch(function (error) {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            }
          })
        .then((res)=>{
            console.log("then executed:"+res);
            refreshWords();
        })
    }

    const toggleDetail=(id)=>{
        setSelectedWord(words.filter(c=>c.id===id)[0]);
        console.log(id)
        if(id===expandedRow)
        {
            setExpandedRow(-1);
        }
        else
        setExpandedRow(id);
       // console.log(expandedRow);
       
    }

    return <div className="row">
        <div className="col-md-6">
            <table className="wordsTable">
                <thead>
                    <tr><th></th><th>Id</th><th>Word</th><th>LngId</th></tr>
                </thead>
                <tbody>
                    {words.map((wrd)=>{
                    return [<tr onClick={()=>{toggleDetail(wrd.id)}} className="masterRow" key={wrd.id}>
                        <td><button onClick={()=>deleteWord(wrd.id)}>Delete</button></td>
                                <td>{wrd.id}</td>
                                <td>{wrd.word}</td>
                                <td>{props.langs.filter(c=>c.id===wrd.languageId)[0].name}</td>
                         </tr>,
                        <tr  className={wrd.id===expandedRow?"detailRowExpand":"detailRowCollopsed"} key="asd">
                            <td >
                                <table>
                                    <thead><tr><th>Id</th><th>meaning</th><th>lngId</th></tr></thead>
                                    <tbody>
                                        {wrd.meanings?.map((mnn)=>{
                                            return <tr>
                                            <td>{mnn.id}</td>
                                            <td>{mnn.meaning}</td>
                                            <td>{props.langs.filter(c=>c.id===mnn.langId)[0].name}</td>
                                            
                                            </tr>
                                        })}
                                       
                                        </tbody>
                                </table>
                            </td>
                    </tr>
                    ]
                    })}
                </tbody>
            </table>
        </div>
        <div className="col-md-6">
           <AddWord wordToUpdate={selectedWord} refreshWords={refreshWords} langs={props.langs} />
        </div>
    </div>
}