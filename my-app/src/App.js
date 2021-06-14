import logo from './logo.svg';
import './App.css';
import { Switch, Route } from "react-router-dom"; 
import Navigation from './components/Navigation/Navigation';
import LoginPage  from './pages/login';
import { useEffect, useState } from 'react';

function App() {
  const [isAuth,setIsAuth]= useState(false) ;
  useEffect(()=>{
    const token = localStorage.getItem("token")
  },[])  
  return (
    <div className="App">
      <Navigation />

      <Switch>
        <Route exact path='/login' component={LoginPage} />
        <Route exact path ='/register' /> 
      </Switch>
      
    </div>
  );
}

export default App;
