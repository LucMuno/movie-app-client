import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from './SearchBar';
import Card from './Card';
import style from './styles/Home.module.css';
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { getUserById } from '../actions'

export default function Home(){
const dispatch = useDispatch();
const movies = useSelector((state) => state.movies)
const user = useSelector((state) => state.userFav)
const moviesResult = movies?.Search
console.log("pelis", moviesResult)

useEffect(() => {
    dispatch(getUserById(user?.id))
},[])

return(
    <div>
        
        
        <div className={style.container}>
        <div className={style.searchBar}>    
        <SearchBar/>
        </div>
            <div className={style.cardContainer}>
            {moviesResult?.map((el)=>{
                return (
                    <div className={style.card}>
                            
                            <Card img={el.Poster} title={el.Title} year={el.Year} id={el.imdbID}/>
                            
                    </div>
                )
            })}
            </div>
            </div>
    </div>
)


}    