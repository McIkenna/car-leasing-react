import React, { Component } from 'react'
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {createModel} from "../../Action/modelActions"
import classes from "./Models.module.css"
import dummyImg from "../Images/defaultImg.jpg" 
import {Link} from "react-router-dom"


const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
  
    // validate form errors being empty
    Object.values(formErrors).forEach(value => {
      value.trim().length > 0 && (valid = false);
    });
    // validate the form was filled out
/*Object.values(rest).forEach(value => {
      value === null && (valid = false);
    });*/
 
    return valid;
  };
  
  
  const numRegex = RegExp(
    /^[0-9\b]+$/
  );
  
class ModelItem extends Component {

    constructor(){
        super()

        this.state={
            make: null,
            carImageUrl : null,
            file: null,
            fileName:null,
            image_preview: null,
            formErrors: {
                make: "",
              },
            isError: true,
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
    }


 /*   componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }
    }
*/
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
    e.preventDefault();
    const { name, value } = e.target;
    //let formErrors = { ...this.state.formErrors }
    const {formErrors} = this.state;
        if(value.length > 0){
            this.setState({isError: false});
          
        }
        
        switch (name) {
          case "make":
            formErrors.make =
              value.trim().length < 2 ? "minimum 2 characaters required" : "";
            break;
            default:
              break;
          }
    this.setState({ formErrors, [name]: value }, console.log(formErrors));
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
        const formData = new FormData();
        if(formValid(this.state)){
            formData.append('file', this.state.file);
            formData.append('make', this.state.make);
            formData.append('filename', this.state.fileName)
            this.props.createModel(formData, this.props.history)
        }
      else if(!formValid(this.state)){
        window.alert("Enter Brand Name")
      }
     else{
        window.alert("Select Document")
     }
    }


    render() {
        const { formErrors } = this.state;
        const { errors } = this.state;
        const isEnabled = !formValid(this.state) && this.state.isError;
        return (
             <div className={classes.container}>
                 <Link to={`/`} type="button" class="btn btn-outline-dark">Go Back</Link>
                <form onSubmit={this.onSubmit}>
            <div><h1>Add Vehicle Brand</h1></div>
            <img src={this.state.image_preview} className={classes.form_img_preview} alt="..." />
           <div className={formErrors.make.length > 0 ? classes.floating_input_error : "form-group"} >
                <label for="inputAddress">Make</label>
                <input 
                type="text" 
                className="form-control" 
                id="inputAddress" 
                placeholder="e.g Toyota,Honda,Ford..."
                name="make"
                value={this.state.make}
                onChange={this.onChange}
                />
                 {formErrors.make.length > 0 && (
                <span className={classes.errorMessage}>{formErrors.make}</span>
              )}{errors.make}
            </div>
            <div className= "custom-file">
            <input 
            type="file" 
            className= "custom-file-input"
            name="file"
            value = {this.state.carImageUrl}
            onChange={this.handleImagePreview}
            />
            <label className="custom-file-label" for="customFile">{this.state.fileName}</label>
      
            </div>
                <button type="submit" className="btn btn-primary" disabled={isEnabled}>Submit</button>
                </form>
            </div>
        )
    }
}

createModel.propTypes = {
    createModel: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})
export default connect(mapStateToProps, {createModel})(ModelItem) 