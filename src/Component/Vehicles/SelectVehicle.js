import React, { Component } from 'react'
import {getVehicle} from "../../Action/vehicleActions"
import {addOrder} from "../../Action/orderActions"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import classes from "./Vehicles.module.css"
import  Modal  from "../UI/Modal/Modal"
import LeaseCal from '../Orders/LeaseCal'
import validator from 'react-validation';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';


const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(value => {
    value.trim().length > 0 && (valid = false);
  });
  // validate the form was filled out
  Object.values(rest).forEach(value => {
    value === null && (valid = false);
  });

  return valid;
};


const numRegex = RegExp(
  /^[0-9\b]+$/
);

class SelectVehicle extends Component {

    constructor(props){
        super(props);       
        this.state = {
        firstName:null,
        lastName: null,
        address:null, 
        creditScore: null, 
        period: null,
        plan: null,
        quantity: null,
        leasePrice: null,
        SSN: null, 
        formErrors: {
          firstName: "",
          lastName: "",
          address:"", 
          creditScore: "", 
          period: "",
          plan: "",
          quantity: "",
        },
        viewAble:false,
        isError: true,
        } 
          this.onChange = this.onChange.bind(this);
          this.onSubmit = this.onSubmit.bind(this);
      
  }

  componentWillReceiveProps(nextProps){
      if(nextProps.errors){
        this.setState({errors: nextProps.errors});
    }
       const {
        makeId,
        vehicleId,
        make,
        model,
        style,
        year,
        trimLevel,
        color,
        odometer,
        regNo,
        carValue,
        period,
        plan,
        leasePrice,
        quantity,
        carImage,
        firstName,
        lastName,
        address, 
        SSN, 
        creditScore,
        file,
        imageName,
        image_preview,
        } = nextProps.vehicle;
     
        this.setState({
        makeId,
        vehicleId,
        make,
        model,
        style,
        year,
        trimLevel,
        color,
        odometer,
        regNo,
        carValue,
        period,
        plan,
        leasePrice,
        quantity,
        carImage,
        firstName,
        lastName,
        address, 
        SSN, 
        creditScore,
        file,
        imageName,
        image_preview,
        });
    }


  componentDidMount(){
      const {makeId, vehicleId} = this.props.match.params;
      this.props.getVehicle(makeId, vehicleId, this.props.history)
  }


 


onChange(e){
  e.preventDefault();
  const { name, value } = e.target;
  //let formErrors = { ...this.state.formErrors }
  const {formErrors} = this.state;

    if(value.length > 0){
      this.setState({isError: false});
     console.log(name)

  }
  
   
  
  switch (name) {
    case "firstName":
      formErrors.firstName =
        value.trim().length < 3 ? "minimum 3 characaters required" : "";
      break;
    case "lastName":
      formErrors.lastName =
      value.trim().length < 3 ? "minimum 3 characaters required" : "";
     
      break;
      case "address":
      formErrors.address =
      value.trim().length < 10 ? "minimum 10 characaters required" : "";
      break;
      case "creditScore":
        formErrors.creditScore = numRegex.test(value) && value.trim().length == 3 && value > 500
        ? ""
        : "invalid credit Score";
      break;
      case "period":
        formErrors.period = numRegex.test(value) && value <=30
        ? ""
        : "invalid period";
        break;
      case "quantity":
        formErrors.quantity = numRegex.test(value) && value <=10
        ? ""
        : "must be a number";
      break;

      case "plan":
        formErrors.plan = value.trim().length == 0 ? "select a plan" : "";
      break;
      default:
        break;
    }

    /*  this.setState({
          [e.target.name] : e.target.value
      })*/

      this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  }
/*
  handleImagePreview = (e) => {
    let image_as_base64 = URL.createObjectURL(e.target.files[0])
    this.setState({
        image_preview: image_as_base64,
        file : e.target.files[0],
        imageName : e.target.files[0].name
    })
}*/


onViewPrice=(e)=>{
  e.preventDefault();
      this.setState({viewAble:true})
    
}

closeViewPrice=(e)=>{
    this.setState(
      {viewAble:false}
      )
}
/*
checkValidality(value, rules){
let isValid = false;
  if(rules.required){
    isValid = value.trim() !== "";
  }

  return isValid;
}
*/

  onSubmit(e){

     e.preventDefault();
     if (formValid(this.state)) {
     const newForm = {
        'style': this.state.style,
        'trimLevel': this.state.trimLevel,
        'color': this.state.color,
        'odometer': this.state.odometer,
        'regNo': this.state.regNo,
        'carValue': this.state.carValue,
        'firstName': this.state.firstName,
        'lastName': this.state.lastName,
        'address': this.state.address,
        'SSN': this.state.SSN,
        'period': this.state.period,
        'plan' : this.state.plan,
        'quantity' : this.state.quantity,
        'creditScore': this.state.creditScore
       
     }
     this.props.addOrder(this.state.makeId, this.state.vehicleId, newForm, this.props.history)
    }else {
      window.alert("Invalid Form")
    }
  }

