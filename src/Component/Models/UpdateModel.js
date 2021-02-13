import React, { Component } from 'react'
import {getModel,updateModel} from "../../Action/modelActions"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import classes from "./Models.module.css"
import dummyImg from "../Images/defaultImg.jpg" 




class UpdateModel extends Component {
    
    constructor(){

        super()
        this.state = {
            makeId: "",
            make: "",
            carImageUrl : "",
            file: null,
            image_preview: "",
            fileName:"",
            errors: {}
        }
       this.onChange = this.onChange.bind(this);
       this.onSubmit = this.onSubmit.bind(this)
    }
    
componentWillReceiveProps(nextProps){
    if(nextProps.errors){
        this.setState({errors: nextProps.errors});
    }
       const {
            makeId,
            make,
            carImageUrl,
            file,
            image_preview,
            fileName,
            errors
        } = nextProps.model;
     
        this.setState({
            makeId,
            make,
            carImageUrl,
            file,
            image_preview,
            fileName,
            errors
        });
    }

   


    componentDidMount(){
        const {id} = this.props.match.params;
        this.props.getModel(id, this.props.history);
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
            fileName : e.target.files[0].name
    
        })
    }

    onSubmit(e){
        e.preventDefault();
        const updatedFormData = new FormData();
        updatedFormData.append('file', this.state.file);
        updatedFormData.append('makeId', this.state.makeId);
        updatedFormData.append('make', this.state.make);
      this.props.updateModel(updatedFormData, this.props.history)
    }

    
    render() {
        const {errors} = this.state;
               return (
            <div className={classes.container}>
                <div>
                <Link to={`/`} type="button" class="btn btn-outline-dark">Go Back</Link>
                <form onSubmit={this.onSubmit}>
                    <div><h1>Update Model</h1></div>
                <img src={this.state.carImageUrl} className={classes.form_img_preview1}/>
                
                <img src={this.state.image_preview} className={classes.form_img_preview2}/>
             
            <div className="form-group">
                <label for="inputAddress">Make</label>
                <input 
                type="text" 
                className="form-control" 
                id="inputAddress" 
                placeholder="make"
                name="make"
                value={this.state.make}
                onChange={this.onChange}
                />
            </div>
            <div className="custom-file">
            <input 
            type="file" 
            className="custom-file-input" 
            name="file"
            onChange={this.handleImagePreview}
            />
            <label className="custom-file-label" for="customFile">{this.state.fileName}</label>
            </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
        )
    }
}

UpdateModel.propTypes = {
    getModel: PropTypes.func.isRequired,
    updateModel: PropTypes.func.isRequired,
    model: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    model: state.model.model,
    errors: state.errors
})

export default connect(mapStateToProps, {getModel,updateModel})(UpdateModel)