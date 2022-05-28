import axios from "axios";
import React, {Fragment, useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";
import AddWord from "./AddWord";

export default function Word(props){
    console.log(props.langs)
    let navigate=useNavigate();

    const[words,setWords]=useState([]);
    const[expandedRow,setExpandedRow]=useState(-1);
    const[selectedWord,setSelectedWord]=useState({id:0,word:'',languageId:0,meanings:[]});
    const[pageNum,setPageNum]=useState(1);
    const[pageCount,setPageCount]=useState(3);
    const[totalPage,setTotalPage]=useState(0);
    const[keyword,setKeyword]=useState('');
    const refreshWords=()=>{

        // let requestOptions={ 
        //     method: 'get', 
        //     headers: new Headers({
        //         'Authorization': 'Bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Inl6YyIsInJvbGUiOiJhZG1pbiIsIm5iZiI6MTY1MzcyNDg5MSwiZXhwIjoxNjUzNzI4NDkxLCJpYXQiOjE2NTM3MjQ4OTF9.EQ8M8KHdz4xcnOBMcyLMhPzTjA6g3puoO0ERGXS117s'
        //     })
        // }

        // fetch("http://localhost:18647/api/Words",requestOptions)
        // .then((res)=>{return res.json()})
        // .then((reponse)=>setWords(reponse));

        let token='Bearer '+props.token;
        console.log(token);

        
        let pc=pageCount>0?pageCount:3;

        let kw=keyword?keyword:'';

        axios.get("http://localhost:18647/api/Words/"+pageNum+"/"+pc+"/"+kw,
        {
            headers: {
              'Authorization': token
            }
          }
        )
        .catch((res)=>{
            if(res.response.status==401)
            {
                return navigate("/login");
            }

        })
        .then((res)=>{
            setTotalPage(res.data.totalPageCount);
            setWords(res.data.liste);
        
        })

    }

    useEffect(
       // ()=>{refreshWords()}
       refreshWords,
        [props.token,pageNum,pageCount]
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

    const IncreasePageNum=()=>
    {
        if(pageNum<totalPage)
        {
        setPageNum(pageNum+1);
        }
    }
    const DecreasePageNum=()=>
    {
        if(pageNum>1)
        {
            setPageNum(pageNum-1);
        }

    }
    return <div className="row">
        <div className="col-md-6">
            <input type='text' value={keyword} onChange={(event)=>{setKeyword(event.target.value)}} />
            <button onClick={refreshWords}>Ara</button>
            <table className="wordsTable">
                <thead>
                    <tr><th></th><th>Id</th><th>Word</th><th>LngId</th></tr>
                </thead>
                <tbody>
                    {words.map((wrd)=>{
                    return <Fragment>
                        <tr onClick={()=>{toggleDetail(wrd.id)}} className="masterRow" key={wrd.id}>
                        <td><button onClick={()=>deleteWord(wrd.id)}>Delete</button></td>
                                <td>{wrd.id}</td>
                                <td>{wrd.word}</td>
                                <td>{props.langs.filter(c=>c.id===wrd.languageId)[0].name}</td>
                         </tr>
                        <tr  className={wrd.id===expandedRow?"detailRowExpand":"detailRowCollopsed"} key="asd">
                            <td >
                                <table>
                                    <thead><tr><th>Id</th><th>meaning</th><th>lngId</th></tr></thead>
                                    <tbody>
                                    
                                        {wrd.meanings?.map((mnn)=>{
                                            console.log(mnn.langId)
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
                    </Fragment>
                    })}
                </tbody>
            </table>
            <div>
                <button onClick={DecreasePageNum}>Prev</button>
               
                
                {Array.apply(1, Array(totalPage)).map(function (x, i) {
                    return <button onClick={()=>{setPageNum(i+1)}}>{i+1}</button>;
                })}
                 <button onClick={IncreasePageNum}>Next</button>
                
                <input type="text" value={pageCount} onChange={(event)=>{setPageCount(event.target.value);setPageNum(1)}} />
                </div>
        </div>
        <div className="col-md-6">
           <AddWord wordToUpdate={selectedWord} refreshWords={refreshWords} langs={props.langs} />
        </div>
    </div>
}