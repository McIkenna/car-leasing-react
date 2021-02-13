import React, { Component } from 'react'
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {getVehicle, updateVehicle} from "../../Action/vehicleActions"
import PropTypes from "prop-types"
import classes from "./Vehicles.module.css"

class UpdateVehicle extends Component {

    constructor(){
        super();       
        this.state = {
        makeId: "",
        vehicleId: "",
        make: "",
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
        carImage: "",
        file: null,
        imageName: "",
        image_preview: '',
        errors: {}
        } 
          this.onChange = this.onChange.bind(this);
          this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps){
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
        file,
        imageName,
        image_preview,
        errors
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
        file,
        imageName,
        image_preview,
        errors
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

  handleImagePreview = (e) => {
    let image_as_base64 = URL.createObjectURL(e.target.files[0])
    this.setState({
        image_preview: image_as_base64,
        file : e.target.files[0],
        imageName : e.target.files[0].name
    })
}

  onSubmit(e){
      e.preventDefault();
      const formData = new FormData()
      formData.append('file', this.state.file);
      formData.append('makeId', this.state.makeId)
      formData.append('vehicleId', this.state.vehicleId)
      formData.append('make', this.state.make)
      formData.append('model', this.state.model)
      formData.append('style', this.state.style)
      formData.append('year',this.state.year)
      formData.append('trimLevel',this.state.trimLevel)
      formData.append('color', this.state.color)
      formData.append('odometer',this.state.odometer)
      formData.append('regNo', this.state.regNo)
      formData.append('carValue', this.state.carValue)
      formData.append('carImage', this.state.carImage)
      this.props.updateVehicle(this.state.makeId, this.state.vehicleId, formData, this.props.history)
      //console.log(this.state.makeId, this.state.vehicleId)
  }

    render() {
        const {errors} = this.state;
        return (
            <div>
                <Link to={`/Vehicles/${this.state.makeId}`} type="button" class="btn btn-outline-dark">Go Back</Link>

                <form onSubmit={this.onSubmit}>
                <img src={this.state.carImage} className={classes.form_img_preview1}/>
                <img src={this.state.image_preview} className={classes.form_img_preview1}/>
                <div className="form-row">
            <div className="form-group col-md-3">
            <label>Make</label>
            <input 
            type="text" 
            className="form-control" 
            name="make"
            value={this.state.make} 
            disabled
            />
            </div>
                    <div className="form-group col-md-3">
                    <label>Model</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    name="model"
                    value={this.state.model} 
                    onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-3">
                    <label>Style</label>
                <select 
                className="form-control"
                name="style" onChange={this.onChange} value={this.state.style}>
                <option value="">Select Style</option>
                <option value="SUV">SUV</option>
                <option value="BUS">BUS</option>
                <option value="VAN">VAN</option>
                <option value="TRUCK">TRUCK</option>
                </select>
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
                    <input type="text" 
                    className="form-control"
                    name="color"
                   value={this.state.color}
                    onChange = {this.onChange}  />
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
                            name="file"
                            onChange = {this.handleImagePreview} 
                            />
                            <label className="custom-file-label" for="customFile">{this.state.imageName}</label>
                            </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

UpdateVehicle.propTypes = {
    getVehicle: PropTypes.func.isRequired,
    updateVehicle: PropTypes.func.isRequired,
    vehicle: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    vehicle: state.vehicle.vehicle,
    errors: state.errors
})
export default connect(mapStateToProps, {getVehicle, updateVehicle})(UpdateVehicle)