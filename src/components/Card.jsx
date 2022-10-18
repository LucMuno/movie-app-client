import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import style from './styles/Card.module.css';
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineFavorite } from 'react-icons/md'
import { postFavourite, getUserById, getUser, login } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

export default function Card({img, title, year, id}){
const dispatch = useDispatch();    
const user = useSelector((state) => state.user)    
const userFav = useSelector((state) => state.userFav)    
//console.log("id", id, title)  
//console.log("fav", user?.user?.favourites)  


function handleSelectMovie(id,title){
    if(!user?.user){
        Swal.fire({
            text: `User not logged in! `,
            icon: "warning",
            confirmButtonText: "Ok",
        });
    }else{ 
        
        setTimeout(function(){
            
            dispatch(getUserById(user.user.id))
            console.log("title", typeof title)
            
            console.log("userfav", userFav.favourites, title)
        }, 500);
        if(userFav?.favourites!=null || user?.user?.favourites!=null){
            userFav?.favourites ?
            dispatch(postFavourite(user.user.id, [...userFav.favourites, id + "[" + title]))
            : dispatch(postFavourite(user.user.id, [...user.user.favourites, id + "[" + title]))
        }else{
            dispatch(postFavourite(user.user.id, [id + "[" + title])) 
        }
    }
}
//console.log("data", input)
console.log("userFav", userFav)
return(
<div className={style.card}>
    <Link to={'/detail/'+ id}>
    <img src={img} className={style.img} alt="..."/>
    </Link>
    <div className={style.textContainer}>
     <h2 className={style.title}>{title}</h2>
     <div className={style.year}>
        <h2 className={style.text}>Year: {year}</h2>
        <div className={style.heart} key={id}>
            { user?.user?.favourites?.includes(id + "[" + title) || userFav?.favourites?.includes(id + "[" + title) ?
             <MdOutlineFavorite size={25} color={"red"} className={style.redHeart}/>
            : <AiOutlineHeart size={25} className={style.year} value={title} onClick={() => handleSelectMovie(id,title)} />
            }
        </div>
     </div>
    </div>
    
</div>
)
}