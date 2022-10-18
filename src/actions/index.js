import Swal from 'sweetalert2';


const axios = require('axios');
const apikey = '1bc6c554';




export function getMovies(titulo){
    return async function(dispatch){
        try{
            var json = await axios.get(`http://www.omdbapi.com/?apikey=${apikey}&s=${titulo}&page=1`);
            console.log("aqui",json.data)
            return dispatch({
                type: 'GET_MOVIES',
                payload: json.data
            });
        }catch(e){
            console.log(e)
        }    
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        try{
            var json = await axios.get(`http://www.omdbapi.com/?apikey=${apikey}&i=${id}`)
            return  dispatch({
                type: 'GET_DETAIL',
                payload : json.data
            });
        }catch(e){
        console.log(e);
}}};
export function postFavourite(id, body){
    console.log("favor", body)
    return async function(dispatch){
        try{
        var json = await axios.put("https://movies-app-lm.herokuapp.com/favourites/"+id, body);
        Swal.fire({
            text: json.data,
            icon: "success",
            timer:1000
        })   
        return dispatch({
            type: 'POST_FAVOURITE',
            payload : json.data
        });
        }catch(error){
            console.log('aqui',error)
        }
    }
}
export function deleteFavourite(id, body){
    console.log("favor", body)
    return async function(dispatch){
        try{
        var json = await axios.put("https://movies-app-lm.herokuapp.com/favouritesdel/"+id, body);
        Swal.fire({
            text: json.data,
            icon: "success",
            timer: 1000
        })   
        return dispatch({
            type: 'DELETE_FAVOURITE',
            payload : json.data
        });
        }catch(error){
            console.log('aqui',error)
        }
    }
}

export function register(body){
    return async function(){
        try{
            var json = await axios.post("https://movies-app-lm.herokuapp.com/register", body);
            console.log(json.data)
            Swal.fire({
                text: json.data,
                icon: "success",
                timer:1000
            })   
            return true
            
            

        }catch(error){
            let err = JSON.parse(error.request.response)
            Swal.fire({
                text: `Error: `+ err.error,
                icon: "warning",
                confirmButtonText: "Ok",
            });
        }
    }
}
export function login(body){
    return async function(){
        try{
            var json = await axios.post("https://movies-app-lm.herokuapp.com/login", body);
            console.log(json.data)
            Swal.fire({
                text: json.data,
                icon: "success",
                timer: 1000
            })   
            return true
            
            

        }catch(error){
            let err = JSON.parse(error.request.response)
            Swal.fire({
                text: `Error: `+ err.error,
                icon: "warning",
                confirmButtonText: "Ok",
            });
        }
    }
}

export function getUser(body){
    return async function(dispatch){
        try{
            var json = await axios.post("https://movies-app-lm.herokuapp.com/user", body);
            return dispatch({
                type: 'GET_USER',
                payload: json.data
            })
            
        }catch(error){
            console.log(error)
        }
    }
}
export function getUserById(id) {
    return async function (dispatch) {
       try {
          var json = await axios.get("https://movies-app-lm.herokuapp.com/user/" + id);
          return dispatch({
             type: "GET_USER_BY_ID",
             payload: json.data
          })
       } catch (err) {
          console.log(err)
       }
    }
}
export function getFavourites(id) {
    return async function (dispatch) {
       try {
          var json = await axios.get("https://movies-app-lm.herokuapp.com/favourites/" + id);
          return dispatch({
             type: "GET_FAVOURITES",
             payload: json.data
          })
       } catch (err) {
          console.log(err)
       }
    }
}
export function userLogout(){
    return ({
        type: "USER_LOGOUT"
    })
}