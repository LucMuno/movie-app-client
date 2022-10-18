import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Detail from './components/Detail';
import Login from './components/Login';
import Favourites from './components/Favourites';


function App() {
  return (
    
    <div className="App">
      
      <Routes>
        <Route exact path= '/' element= {<Home/>} />
        <Route exact path= '/home' element= {<Home/>} />
        <Route exact path='/detail/:idProduct' element= {<Detail />} />
        <Route exact path= '/login' element= {<Login/>} />
        <Route exact path= '/favourites/:idUser' element= {<Favourites/>} />
      </Routes>
      
    </div>
   
  );
}

export default App;
