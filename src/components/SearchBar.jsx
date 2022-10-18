import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies, userLogout } from '../actions';
import style from './styles/NavBar.module.css';
import Logo from './styles/icons8-movie-64.png';
import { MdLogin } from 'react-icons/md';
import { MdLogout } from 'react-icons/md';
import { MdFavorite } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Login from './Login';

export default function SearchBar(){
const [openLogin, setOpenLogin] = useState(false);
const user = useSelector((state) => state.user)
const dispatch= useDispatch();
const movies = useSelector((state) => state.movies)
const [name, setName] = useState('')    
console.log(movies)

function handleInputChange(e){
    e.preventDefault()
    setName(e.target.value)
}

function handleSubmit(e){
    e.preventDefault()
    if (name !== ""){
        dispatch(getMovies(name));
        setName("");
    } else {
        alert("Input a correct name");
    };

}
function handleLogout(){
 dispatch(userLogout())
}
console.log("userSearch", user?.user?.name)
console.log("userId", user?.user?.id)
var ID = user?.user?.id
console.log("ID", ID)
return(
<nav className={style.nav}>
  <div className={style.img}>
   <img src={Logo} size={20}></img>
  </div>
  <div class="container-fluid">
    <form class="d-flex" role="search">
      <input 
      class="form-control me-2" 
      type="search" 
      placeholder="Search" 
      aria-label="Search"
      onChange={(e) => handleInputChange(e)}
      />
      <button class="btn btn-outline-success" type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
    </form>
  </div>
    <div>
        {user?.user?.name ?
         <div className={style.LoginContainer}>
          <Link to={'/favourites/'+ user.user.id}>
          <MdFavorite size={30} color={"white"}/>
          </Link>
          <button className={style.LoginBtn} onClick={() => {handleLogout()}}>
        <MdLogout size={30} color={"white"} />Logout</button>
        </div> 
        :
        <div>
        <button className={style.LoginBtn} onClick={() => {setOpenLogin(true)}}>
          <MdLogin size={30} color={"white"} />Login</button>
        </div>  
        }  
      
     
    </div>
    <div>
      {user?.user?.email && <span className={style.username}>{user.user.name}</span>}
    </div>
    {openLogin && <Login closeLogin={setOpenLogin} />}
</nav>
)
}    