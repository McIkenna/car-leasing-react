import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import {deleteModel} from "../../Action/modelActions"
import styles from "./Models.module.css"


 class Models extends Component {

  onDeleteModel = id => {
    this.props.deleteModel(id);
  }
 
    render() {
        let {model} = this.props;
        const {makeId} = this.props.model
    
  return (
  <div>
 <div className={styles.content_wrapper}>
  <div className={styles.news_card}>
    <Link to={`/Vehicles/${makeId}`} className={styles.news_card__card_link}></Link>
    <img src={model.carImageUrl} alt="" className={styles.news_card__image}/>
    <div className={styles.news_card__text_wrapper}>
      <h1 className={styles.news_card__title}>{model.make}</h1>
      <div className={styles.news_card__details_wrapper}>
        <Link to={`/Vehicles/${model.makeId}`} className={styles.news_card__read_more}>View</Link>
        <Link to={`/UpdateModel/${model.makeId}`} className={styles.news_card__read_more}>Update</Link>
        <Link to={`/VehicleItems/${model.makeId}`}   className={styles.news_card__read_more}>Create New Models</Link>
        <li type="button" className={styles.news_card__read_more} onClick={this.onDeleteModel.bind(this, model.makeId)}>Delete</li>
        </div>
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