import logo from './logo.svg';
import './App.css';
import { Switch, Route } from "react-router-dom"; 
import Navigation from './components/Navigation/Navigation';
import LoginPage  from './pages/login';
import { useEffect, useState } from 'react';
import RegisterPage from './pages/register';

function App() {
  const [isAuth,setIsAuth]= useState(false) ;
  const [token, setToken] = useState(localStorage.getItem("token")) ; 
 
  useEffect(()=>{
    setToken(localStorage.getItem("token"))
    // if(token)
    // { console.log(token);
    //   setIsAuth(true) ; 
    //   console.log("is auth",isAuth)
    // }
    
  })  
  return (
    <div className="App">
      <Navigation isAuth={isAuth} setIsAuth={setIsAuth}/>

      <Switch>
        <Route exact path='/login' 
         render={(props) => (
          <LoginPage {...props} isAuth={isAuth} setIsAuth={setIsAuth} />
        )} />
        <Route exact path ='/register' component={RegisterPage} /> 
      </Switch>
      
    </div>
  );
}

export default App;
