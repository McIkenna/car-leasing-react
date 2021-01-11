import React, { Component } from 'react'
import {getVehicle} from "../../Action/vehicleActions"
import {addOrder} from "../../Action/orderActions"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import classes from "./Vehicles.module.css"
import  Modal  from "../UI/Modal/Modal"
import LeaseCal from '../Orders/LeaseCal'

class SelectVehicle extends Component {

    constructor(){
        super();       
        this.state = {
        firstName: "",
        lastName: "",
        address:"", 
        creditScore: null, 
        period: null,
        plan: "",
        quantity: null,
        leasePrice: null,
        SSN: null, 
        errors: {},
        viewAble:false
        } 
          this.onChange = this.onChange.bind(this);
          this.onSubmit = this.onSubmit.bind(this)
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
      this.setState({
          [e.target.name] : e.target.value

      })
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
    e.preventDefault();
    this.setState({viewAble:false})
}

checkValidality(value, rules){
let isValid = false;
  if(rules.required){
    isValid = value.trim() !== "";
  }

  return isValid;
}
/*
myFunction() {
    document.getElementById("frm_category").submit();
}
*/
  onSubmit(e){
     e.preventDefault();
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
        'firstName': this.state.firstName,
        'lastName': this.state.lastName,
        'address': this.state.address, 
        'creditScore': this.state.creditScore
       
     }
     this.props.addOrder(this.state.makeId, this.state.vehicleId, newForm, this.props.history)
         
  }

    render() {

        const {errors} = this.state
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
  <label>First-Name</label>
    <input className={classes.floating_input} 
    type="text"  
    name="firstName"
    value={this.state.firstName} 
    onChange={this.onChange} 
    placeholder=""
    
    />
  
  </div>

  <div className={classes.floating_label}>
  <label>Last-Name</label>
    <input 
    className={classes.floating_input} 
    type="text"
    name="lastName"
    value={this.state.lastName} 
    onChange={this.onChange}  
    placeholder=""/>
    <span className={classes.input_highlight}></span>
   
  </div>

  <div className={classes.floating_label}>
  <label>Address</label>
    <input className={classes.floating_input} 
    type="text" 
    name="address"
    value={this.state.address} 
    onChange={this.onChange}   
    placeholder=""/>
    <span className={classes.input_highlight}></span>

  </div>

  <div className={classes.floating_label}>
  <label>Credit Score</label>
    <input className={classes.floating_input} 
    type="text" 
    name="creditScore"
    value={this.state.creditScore} 
    onChange={this.onChange}   
    placeholder=""/>
    <span className={classes.input_highlight}></span>
 
  </div>

<div className={classes.floating_label}>
    <span className={classes.input_highlight}></span>
    <div className={classes.floating_label}>
    <label>Plan</label>
    <select className={classes.floating_select} 
    name="plan"
    value={this.state.plan} 
    onChange={this.onChange}   >
      <option value=""></option>
      <option value="Hourly">Hourly</option>
      <option value="Daily">Daily</option>
      <option value="Weekly">Weekly</option>
      <option value="Monthly">Monthly</option>
    </select>
    <span className={classes.input_highlight}></span>
    
  </div>
</div>

<div className={classes.floating_label}>
<label>Period</label>
    <input className={classes.floating_input} 
    type="text" 
    name="period"
    value={this.state.period} 
    onChange={this.onChange}    
    placeholder=""/>
    <span className={classes.input_highlight}></span>

  </div>

<div className={classes.floating_label}>
<label>Quantity</label>
    <input className={classes.floating_input} 
    type="text"
    name="quantity"
    value={this.state.quantity} 
    onChange={this.onChange}  
    placeholder=""/>
    <span className={classes.input_highlight}></span>
  </div>
  <button onClick={this.onViewPrice}  className="btn btn-primary">Proceed</button>
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
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    vehicle: state.vehicle.vehicle,
    order: state.order,
    errors: state.errors
})
export default connect(mapStateToProps, {getVehicle, addOrder})(SelectVehicle) 