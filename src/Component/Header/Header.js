import React, { Component } from 'react'
import CreateModel from '../Models/CreateModel'
import {Link} from 'react-router-dom'
import logo from "../Images/leaseLogo2.png"


class Header extends Component {


    render() {
   
        return (
        
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
               <Link to="/"><img src={logo} alt="Car Leasing" style={{width: "20%"}}/>
                </Link>
              <div className="collapse navbar-collapse" id="navbarNav">             
                </div>
        </nav>
        )
    }
}




export default Header