import React, { Component } from 'react'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {addVehicle} from "../../Action/vehicleActions";
import PropTypes from "prop-types";

class VehicleItems extends Component {
        constructor(props){
          super(props);
          const {id} = this.props.match.params
      
          this.state = {
          makeId: "",
          vehicleId: "",
          model: "",
          style: "",
          year: "",
          trimLevel: "",
          color: "",
          odometer: null,
          regNo: "",
          carValue:null,
          period: null,
          plan: "",
          leasePrice: null,
          quantity: null,
          carImage: null,
          errors: {}
          } 
            this.onChange = this.onChange.bind(this);
            this.onSubmit = this.onSubmit.bind(this)
    }

  onChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        const newModel = {
            model:this.state.model,
            style:this.state.style,
            year:this.state.year,
            trimLevel:this.state.trimLevel,
            color:this.state.color,
            odometer:this.state.odometer,
            regNo: this.state.regNo,
            carValue:this.state.carValue,
            carImage:this.state.carImage
        }
        this.props.addVehicle(this.state.makeId, newModel, this.props.history)
    }


    render() {

        return (
            <div>
                <form onSubmit={this.onSubmit}>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label>Model</label>
      <input 
      type="text" 
      className="form-control" 
      name="model"
      value={this.state.model} 
      onChange={this.onChange}/>
    </div>
    <div className="form-group col-md-6">
      <label>Style</label>
      <input 
      type="text" 
      className="form-control"
      name="style"
      value={this.state.style}
      onChange={this.onChange}
      />
    </div>
  </div>

  <div className="form-row">
    <div className="form-group col-md-6">
      <label>Year</label>
      <input 
      type="text" 
      className="form-control"
      name="year"
      value={this.state.year}
      onChange = {this.onChange} />
    </div>
    <div className="form-group col-md-6">
      <label>TrimLevel</label>
      <input 
      type="text" 
      className="form-control"
      name="trimLevel"
      value={this.state.trimLevel}
      onChange = {this.onChange}  />
    </div>
  </div>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label>Color</label>
      <input type="text" className="form-control" />
    </div>
    <div className="form-group col-md-6">
      <label>Odometer</label>
      <input 
      type="text" 
      className="form-control"
      name="odometer"
      value={this.state.odometer}
      onChange = {this.onChange} 
      />
    </div>
  </div>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label>Registeration Number</label>
      <input 
      type="text" 
      className="form-control" 
      name="regNo"
      value={this.state.regNo}
      onChange = {this.onChange} 
      />
    </div>
    <div className="form-group col-md-6">
      <label>Car Value</label>
      <input 
      type="text" 
      className="form-control"
      name="carValue"
      value={this.state.carValue}
      onChange = {this.onChange} 
       />
    </div>
  </div>
  <div className="custom-file">
            <input 
            type="file" 
            className="custom-file-input" 
            id="customFile"
            name="carImage"
            value={this.state.carImage}
            onChange = {this.onChange} 
            />
            <label className="custom-file-label" for="customFile">Choose file</label>
            </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
            </div>
        )
    }
}

addVehicle.propTypes = {
  addVehicle: PropTypes.func.isRequired
}

export default connect(null, {addVehicle})(VehicleItems)