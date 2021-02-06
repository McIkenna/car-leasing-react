import Axios from 'axios';
import React, { Component } from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {login} from "../../Action/securityActions"

import axios from 'axios'

 class Login extends Component {
  constructor(){
    super();
    this.state = {
      username: "",
      password: "",
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this)
  }
  

componentDidMount(){
  if(this.props.security.validToken){
    this.props.history.push("/dashboard");
  }
}

componentWillReceiveProps(nextProps){

  if(nextProps.security.validToken){
    this.props.history.push("/");
  }
  if(nextProps.errors){
    this.setState({errors: nextProps.errors})
  }
}

  onChange(e){
    this.setState({
      [e.target.name] : e.target.value
    })
  }

    onSubmit(e) {
        e.preventDefault();
        const LoginRequest = {
          username: this.state.username,
          password: this.state.password
        };
        this.props.login(LoginRequest);
      
    }
    render() {
     
        return (
        <div>
      <form className="row g-3" onSubmit={this.onSubmit}>
    <div className="col-md-6">
    <label for="inputEmail4" className="form-label">UserName</label>
    <input 
    type="text" 
    className="form-control" 
    id="inputEmail4"
    name="username"
    value={this.state.username}
    onChange ={this.onChange}
    />
  </div>
  <div className="col-md-6">
    <label for="inputPassword4" className="form-label">Password</label>
    <input 
    type="password" 
    className="form-control" 
    id="inputPassword4"
    name="password"
    value={this.state.password}
    onChange ={this.onChange}
    />
  </div>
  <div className="col-12">
    <button type="submit" className="btn btn-primary">Sign in</button>
  </div>
</form>                
            </div>
        )
    }
}
Login.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  security: state.security,
  errors: state.errors
})

export default connect(mapStateToProps, {login})(Login)