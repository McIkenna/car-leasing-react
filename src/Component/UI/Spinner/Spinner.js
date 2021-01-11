import React, { Component } from 'react'
import classes from "./Spinner.module.css"

class Spinner extends Component {
    render() {
        return (
            <div className="spinner-grow" role="status"></div>
        )
    }
}
export default  Spinner