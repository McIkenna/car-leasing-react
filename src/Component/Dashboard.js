import React, { Component } from 'react'
import Models from "../Component/Models/Models"
import {connect} from "react-redux"
import {getModels} from "../Action/modelActions"
import PropTypes from "prop-types"
import classes from "./Dashboard.module.css"

class Dashboard extends Component {

    componentDidMount(){
        const {id} = this.props.match.params;
        this.props.getModels(id);
    }
    render() {
        let {models} = this.props.model

    
        return (
        <div className={classes.model}>
        {models.map(model => (<Models key={model.makeId} model={model}/>))}
            </div>
        )
    }
}

getModels.propTypes = {
    model: PropTypes.object.isRequired,
    getModels: PropTypes.func.isRequired

}

const mapStateToProps = state => ({
    model: state.model,
})

export default connect(mapStateToProps, {getModels})(Dashboard)