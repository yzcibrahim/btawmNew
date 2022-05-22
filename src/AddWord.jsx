import axios from "axios";
import { useEffect, useState } from "react";

export default function AddWord(props){

    const [word,setWord]=useState({id:0,word:'',languageId:0,meanings:[]})
    const[change,setChange]=useState(false);
    const[meaningToAdd,setMeaningToAdd]=useState({id:0,meaning:'',langId:0})
    const Kaydet=()=>{
       console.log(word);
       if(!word.id)
       {
       axios.post("http://localhost:18647/api/words",word)
       .then(()=>{alert("kaydedildi");props.refreshWords()})
       }
       else
       {
           axios.put("http://localhost:18647/api/words/"+word.id,word)
           .then(()=>{alert("kaydedildi");props.refreshWords()})
       }
    }

    useEffect(()=>{
       
        setWord(props.wordToUpdate);
    },
    [props.wordToUpdate])

    const setVals=(event)=>{
        console.log(event.target.name+":"+event.target.value);

        word[event.target.name]=event.target.value;
       // setWord(prevState=>setWord[...prevState,word[event.target.name]=event.target.value]);
        setChange(!change);
        console.log(word);

    }

    const AddMeaning=()=>{

        word.meanings.push(meaningToAdd);
        setMeaningToAdd({id:0,meaning:'',langId:0})
        setChange(!change);
    }

    const deleteMeaning=(meaning)=>{
        if(!meaning.id)
        {
            word.meanings=word.meanings.filter(c=>c.meaning!=meaning.meaning || c.langId!=meaning.langId);
        //   let filteredMeanings=word.meanings.filter(c=>meaning!==meaning.meaning);
        //console.log(word.meanings.filter(c=>c.meaning!=meaning.meaning || c.langId!=meaning.langId))
            setWord(word);
            setChange(!change);
        }
        else
        {
            axios.delete("http://localhost:18647/api/Words/meaning/"+meaning.id)
            .then((res)=>{
                word.meanings=word.meanings.filter(c=>c.id!==meaning.id);
                setWord(word);
                setChange(!change);
            })
            
        }
    }

    const ChangeMeaningVals=(event)=>{
        meaningToAdd[event.target.name]=event.target.value;
        setChange(!change);
    }

    return <div className="row">
        <div className="row">
        <div className="col-md-6">
        <div className="form-group">
            id:<input readOnly name="id" value={word.id} onChange={setVals} className="form-control" type='text' />
        </div>
        <div className="form-group">
            Word:<input name="word" value={word.word} onChange={setVals} className="form-control" type='text' />
        </div>
        <div className="form-group">
            Lang:<select name="languageId" value={word.languageId} onChange={setVals} className="form-control">
            <option value={0}>Seçiniz</option>
                {
                    props.langs.map((lng)=>{
                        return  <option value={lng.id}>{lng.name}</option>
                    })
                }
                </select>
        </div>
        </div>
        <div className="col-md-6">
            
            <div className="row">
                        <div className="form-group">
                            id:<input readOnly onChange={ChangeMeaningVals} value={meaningToAdd.id} type="text" name="id" className="form-control" />
                        </div>
                        <div className="form-group">
                            meaning:<input onChange={ChangeMeaningVals} value={meaningToAdd.meaning} type="text" name="meaning" className="form-control" />
                        </div>
                        <div className="form-group">
                                Lang:<select onChange={ChangeMeaningVals} value={meaningToAdd.langId} name="langId"  className="form-control">
                                <option value={0}>Seçiniz</option>
                                    {
                                        props.langs.map((lng)=>{
                                            return  <option value={lng.id}>{lng.name}</option>
                                        })
                                    }
                </select>
        </div>
        <button onClick={AddMeaning}>Add meaning</button>
                    </div>
        </div>
</div>
<div className="row">
    <div className="col-md-6">
        {word.meanings.map((mm)=>{
            return <div> <button onClick={()=>{deleteMeaning(mm)}}>delete</button>  {mm.id} || {mm.meaning} || {mm.langId} </div>
        })}
    </div>
</div>

        <div>
            <button onClick={Kaydet}>Kaydet</button>
        </div>

    </div>
}