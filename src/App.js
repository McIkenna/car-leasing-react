import React from 'react';
import './App.css';

import Dashboard from "./Component/Dashboard"
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Header from "./Component/Header/Header"
import ModelItem from './Component/Models/ModelItem';
import VehicleItems from './Component/Vehicles/VehicleItems';
import Vehicles from './Component/Vehicles/Vehicles';
import {Provider} from "react-redux";
import store from "./Store/store"
import UpdateModel from './Component/Models/UpdateModel';
import UpdateVehicle from './Component/Vehicles/UpdateVehicle';
import SelectVehicle from './Component/Vehicles/SelectVehicle';
import Login from "./Component/Authenticate/Login"
import Register from './Component/Authenticate/Register';
import jwt_decode from "jwt-decode"
import setJwtToken from "./securityUtils/setJwtToken"
import { SET_CURRENT_USER } from './Action/types';
import {logout} from "./Action/securityActions"
import SecuredRoute from "./securityUtils/SecureRoute"


const jwtToken = localStorage.jwtToken

if(jwtToken){
  setJwtToken(jwtToken)
  const decode_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decode_jwtToken
  });

 const currentTime = Date.now()/1000;
  if(decode_jwtToken.exp < currentTime){
    //handle logout
    store.dispatch(logout())
    window.location.href = "/";
   
  }
}

function App() {
  return (
    <Provider store={store}>
    <Router>
    <div className="App">
      <Header />
      {
        //Public
      }
     <Route exact path="/" component={Dashboard}/>
     <Route exact path="/Register" component={Register}/>
     <Route exact path="/Login" component={Login}/>
     <Route exact path="/Vehicles/:id" component={Vehicles}/>
     <Route exact path="/Vehicles/:makeId/:vehicleId" component={SelectVehicle}/>
      {
        //private
      }
      <Switch>
     <SecuredRoute exact path="/VehicleItems/:id" component={VehicleItems}/>
     <SecuredRoute exact path="/ModelItem" component={ModelItem}/>
     <SecuredRoute exact path="/UpdateModel/:id" component={UpdateModel}/>
     <SecuredRoute exact path="/UpdateVehicle/:makeId/:vehicleId" component={UpdateVehicle}/>
     </Switch>
    </div>
    </Router>
    </Provider>
  );
}

export default App;
