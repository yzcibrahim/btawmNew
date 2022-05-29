import logo from './logo.svg';
import './App.css';
import Language from './Language';
import Word from './Words';
import React,{useState, useEffect, useContext, createContext} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './Home';
import AddLng from './AddLng';
import {CountContext} from './Storage';
import UserComponent from './UserComponent';
import Login from './Login';
import Cookies from 'universal-cookie';
import TestWord from './TestWords';

function App() {
 
  const [page,setPage]=useState('langs');
  const [count, setCount]=useState(0);
  const[langs,setLangs]=useState([]);


  const[token,setToken]=useState('');

  useEffect(
    ()=>{
fetch("http://localhost:12263/api/lang")
.then((res)=>{return res.json()})
.then((response)=>{setLangs(response);})

const cookies=new Cookies();
console.log("teokn from cookie:"+cookies.get('tokenCookie'));
setToken(cookies.get('tokenCookie'));


    },
    []
)

const Logout=()=>{
  console.log("logOut");
  setToken('');
  const cookies=new Cookies();
  cookies.set('tokenCookie', '', { path: '/' });
  
}

  return (
    <CountContext.Provider value={[count,setCount]}>
    <Router>
        <div className="container">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/langs">Languages</Link>
            </li>
            <li>
              <Link to="/words">Words</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/test">Test</Link>
            </li>
            
            <li className={token==''?'showElement':'hideElement'}>
              <Link to="/login">Login</Link>
            </li>
            <li className={token!=''?'showElement':'hideElement'}>
              <Link  to="/login" onClick={Logout}>Logout</Link>
            </li>
          </ul>
        </nav>
        {/* <button onClick={()=>{setCount(count+1)}}>arttır</button>
        <button onClick={()=>{setCount(count-1)}}>azalt</button>
        <button onClick={()=>{CountContext.value=5}}>azalt</button> */}
     {/* <div>{count}</div> */}
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/langs" element={<Language setLangsForapp={setLangs} cnt={count} />} />
          <Route path="/words" element={<Word token={token} setLangsForapp={setLangs} langs={langs} cnt={count} />} />
          <Route path="/users" element={<UserComponent token={token} />} /> 
          <Route path="/test" element={<TestWord token={token} />} /> 
          <Route path="/login" element={<Login token={token} setToken={setToken} />} /> 
        

          {/* <Route path="/addlng" element={<AddLng />} /> */}
      </Routes>
        
        
        </div>
    </Router>
    </CountContext.Provider>
  );
}

export default App;
