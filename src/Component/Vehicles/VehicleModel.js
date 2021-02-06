import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { deleteVehicle } from "../../Action/vehicleActions"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import classes from "./Vehicles.module.css"
import Spinner from "../UI/Spinner/Spinner"
class VehicleModel extends Component {

  onDeleteClick(make_Id, vehicle_Id) {
    this.props.deleteVehicle(make_Id, vehicle_Id)
  }
  render() {
    const { vehicle } = this.props;
    const { validToken, user } = this.props.security;

    const userIsAuthenticated = (
      <div className={classes.dots}>

        <span><Link to={`/UpdateVehicle/${vehicle.makeId}/${vehicle.vehicleId}`} type="button" className="btn btn-outline-secondary">Update</Link></span>
        <span><button type="button" className="btn btn-outline-danger"
          onClick={this.onDeleteClick.bind(this, vehicle.makeId, vehicle.vehicleId)}
        >Delete</button></span>
      </div>
    )

    let vehicleControllers;
    if (validToken && user) {
      vehicleControllers = userIsAuthenticated
    } else {
      vehicleControllers = null;
    }

    return (
      <div>
        <Link to={`/Vehicles/${vehicle.makeId}/${vehicle.vehicleId}`} >
          <div className={classes.wrap}>
            <div className={classes.tile}>
              <img src={vehicle.carImage} className={classes.card_img_top} alt="..." />
              <div className={classes.text}>
                <h1>{vehicle.model}</h1>
                <h2 className={classes.animate_text}>Specs</h2>
                <p className={classes.animate_text}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Model</th>
                        <th scope="col">Make</th>
                        <th scope="col">Trim</th>
                        <th scope="col">Style</th>
                        <th scope="col">Color</th>
                        <th scope="col">Year</th>
                        <th scope="col">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{vehicle.model}</td>
                        <td>{vehicle.make}</td>
                        <td>{vehicle.trimLevel}</td>
                        <td>{vehicle.style}</td>
                        <td>{vehicle.color}</td>
                        <td>{vehicle.year}</td>
                        <td>${vehicle.carValue}</td>
                      </tr>
                    </tbody>
                  </table>
                </p>
                <div className={classes.dots}>
                  <span><Link to={`/Vehicles/${vehicle.makeId}/${vehicle.vehicleId}`} type="button" className="btn btn-outline-primary">View</Link></span>
                  <span>{vehicleControllers}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>

    )
  }
}

VehicleModel.propTypes = {
  deleteVehicle: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  security: state.security
})
export default connect(mapStateToProps, { deleteVehicle })(VehicleModel)