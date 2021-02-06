import React, { Component } from 'react'
import {addCustomer} from "../../Action/customeActions"
import {connect} from "react-redux"
import PropTypes from "prop-types"

class Register extends Component {

    constructor(){
        super()
        this.state = {
            firstName: "",
            lastName: "",
            address: "",
            email:"",
            phone: "",
            password: "",
            city: "",
            state: "",
            zip: "",
            errors: {}

        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.errors){
            return {errors: nextProps.errors};
        }
        else return null;
    }

   componentDidUpdate(prevProps, prevState){
        if(prevProps.error){
            this.setState({errors: prevProps.errors});
        }
    }

    onChange= (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();

        const RegForm = {
            firstName: this.state.firstName,
            lastName : this.state.lastName,
            address: this.state.address,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip

        }
        this.props.addCustomer(RegForm, this.props.history)
    }
    render() {
        return (
            <div>
    <form className="row g-3" onSubmit={this.onSubmit}>
    <div className="col-md-6">
    <label for="inputName" className="form-label">FirstName</label>
    <input 
    type="text" 
    className="form-control" 
    name="firstName"
    value={this.state.firstName}
    onChange={this.onChange}/>
  </div>
  <div className="col-md-6">
    <label for="inputName" className="form-label">LastName</label>
    <input  type="text" className="form-control" id="inputName"
    name="lastName"
    value={this.state.lastName}
    onChange={this.onChange}/>
  </div>
  <div className="col-md-6">
    <label for="inputEmail4" className="form-label">Email</label>
    <input  type="text"  className="form-control" id="inputEmail4"
    name="email"
    value={this.state.email}
    onChange={this.onChange}/>
  </div>
  <div className="col-md-6">
    <label  className="form-label">Phone Number</label>
    <input  type="text" className="form-control" 
    name="phone"
    value={this.state.phone}
    onChange={this.onChange}
    />
  </div>
  <div className="col-md-6">
    <label for="inputPassword2" className="form-label">Password</label>
    <input  type="text" className="form-control" id="inputPassword2"
    name="password"
    value={this.state.password}
    onChange={this.onChange}/>
  </div>
  <div className="col-12">
    <label for="inputAddress" className="form-label">Address</label>
    <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"
    name="address"
    onChange={this.onChange}
    value={this.state.address}
    />
  </div>
  <div className="col-md-6">
    <label for="inputCity" className="form-label">City</label>
    <input type="text" className="form-control" id="inputCity"
    name="city"
    value={this.state.city}
    onChange={this.onChange}/>
  </div>
  <div className="col-md-4">
    <label for="inputState" className="form-label">State</label>
    <input type="text" className="form-control" id="inputState"
    name="state"
    value= {this.state.state}
    onChange={this.onChange}/>
  </div>
  <div className="col-md-2">
    <label for="inputZip" className="form-label">Zip</label>
    <input type="text" className="form-control" id="inputZip"
    name="zip"
    value={this.state.zip}
    onChange={this.onChange} />
  </div>
  <div className="col-12">
    <button type="submit" className="btn btn-primary">Submit</button>
  </div>
</form>
            </div>
        )
    }
}

addCustomer.propTypes = {
    addCustomer: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    errors: state.errors
})


export default connect(mapStateToProps, {addCustomer})(Register)