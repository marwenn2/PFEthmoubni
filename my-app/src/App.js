import logo from './logo.svg';
import './App.css';
import { Switch, Route } from "react-router-dom"; 
import Navigation from './components/Navigation/Navigation';
import AjoutAnnonce from './components/Annonces/AjoutAnnonce';
import AffichageAnnonce from './components/Annonces/AffichageAnnonce';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
      <Navigation />

      <Switch>
        <Route exact path='/login' />
      </Switch>
      <AjoutAnnonce/>
      <AffichageAnnonce/>
    </div>
  );
}

export default App;
