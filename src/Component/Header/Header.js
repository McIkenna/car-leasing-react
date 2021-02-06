import React, { Component } from 'react'
import CreateModel from '../Models/CreateModel'
import {Link} from 'react-router-dom'
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {logout} from "../../Action/securityActions"

class Header extends Component {
    logout=()=>{
        this.props.logout();
        window.location.href = "/";
    }

    render() {
        const {validToken, user} = this.props.security;
        const userIsAuthenticated = (

    <ul className="navbar-nav">
            <li className="nav-item">
                <Link className="nav-link" to="/"><i className="fas fa-user-circle mr-1" />{user.sub}</Link>
            </li>
            <li className="nav-item">
                <Link 
                className="nav-link" 
                to="/logout"  
                onClick={this.logout.bind(this)}>
                    Logout 
                </Link>
            </li>
            <li className="nav-item">
            <CreateModel />
            </li>
            </ul>
            
        )
        const userIsNotAuthenticated = (
        <div>
            <li className="nav-item">
                <Link className="nav-link" to="/Login">Login</Link>
            </li>
            </div>
        )

        let headerLinks;
        if(validToken && user){
            headerLinks = userIsAuthenticated
        }else{
            headerLinks = userIsNotAuthenticated;
        }


        return (
        
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="#">Car Leasing</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" 
            data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/Vehicles">Features</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#">Pricing</Link>
                </li>
                {headerLinks}
                </ul>
                </div>
        </nav>
        )
    }
}

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    security: state.security
})

export default connect(mapStateToProps, {logout})(Header)