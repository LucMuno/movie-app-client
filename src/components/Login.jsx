import React from "react";
import { useState, useEffect } from 'react';
import { login, getUser, getUserById } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import style from './styles/Login.module.css';
import Register from './Register';
import { validation } from './Validation'

export default function Login({closeLogin}){
const dispatch = useDispatch();
const [openRegister, setOpenRegister] = useState(false);
const navigate = useNavigate();
const user = useSelector((state) => state.user)
const [input, setInput] = useState ({
    email: '',
    password: ''
   
        
})    
const [focus , setFocus] = useState({
     email: false,
    password: false
    
})
const [error, setError] = useState({})
function handleChange(name, value){
    
    const newform = { ...input, [name]: value };
    if(typeof value === 'string'){
    setInput(newform);
    const errors = validation(newform);
    setError(errors);
    console.log(errors)
    } 
    else{
    setFocus({ ...focus, [name]: value })
    }
    return newform;
  }

function handleSubmit(e){
    e.preventDefault()
    
    if(Object.keys(error).length){
      console.log(error)
      Swal.fire({
        text: `Incorrect data, please verify that the data entered is correct`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }else{
    setInput(input)
    
        dispatch(login(input))
        dispatch(getUser(input))
        dispatch(getUserById(user.user.id))
    }

  }
console.log("inputLogin", user?.user?.email)



    return (
        <div className={style.LoginBackground}>
           <div className={style.LoginContainer}> 
               <div className={style.CloseBtn}> 
                    <button onClick={() => closeLogin(false)}>X</button>
               </div>     
               <div className={style.login}> 
                <div className={style.title}>
                    <label>e-mail</label>
                    <input 
                        onFocus={(e) => handleChange(e.target.name , true)}
                        type="email" 
                        value={input.email} 
                        name="email" 
                        placeholder="email..."
                        onChange={(e) => handleChange(e.target.name, e.target.value)}>
                    </input>
                    {focus.email && error.email && <strong style={{color: "red", margin:"10px"}}>{error.email}</strong>}
                </div>
                <div className={style.title}>
                    <label>password</label>
                    <input 
                        onFocus={(e) => handleChange(e.target.name , true)}
                        type="password" 
                        value={input.password} 
                        name="password" 
                        placeholder="passsword..."
                        onChange={(e) => handleChange(e.target.name, e.target.value)}>
                    </input>
                    {focus.password && error.password && <strong style={{color: "red", margin:"10px"}}>{error.password}</strong>}
                </div>
              </div>   
              <div className={style.LoginFooter}>
                    <button onClick={() => closeLogin(false)}>Cancel</button>
                    <button onClick={(e) => handleSubmit(e)}>Submit</button>
              </div>
            <div className={style.Register}>
                <h4>Don't have an account?</h4>
            </div>
            <div className={style.LoginFooter}>
                <button onClick={() => setOpenRegister(true)}>Sign in</button>
            </div>
            {
                 user?.user?.email ?
                 closeLogin(false) :
                 <span>{user?.email}</span>
                
            }
          </div>  
          {openRegister && <Register closeRegister={setOpenRegister} />}
        </div>
    )
}