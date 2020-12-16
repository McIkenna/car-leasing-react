import React from 'react'
import {Link} from "react-router-dom";
const CreateModel = () => {
    return (
        <React.Fragment>
        <Link to="/ModelItem" className="btn btn-md btn-info">
        Add Car Model
        </Link>
        </React.Fragment>
    )
}

export default CreateModel