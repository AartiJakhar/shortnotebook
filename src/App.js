// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Onclick/Login';
import Signup from './components/Onclick/Signup';
import Template from './components/Template';
function App() {
  const [alert, setAlert] = useState(null)    
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  return (
    <>
    <NoteState>
    <Router>
      <Navbar/>
      <Alert alert={alert}/>
      <div className='container'>
     <Routes>
      <Route exact path='/about' element={<Template/>} />
      <Route exact path='/login' element={<Login showAlert={showAlert}/>} />
      <Route exact path='/signup' element={<Signup showAlert={showAlert}/>} />
      <Route exact path='/' element={<Home showAlert={showAlert}/>} />
      </Routes>

      </div>
    </Router>
      
    </NoteState>
    
    </>
  );
}

export default App;
