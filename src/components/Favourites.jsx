import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './styles/Favourites.module.css';
import { Link, useParams } from "react-router-dom";
import { useEffect } from 'react';
import { getFavourites, deleteFavourite, getUserById } from '../actions';
import { BiArrowBack } from 'react-icons/bi'

export default function Favourites(){
const { idUser } = useParams();    
console.log("idUser", idUser)
const dispatch = useDispatch();
const movies = useSelector((state) => state.favourites)
const userFav = useSelector((state) => state.userFav)
useEffect(() => {
    dispatch(getFavourites(idUser))
},[userFav])
console.log("pelifav", movies)
function handleDeleteMovie(id,title){
    dispatch(deleteFavourite(id, movies.favourites.filter(movie => movie!==title)))
    dispatch(getUserById(id))
    
}
return(
    <div>
        
        
        <div className={style.container}>
        <div className={style.header}> 
          <Link to='/home'><button className={style.Backbtn} ><BiArrowBack size={30} color={"white"} />BACK</button></Link>
          <h3>Favourites</h3>
          <h3 className={style.name}>{movies?.name}</h3>
        </div>
            <div>
           
                
                    <div className={style.card}>
                        {
                            movies?.favourites?.map((el) => {
                            return (
                            <div className={style.movieContainer}>        
                               <Link to={'/detail/' + el.split("[")[0]} style={{textDecoration:"none", color:"black" }}>
                                 <div>
                                   <p className={style.movie}>{el.split("[")[1]}</p>
                                 </div>
                               </Link>
                               <div>    
                                 <button className={style.deleteBtn} onClick={() => 
                                  handleDeleteMovie(idUser,el)}>X</button>
                               </div>
                            </div>
                            )
                            })
                        }    
                    </div>
                
            
            </div>
            </div>
    </div>
)
}        