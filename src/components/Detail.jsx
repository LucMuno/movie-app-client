import React, {useState} from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, postFavourite, getUserById } from "../actions";
import { useEffect } from "react";
import style from './styles/Detail.module.css';
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineFavorite } from 'react-icons/md';
import Swal from 'sweetalert2';

export default function Detail() {
const { idProduct } = useParams();
const [loading, setLoading] = useState(true);
const dispatch =  useDispatch();
const user = useSelector((state) => state.user)    
const userFav = useSelector((state) => state.userFav)   
const Movie = useSelector((state)=> state.detail); 
useEffect(()=>{
    dispatch(getDetail(idProduct)); 
},[dispatch]);
useEffect(() => {
    setTimeout(() => {
        setLoading(false);
    },1500);
},[])
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
const loader = () => {
    return (
        <div className={style.container}>
        <div className={style.header}> 
        <Link to='/home'><button className={style.BackBtn}>BACK TO HOME</button></Link>
        </div>
    <div className={style.loadingContainer}>    
    <h1 className={style.loading}>LOADING...</h1>
    </div>
    </div>
    )
}
console.log("detalles", Movie)

if(loading){
    return (
        loader()
    )
}else{
return(
    <div>
        <div className={style.container}>
            <div className={style.header}> 
                <Link to='/home'><button className={style.BackBtn}>BACK TO HOME</button></Link>
            </div>
            <div>
                <div className={style.movieContainer}>
                    <div>  
                        <img src={Movie?.Poster} class={style.img} alt="..."/>
                    </div> 
                    <div class={style.textContainer}>
                        <h1>{Movie?.Title}</h1>
                        <h2>Year: {Movie?.Year}</h2>
                        <h3>Runtime: {Movie?.Runtime}</h3>
                        <h3>Director: {Movie?.Director}</h3>
                        <h3>Plot: {Movie?.Plot}</h3>
                        <h3>Awards: {Movie?.Awards}</h3>
                        <h3>Actors: {Movie?.Actors}</h3>
                        <div className={style.footer}>
                        <h3>Genre: {Movie?.Genre}</h3>
                        { user?.user?.favourites?.includes(Movie.imdbID + "[" + Movie.Title) || userFav?.favourites?.includes(Movie.imdbID + "[" + Movie.Title) ?
                        <MdOutlineFavorite size={40} color={"red"} className={style.redHeart}/>
                        : <AiOutlineHeart size={40} className={style.heart}  onClick={() => handleSelectMovie(Movie.imdbID,Movie.Title)} />
                        }
                        
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
 }
}
  
