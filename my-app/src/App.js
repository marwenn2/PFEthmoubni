import logo from './logo.svg';
import './App.css';
import { Switch, Route } from "react-router-dom"; 
import Navigation from './components/Navigation/Navigation';
import AjoutAnnonce from './components/Annonces/AjoutAnnonce';
import AffichageAnnonce from './components/Annonces/AffichageAnnonce';
import AffichageuneAnnonce from './components/Annonces/Affichageuneannonce';
import 'bootstrap/dist/css/bootstrap.min.css';
<<<<<<< HEAD
import Profile from './components/User/Profile'
=======
import Home from './pages/home';

>>>>>>> 6a44b95b59f01bfb5659be98dc00b62b9f14ced1
import LoginPage  from './pages/login';
import { useEffect, useState } from 'react';
import Footer from './components/Navigation/FooterComponent';

import RegisterPage from './pages/register';



function App() {
  const [isAuth,setIsAuth]= useState(false) ;
  const [token, setToken] = useState(localStorage.getItem("token")) ; 
 
  useEffect(()=>{
    setToken(localStorage.getItem("token"))
     if(token)
     { 
       setIsAuth(true) ; 
     }
    
  },[token])  
  return (
    <div className="App">
      <Navigation isAuth={isAuth} setIsAuth={setIsAuth}/>

      <Switch>
        <Route exact path='/login' 
         render={(props) => (
          <LoginPage {...props} isAuth={isAuth} setIsAuth={setIsAuth} />
        )} />
        <Route exact path ='/register' render={(props)=> (<RegisterPage {...props} isAuth={isAuth} setIsAuth={setIsAuth} />)} />  
        <Route exact path ="/offre" component={AffichageAnnonce}/>
        <Route path ="/profile" component={Profile} />
        <Route exact path ="/posterannonce" component={AjoutAnnonce}/>
        <Route exact path ="/home" component={Home}/>
        <Route path ="/annonce/:id" component={AffichageuneAnnonce}/>
      </Switch>
      
    <Footer/>
      
    </div>
  );
}

export default App;
