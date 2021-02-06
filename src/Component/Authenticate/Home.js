import Axios from 'axios'
import React, { Component } from 'react'
import Login from './Login'

export default class Home extends Component {
    componentDidMount(){
        Axios.get('http://localhost:8000/user').then(
            res => {
                console.log(res)
            },
            err => {
                console.log(err)
            }
        )
    }
    render() {
        return (
            <div>
             <Login/>
            </div>
        )
    }
}
