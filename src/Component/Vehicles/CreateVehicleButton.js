import React from 'react'
import {Link} from "react-router-dom"

 const CreateVehicleButton = () => {
    return (
        <React.Fragment>
        <Link to="/VehicleItems" className="btn btn-md btn-info">
        Create Vehicle
        </Link>
        </React.Fragment>
    )
}

export default CreateVehicleButton