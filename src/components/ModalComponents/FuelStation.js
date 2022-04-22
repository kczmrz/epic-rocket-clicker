import React from "react";
import { Modal, Dialog } from "bootstrap";
import { useState, useEffect } from "react";
import './modalTemplate.css';
import {Container, Row, Col,} from "react-bootstrap";
import {Carousel} from "react-bootstrap";
function Fuelstation(props)
{
    const [show, SetShow]  = useState(false);
    const TriggerBtn = () =>
    {
        SetShow(!show);
    }
   
    
    useEffect(()=> {
        const modalDiv = document.getElementById('modDiv');

        if(show)
        {
            modalDiv.style.display = 'inherit';
          
    
        }
    
        else {
            modalDiv.style.display = 'none';
    
        }
    })



   

    return(
        <div> 
        <button className="btn btn-secondary btn-lg" onClick={TriggerBtn}>⛽Petrol Station!</button>
       <div id="modDiv" className="modal">
           <div className="modal-content">

           <div>
           <button className="btn btn-danger closeBtn"  onClick={TriggerBtn}>X</button>




         <div className="ModalTxt">
         <h1>Petrol Station</h1>
         <h2>Tank level:</h2>
         <h3 className="FuelTextInfo">{props.tanklevel}%</h3>
         <h2>1L Fuel price: </h2> <h3 className="FuelTextInfo">{props.price} clicks</h3>
      
         <Container> 
         <br/> <br/>
         <Row>
         <Col> <button className="btn btn-primary" onClick={props.Btn1}><h1>⛽Refuel 1L</h1></button></Col> 
         <Col> <button className="btn btn-primary" onClick={props.Btn2}><h1>⛽Refuel 10L</h1></button></Col> 
         <Col> <button className="btn btn-primary" onClick={props.Btn3}> <h1>⛽Refuel MAX</h1></button></Col> 
         </Row>
        
         </Container>
        
       
         </div>



         </div>
         </div>

       </div>
      
        </div>
    )
}
export default Fuelstation;