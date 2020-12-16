import React, { Component } from 'react'
import CreateModel from '../Models/CreateModel'
import {Link} from 'react-router-dom'
import CreateVehicleButton from '../Vehicles/CreateVehicleButton'
class Header extends Component {
    render() {
        return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="#">Logo Name</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
            <li className="nav-item active">
                <Link className="nav-link" to="/Dashboard">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/Vehicles">Features</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="#">Pricing</Link>
            </li>
            <li className="nav-item">
            <CreateModel />
            </li>
            <li className="nav-item">
           <CreateVehicleButton />
            </li>
            </ul>
        </div>
        </nav>
       
        )
    }
}

export default Header