    render() {

      const { formErrors } = this.state;
      const isEnabled = !formValid(this.state) && this.state.isError;
      
        return (
            
    <div>
        <Modal show={this.state.viewAble} modalClosed={this.closeViewPrice}>
            <LeaseCal 
            style={this.state.style}
            plan = {this.state.plan}
            quantity = {this.state.quantity}
            period = {this.state.period}
            creditScore = {this.state.creditScore}
            carValue = {this.state.carValue}
            />
           <button type="button" className="btn btn-danger" onClick={this.closeViewPrice}>Cancel</button> 
           <button type="submit" className="btn btn-primary" form="vehicle_form">Submit</button>
        </Modal>
       
  <div className={classes.product_card}>
  <div className={classes.badge}>New</div>
  <div className={classes.product_tumb}>
    <img src={this.state.carImage} alt=""/>
  </div>
  <div className={classes.product_details}>
    <span className={classes.product_catagory}>{this.state.make}</span>
    <h4>{this.state.model}</h4>
    <p>{this.state.style}, {this.state.trimLevel}, {this.state.year}, {this.state.color}</p>
    <p>Odometer : {this.state.odometer} miles</p>
    <div className={classes.product_bottom_details}>
      <div className={classes.product_price}><small>Value: </small>${this.state.carValue}</div>
      <div className={classes.product_links}>
      </div>
    </div>
  </div>

  <form onSubmit={this.onSubmit}  id="vehicle_form">
  <div className={classes.floating_wrapper}>
  <div className={classes.floating_label}>
  <label>First-Name*</label>
    <input  className={formErrors.firstName.length > 0 ? classes.floating_input_error : classes.floating_input} 
    
    type="text"  
    name="firstName"
   value={this.state.firstName} 
    onChange={this.onChange} 
    placeholder="Firstname"
     />{formErrors.firstName.length > 0 && (
      <span className={classes.errorMessage}>{formErrors.firstName}</span>
    )}
  
  </div>

  <div className={classes.floating_label}>
  <label>Last-Name*</label>
    <input 
    className={formErrors.lastName.length > 0 ? classes.floating_input_error : classes.floating_input} 
    type="text"
    name="lastName"
    value={this.state.lastName} 
    onChange={this.onChange}  
    placeholder="Lastname"
    />
     {formErrors.lastName.length > 0 && (
                <span className={classes.errorMessage}>{formErrors.lastName}</span>
              )}
    
  </div>

  <div className={classes.floating_label}>
  <label>Address*</label>
    <input className={formErrors.address.length > 0 ? classes.floating_input_error : classes.floating_input} 
    type="text" 
    name="address"
    value={this.state.address} 
    onChange={this.onChange}   
    placeholder="Address"/>
    <span className={classes.input_highlight}></span>
    {formErrors.address.length > 0 && (
                <span className={classes.errorMessage}>{formErrors.address}</span>
              )}

  </div>

  <div className={classes.floating_label}>
  <label>Credit Score*</label>
    <input className={formErrors.creditScore.length > 0 ? classes.floating_input_error : classes.floating_input}  
    type="text" 
    name="creditScore"
    value={this.state.creditScore} 
    onChange={this.onChange}   
    placeholder="Credit Score"/>
     {formErrors.creditScore.length > 0 && (
                <span className={classes.errorMessage}>{formErrors.creditScore}</span>
              )}
 
  </div>

<div className={classes.floating_label}>
    <span className={classes.input_highlight}></span>
    <div className={classes.floating_label}>
    <label>Plan*</label>
    <select className={classes.floating_select} 
    name="plan"
    value={this.state.plan} 
    placeholder="Choose a plan period"
    onChange={this.onChange}   >
      <option value=""></option>
      <option value="Hourly">Hourly</option>
      <option value="Daily">Daily</option>
      <option value="Weekly">Weekly</option>
      <option value="Monthly">Monthly</option>
    </select>
    {formErrors.plan.length > 0 && (
                <span className={classes.errorMessage}>{formErrors.plan}</span>
              )}
 
    
  </div>
</div>

<div className={classes.floating_label}>
<label>Period*</label>
    <input className={formErrors.period.length > 0 ? classes.floating_input_error : classes.floating_input} 
    type="text" 
    name="period"
    value={this.state.period} 
    onChange={this.onChange}    
    placeholder="Period"/>
   {formErrors.period.length > 0 && (
                <span className={classes.errorMessage}>{formErrors.period}</span>
              )}
 

  </div>

<div className={classes.floating_label}>
<label>Quantity*</label>
    <input className={formErrors.quantity.length > 0 ? classes.floating_input_error : classes.floating_input} 
    type="text"
    name="quantity"
    value={this.state.quantity} 
    onChange={this.onChange}  
    placeholder="Quantity"
    />
    {formErrors.quantity.length > 0 && (
                <span className={classes.errorMessage}>{formErrors.quantity}</span>
              )}
 
  </div>
  <button onClick={this.onViewPrice}  className="btn btn-primary" disabled={isEnabled}>Proceed</button>
  </div>
  </form>
</div>
</div>
            
            
        )
    }
}


SelectVehicle.propTypes = {
    addOrder: PropTypes.func.isRequired,
    getVehicle: PropTypes.func.isRequired,
    vehicle: PropTypes.object.isRequired,
    
}

const mapStateToProps = state => ({
    vehicle: state.vehicle.vehicle,
    order: state.order   
})
export default connect(mapStateToProps, {getVehicle, addOrder})(SelectVehicle) 