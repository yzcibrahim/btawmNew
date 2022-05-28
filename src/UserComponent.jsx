import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function UserComponent(props){

    const[users,setUsers]=useState([]);
    const[test,setTest]=useState(false);
    const[user,setUser]=useState({userName:'',password:''});
    let navigate=useNavigate();
    useEffect(
        ()=>{
            RefreshUsers();
        },
        [props.token]

    )

    const RefreshUsers=()=>{

        axios.get("http://localhost:44514/api/Account"
        ,{
            headers: {
              'Authorization': "Bearer "+props.token
            }
          }
        )
        .catch((res)=>{
            if(res.response.status==401 || res.response.status==403)
            {
                return navigate("/login");
            }

        })
        .then((res)=>{
            setUsers(res.data);
        })
    }

    const SetUserState=(event)=>{
        // user[event.target.name]=event.target.value;
        // setUser(user);
        // setTest(!test);

        setUser({...user, [event.target.name]: event.target.value});

      //  setUser(prevState=> return [...prevState,word[event.target.name]=event.target.value]);

    }

    const Kaydet=()=>{

        axios.post("http://localhost:44514/api/Account",user
        ,{
            headers: {
              'Authorization': "Bearer "+props.token
            }
          }
        )
        .then(()=>{RefreshUsers()})
    }
    

    return <div>
        
        <div >
        {
            users.map(
                (usr)=>{
                    return <div>{usr.userName}  || {usr.password}</div>
                }
            )
        }
        </div>
        <div className="row">
            <div className="col-md-4">
                <div className="form-group">
                    userName:<input type='text' value={user.userName} name='userName' onChange={SetUserState} />
                </div>
                <div className="form-group">
                    password:<input type='text' value={user.password} name='password' onChange={SetUserState} />
                </div>
                <div><button onClick={Kaydet}>Kaydet</button></div>
            </div>
        </div>


    </div>
}