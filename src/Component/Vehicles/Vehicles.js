import React, { Component } from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getVehicles} from "../../Action/vehicleActions"
import VehicleModel from './VehicleModel';


class Vehicles extends Component {

  componentDidMount(){
    const {id} = this.props.match.params;
    this.props.getVehicles(id)
  }
 
    render() {
     // const {id} = this.props.match.params;
      const {vehicles} = this.props.vehicle;
    
        return (
            <div>
              {vehicles.map(vehicle => (
                <VehicleModel key={vehicle.makeId} vehicle={vehicle} />
              ))}
            </div>
        )
    }
}

Vehicles.propTypes = {
  vehicle: PropTypes.object.isRequired,
  getVehicles: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  vehicle:state.vehicle
})


export default connect(mapStateToProps, {getVehicles})(Vehicles)