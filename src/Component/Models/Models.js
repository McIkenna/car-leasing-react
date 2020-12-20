import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import {deleteModel} from "../../Action/modelActions"


 class Models extends Component {

  onDeleteModel = id => {
    this.props.deleteModel(id);
  }
 
    render() {
        let {model} = this.props;
        
    
        return (
            <div>
<div className="row row-cols-1 row-cols-md-2">
  <div className="col mb-4">
    <div className="card">
      <img src={model.carImageUrl} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{model.make}</h5>
        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
      <Link to={`/Vehicles/${model.makeId}`} type="button" class="btn btn-outline-primary">View</Link>
    <Link to={`/UpdateModel/${model.makeId}`}  type="button" className="btn btn-outline-secondary">Update</Link>
    <Link to={`/VehicleItems/${model.makeId}`}  type="button" className="btn btn-outline-secondary">Create New Models</Link>
    <li type="button" className="btn btn-outline-danger" onClick={this.onDeleteModel.bind(this, model.makeId)}>Delete</li>
    </div>
  </div>

 </div>
    </div>
        )
    }
}

Models.propTypes={
  deleteModel: PropTypes.func.isRequired,

}

export default connect(null, {deleteModel})(Models)