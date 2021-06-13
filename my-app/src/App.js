import logo from './logo.svg';
import './App.css';
import { Switch, Route } from "react-router-dom"; 
import Navigation from './components/Navigation/Navigation';

function App() {
  return (
    <div className="App">
      <Navigation />

      <Switch>
        <Route exact path='/login' />
      </Switch>
      
    </div>
  );
}

export default App;
