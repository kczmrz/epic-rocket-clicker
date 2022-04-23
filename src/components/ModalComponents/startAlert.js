import React from "react";
import { Modal, Dialog } from "bootstrap";
import { useState, useEffect } from "react";
import './modalTemplate.css';
import {Container, Row, Col,} from "react-bootstrap";

function StartAlert(props)
{
    const [show, SetShow]  = useState(true);
    const TriggerBtn = () =>
    {
        SetShow(!show);
    }
   
    
    useEffect(()=> {
        const StartAlert = document.getElementById('StartAlert');

        if(show)
        {
            StartAlert.style.display = 'inherit';
          
    
        }
    
        else {
            StartAlert.style.display = 'none';
    
        }
    })



   

    return(
        <div> 
        <div id="StartAlert" className="modal">
           <div className="modal-content">

           <div>




         <div className="ModalTxt messageToUser">
         
             <h1>Hello</h1>
             <h3> This game is no sense time-waster clicker. Maybe you can find the purpose of this game.</h3>
             <h2>REMEMBER:</h2>
             <h3>-Keep an eye on your fuel</h3>
             <h3>-Be carefoul in casino :-)</h3>
             <br/><br/>
             <h3>enjoy your flights bro! </h3>
             <h2>~Kczmrz</h2>
             <center> 
             <button className="btn btn-success" onClick={TriggerBtn}>  Okay, let's go!</button>
             </center>

      

        

      

         </div>



         </div>
         </div>

        </div>
      
        </div>
    )
}
export default StartAlert;