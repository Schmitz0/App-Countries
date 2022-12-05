import './App.css';
import Home from './components/Home/Home'
import LandingPage from './components/Home/Landing';
import { Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar'
import CreateActivity from './components/CreateActivity/CreateActivity';
import CountryDetail from './components/CountryDetail/CountryDetail';
import Activities from './components/Activities/Activities'
import UpdateAct from './components/UpdateAct/UpdateAct'


function App() {
  return (
    <div className="App">
      <Route exact path={'/'} component = {LandingPage}/>
      <Route path={'/home'} component ={NavBar}/>
      <Route exact path={'/home'} component ={Home}/>
      <Route exact path={'/home/newactivities'} component ={CreateActivity}/>
      <Route exact path={'/home/countries/:id'} component ={CountryDetail}/>
      <Route exact path={'/home/activities'} component ={Activities}/>
      <Route exact path={'/home/updateActivity/:id'} component ={UpdateAct}/>
    </div>
  );
}

export default App;
