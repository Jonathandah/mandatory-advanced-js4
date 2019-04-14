import React, { Component } from 'react';
import './App.css';


let Field = (props) => {

    function returnField(obj){
        return 
    }

    return (
        <div>
            {props.state.field.map(obj => returnField(obj))}
        </div>
    )

}

export default Field;