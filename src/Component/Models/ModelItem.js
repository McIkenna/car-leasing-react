import React, { Component } from 'react'
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {createModel} from "../../Action/modelActions"
class ModelItem extends Component {

    constructor(){
        super()

        this.state={
            make: "",
            carImageUrl : "",
            file: null,
            fileName:"",
            image_preview: '',
            errors: {}
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
        this.setState({
           [e.target.name]: e.target.value
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
        const formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('make', this.state.make);
        formData.append('filename', this.state.fileName)
      this.props.createModel(formData, this.props.history)
    }


    render() {
        return (
             <div>
                <form onSubmit={this.onSubmit}>
                    <div><h1>Car Model Input</h1></div>

                <img src={this.state.image_preview} alt="..."/>
            <div className="form-group">
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
            </div>
            <div className="custom-file">
            <input 
            type="file" 
            className="custom-file-input" 
            name="file"
            value = {this.state.carImageUrl}
            onChange={this.handleImagePreview}
            />
            <label className="custom-file-label" for="customFile">{this.state.fileName}</label>
            </div>
                <button type="submit" className="btn btn-primary">Submit</button>
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