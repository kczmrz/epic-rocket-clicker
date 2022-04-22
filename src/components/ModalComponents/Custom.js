import React from "react";
import { Modal, Dialog } from "bootstrap";
import { useState, useEffect } from "react";
import './modalTemplate.css';
import {Container, Row, Col,} from "react-bootstrap";

function Custom(props)
{
    const [show, SetShow]  = useState(false);
    const TriggerBtn = () =>
    {
        SetShow(!show);
    }
   
    
    useEffect(()=> {
        const custom = document.getElementById('custom');

        if(show)
        {
            custom.style.display = 'inherit';
          
    
        }
    
        else {
            custom.style.display = 'none';
    
        }
    })



   

    return(
        <div> 
        <button className="btn btn-secondary btn-lg" onClick={TriggerBtn}>⚙️Rocket Tuning </button>
       <div id="custom" className="modal">
           <div className="modal-content">

           <div>
           <button className="btn btn-danger closeBtn"  onClick={TriggerBtn}>X</button>




         <div className="ModalTxt">
      

        <h1>BUY TANK CAPACITY:</h1>
       <div className="customCapacityTxt"> +50L  <button className="btn btn-danger customCapacityBtn" onClick={props.btn1}>BUY</button><h4>Price: {props.price * 50} </h4></div> 
       <div className="customCapacityTxt"> +100L  <button className="btn btn-danger customCapacityBtn" onClick={props.btn2}>BUY</button><h4>Price: {props.price * 100} </h4></div> 
       <div className="customCapacityTxt"> +500L  <button className="btn btn-danger customCapacityBtn" onClick={props.btn3}>BUY</button><h4>Price: {props.price * 500} </h4></div> 

         </div>



         </div>
         </div>

       </div>
      
        </div>
    )
}
export default Custom;