import React from "react";
import { useState, useEffect } from 'react';
import { login, register, getUser } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import style from './styles/Register.module.css';
import { validation } from './Validation'

export default function Register({closeRegister}){
const dispatch = useDispatch();
const navigate = useNavigate();
const user = useSelector((state) => state.user)

const [focus , setFocus] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
})

const [input, setInput] = useState ({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''    
})    
const [error, setError] = useState({})

function handleChange(name, value){
    
    const newform = { ...input, [name]: value };
    if(typeof value === 'string'){
    setInput(newform);
    const errors = validation(newform);
    setError(errors);
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
    }
    else{
    setInput(input)
    dispatch(register(input))
    delete input.name
    console.log("login", input)
    closeRegister(false)
    setTimeout(function(){
        console.log("Hola Mundo");
        dispatch(login(input))
        dispatch(getUser(input))
    }, 2000);

    }

  }
console.log("input", user?.user?.email)



    return (
        <div className={style.RegisterBackground}>
           <div className={style.RegisterContainer}> 
               <div className={style.CloseBtn}> 
                    <button onClick={() => closeRegister(false)}>X</button>
               </div>     
               <div className={style.login}> 
               <div className={style.title}>
                    <label>Name</label>
                    <input 
                        onFocus={(e) => handleChange(e.target.name , true)}
                        type="text" 
                        value={input.name} 
                        name="name" 
                        placeholder="name..."
                        onChange={(e) => handleChange(e.target.name, e.target.value)}>
                    </input>
                    {focus.name && error.name && <strong style={{color: "red", margin:"10px"}}>{error.name}</strong>}
                </div>
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
                        placeholder="password..."
                        onChange={(e) => handleChange(e.target.name, e.target.value)}>
                    </input>
                    {focus.password && error.password && <strong style={{color: "red", margin:"10px"}}>{error.password}</strong>}
                </div>
                <div className={style.title}>
                    <label>Confirm password</label>
                    <input 
                        onFocus={(e) => handleChange(e.target.name , true)}
                        type="password" 
                        value={input.confirmPassword} 
                        name="confirmPassword" 
                        placeholder="confirm password..."
                        onChange={(e) => handleChange(e.target.name, e.target.value)}>
                    </input>
                    {focus.confirmPassword && error.confirmPassword && <strong style={{color: "red", margin:"10px"}}>{error.confirmPassword}</strong>}
                </div>
              </div>   
              <div className={style.RegisterFooter}>
                    <button onClick={() => closeRegister(false)}>Cancel</button>
                    <button onClick={(e) => handleSubmit(e)}>Submit</button>
              </div>
            
           
          </div>  
        </div>
    )
}