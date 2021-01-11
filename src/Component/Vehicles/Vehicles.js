import React, { Component } from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getVehicles} from "../../Action/vehicleActions"
import VehicleModel from './VehicleModel';
import {Link} from "react-router-dom";
import styles from "./Vehicles.module.css"
import Spinner from '../UI/Spinner/Spinner';
import Backdrop from '../UI/Backdrop/Backdrop';



class Vehicles extends Component {
  constructor(){
    super();
    this.state = {
      errors: {}, 
      loading : true
    }
  }

  componentDidMount(){
    const {id} = this.props.match.params;
    this.props.getVehicles(id);
    this.setState({loading:false})
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


 
    render() {
     const {id} = this.props.match.params;
      const {vehicles} = this.props.vehicle;
      const {errors} = this.state;
      const {loading} = this.state;
     
      let vehicleBoard;

      const boardAlgorithm = (errors, vehicles) => {
        if(vehicles.length < 1){
          if(errors.projectNotFound){
            return (
              <div className="alert alert-danger text-center" role="alert">
                {errors.projectNotFound}
              </div>
            )
          }else{
            return(loading ? <div className="alert alert-info text-center" role="alert">No Vehicle found here</div> :<Spinner/>  )
          }
        
        }else if(vehicles.length == null){
          return(<div className="alert alert-info text-center" role="alert">No Vehicle found here</div> )
        }
        else{
         
            return(
              <div className={styles.vehicle}>
                 {vehicles.map(vehicle => (
                  <VehicleModel key={vehicle.makeId} vehicle={vehicle} />
                ))}
               
              </div>
            )
          }
       
      }

      vehicleBoard = boardAlgorithm(errors, vehicles);
    
     
        return (
          <div>
           {vehicleBoard}</div>
        )
    }
}

Vehicles.propTypes = {
  vehicle: PropTypes.object.isRequired,
  getVehicles: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,

}
const mapStateToProps = state => ({
  vehicle:state.vehicle,
  errors: state.errors
})


export default connect(mapStateToProps, {getVehicles})(Vehicles)