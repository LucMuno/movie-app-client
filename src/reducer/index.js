const initialState = {
    movies : [],
    detail: [],
    user: {},
    userFav: {},
    favourites: {}
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_MOVIES':
            return {
                ...state,
                movies: action.payload,
            }
        case 'GET_DETAIL':
            return {
                ...state,
                detail: action.payload
            }    
        case 'POST_FAVOURITE':
            return {
                ...state
            }   
        case 'DELETE_FAVOURITE':
            return {
                ...state
            }       
        case 'LOGIN':
            return{
                ...state,
                
            }  
        case 'GET_USER':
            return{
                ...state,
                user: action.payload
            }  
        case 'GET_USER_BY_ID':
            return{
                ...state,
                userFav: action.payload
            }       
        case 'GET_FAVOURITES':
            return{
                ...state,
                favourites: action.payload
            }       
        case 'USER_LOGOUT':
            return{
                state: undefined,
                user: undefined
            }                       
        default:
        return state;
    }

}


export default rootReducer;