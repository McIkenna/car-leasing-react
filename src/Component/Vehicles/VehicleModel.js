import React, { Component } from 'react'

class VehicleModel extends Component {
    render() {
        const {vehicle} = this.props;
        return (
            <div>
                 <div className="card-group">
        <div className="card">
            <img src={vehicle.carImage} className="card-img-top" alt="..."/>
            <div className="card-body">
            <h4 className="card-title">{vehicle.make}</h4>
            <h3 className="card-title">{vehicle.model}</h3>
            <h5 className="card-title">{vehicle.style}</h5>
            <p className="card-text">{vehicle.trimLevel}</p>
            <p className="card-text">{vehicle.year}</p>
            <p className="card-text">{vehicle.color}</p>
            <p className="card-text">{vehicle.carValue}</p>
            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
            </div>
        </div> 
            </div>
            </div>
        )
    }
}

export default VehicleModel