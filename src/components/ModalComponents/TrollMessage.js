import React from "react";
import { Modal, Dialog } from "bootstrap";
import { useState, useEffect } from "react";
import './modalTemplate.css';
import {Container, Row, Col,} from "react-bootstrap";
import images from "../Images";

function TrollMessage(props)
{
    const [show, SetShow]  = useState(props.showinfo);
   
   
    
    useEffect(()=> {
        const trollololo = document.getElementById('trollololo');

        SetShow(props.showinfo);

        if(show)
        {
            trollololo.style.display = 'inherit';
          
    
        }
    
        else {
            trollololo.style.display = 'none';
    
        }
    })



   

    return(
        <div> 
        <div id="trollololo" className="modal">
           <div className="modal-content">

           <div>




         <div className="ModalTxt messageToUser">
         <center> 
            <h2>Trollolllollollo</h2>
            <img src={images.trollface}/>
           </center>
             <center>
                 <br/><br/><br/>
             <button className="btn btn-danger" onClick={props.trollbtn}><h3> hahaha, very funny....</h3></button>
             </center>

      

        

      

         </div>



         </div>
         </div>

        </div>
      
        </div>
    )
}
export default TrollMessage;