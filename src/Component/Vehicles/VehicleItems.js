import React, { Component } from 'react'
import {connect} from "react-redux";
import {addVehicle} from "../../Action/vehicleActions";
import PropTypes from "prop-types";
import classes from "./Vehicles.module.css"

import {getModel} from "../../Action/modelActions"

class VehicleItems extends Component {
        constructor(props){
          super(props);
          const {id} = this.props.match.params;
          
      
          this.state = {
          makeId: id,
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
        let formData = new FormData()
        formData.append('file', this.state.file);
        formData.append('model', this.state.model,)
        formData.append('style', this.state.style)
        formData.append('year',this.state.year)
        formData.append('trimLevel',this.state.trimLevel)
        formData.append('color', this.state.color)
        formData.append('odometer',this.state.odometer)
        formData.append('regNo', this.state.regNo)
        formData.append('carValue', this.state.carValue)
        formData.append('carImage', this.state.carImage)
        formData.append('imageName', this.state.imageName)
        this.props.addVehicle(this.state.makeId, formData, this.props.history)
    }


    render() {
      
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                <img src={this.state.image_preview} className={classes.form_img_preview} alt="..."/>
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
      <select type="text" 
      className="form-control"
      name="style" onChange={this.onChange} value={this.state.style}>
      <option value=""></option>
      <option value="SUV">SUV</option>
      <option value="BUS">BUS</option>
      <option value="VAN">VAN</option>
      <option value="TRUCK">TRUCK</option>
    </select>
    </div>
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
            id="customFile"
            name="file"
            value={this.state.carImage}
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

addVehicle.propTypes = {

  addVehicle: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({

  errors: state.errors,
 
})
export default connect(mapStateToProps, {addVehicle})(VehicleItems)