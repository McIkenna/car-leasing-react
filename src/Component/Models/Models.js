import React, { Component } from 'react'
import myPics from "../Images/whiteBack2.jpg"
import "bootstrap/dist/css/bootstrap.min.css"

 class Models extends Component {
    render() {
        return (
            <div>
<div className="row row-cols-1 row-cols-md-2">
  <div className="col mb-4">
    <div className="card">
      <img src={myPics} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>

  <div className="card">
    <img src={myPics} className="card-img-top" alt="..."/>
    <div className="card-body">
      <h5 className="card-title">Card title</h5>
      <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
    </div>
  </div>
</div>
    </div>
        )
    }
}

export default Models