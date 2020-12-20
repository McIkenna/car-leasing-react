import React from 'react';
import './App.css';

import Dashboard from "./Component/Dashboard"
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Route} from "react-router-dom"
import Header from "./Component/Header/Header"
import ModelItem from './Component/Models/ModelItem';
import VehicleItems from './Component/Vehicles/VehicleItems';
import Vehicles from './Component/Vehicles/Vehicles';
import {Provider} from "react-redux";
import store from "./Store/store"
import UpdateModel from './Component/Models/UpdateModel';
function App() {
  return (
    <Provider store={store}>
    <Router>
    <div className="App">
      <Header />
      
     <Route exact path="/Dashboard" component={Dashboard}/>
     <Route exact path="/Vehicles/:id" component={Vehicles}/>
     <Route exact path="/VehicleItems/:id" component={VehicleItems}/>
     <Route exact path="/ModelItem" component={ModelItem}/>
     <Route exact path="/UpdateModel/:id" component={UpdateModel}/>
    </div>
    </Router>
    </Provider>
  );
}

export default App;
