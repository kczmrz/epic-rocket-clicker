import React from "react";
import { Modal, Dialog } from "bootstrap";
import { useState, useEffect } from "react";
import './modalTemplate.css';
import { notify } from "../Alerts/toast";
import {Container, Row, Col,} from "react-bootstrap";
import { Button } from "bootstrap";

function Casino(props)
{
    const [btncls, setBtncls] = useState('btn btn-secondary btn-lg');
    const [show, SetShow]  = useState(false);


      /*multipliers */ 
      const [mltp_1, setMltp_1] = useState('btn btn-outline-light btn-lg');
      const [mltp_2, setMltp_2] = useState('btn btn-outline-light btn-lg');
      const [mltp_3, setMltp_3] = useState('btn btn-outline-light btn-lg');

    const TriggerBtn = () =>
    {
        SetShow(!show);
      
    }
   
    
    useEffect(()=> {
        const casino = document.getElementById('casino');

     


        if(props.lvl >= 10)
        {
            setBtncls('btn btn-secondary btn-lg');

            if(show)
            {
                casino.style.display = 'inherit';
              
        
            }
        
            else {
                casino.style.display = 'none';
                
        
            }

        }
        else {
            setBtncls('btn btn-danger btn-lg');

            if(show)
            {
                notify("You must have 10 lvl!");
                SetShow(!show);

            }
        }

        if(props.multiplier == 0)
        {   setMltp_1('btn btn-outline-light btn-lg');
            setMltp_2('btn btn-outline-light btn-lg');
            setMltp_3('btn btn-outline-light btn-lg');
        }
        else  if(props.multiplier == 1.25)
        {   setMltp_1('btn btn-light btn-lg');
            setMltp_2('btn btn-outline-light btn-lg');
            setMltp_3('btn btn-outline-light btn-lg');
        }
        else  if(props.multiplier == 1.50)
        {   setMltp_1('btn btn-outline-light btn-lg');
            setMltp_2('btn btn-light btn-lg');
            setMltp_3('btn btn-outline-light btn-lg');
        }
        else  if(props.multiplier == 2)
        {   setMltp_1('btn btn-outline-light btn-lg');
            setMltp_2('btn btn-outline-light btn-lg');
            setMltp_3('btn btn-light btn-lg');
        }





    })



   

    return(
        <div> 
        <button className={btncls} onClick={TriggerBtn}>🎰CASINO </button>
        <div id="casino" className="modal">
           <div className="modal-content">

           <div>
           <button className="btn btn-danger closeBtn"  onClick={TriggerBtn}>X</button>




        <div className="ModalTxt">
     

        <h1>Casino</h1>
        <h2>Select multiplier</h2>
        <br/>
        <Container>
            <Row>
                <Col><button className={mltp_1} onClick={props.mltp1}> 1.25x </button></Col>
                <Col><button className={mltp_2} onClick={props.mltp2}> 1.50x </button></Col>
                <Col><button className={mltp_3} onClick={props.mltp3}> 2.00x </button></Col>
            </Row>
        </Container>
        <br/>



        <h2>Select stake <i> (clicks)</i> </h2>
        <div className="StakeDiv"> 
        <Container> 
        <Row > 
        <Col> <h1> {props.stake}</h1></Col>
       

       
        <Col><button className="btn btn-success btn-sm" onClick={props.addStake}><h5> &nbsp;+&nbsp;</h5></button></Col>
        <Col><button className="btn btn-danger btn-sm" onClick={props.subStake}><h5> &nbsp;-&nbsp;</h5></button></Col>
       
        </Row>
        </Container>
        </div>
        <br/>
        <button className="btn btn-warning" onClick={props.play}><h1>PLAY </h1></button>



        </div>



         </div>
         </div>

       </div>
      
        </div>
    )
}
export default Casino;