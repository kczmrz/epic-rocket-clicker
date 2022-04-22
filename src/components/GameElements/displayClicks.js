import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './gameElements.css';
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function DisplayBoard(props)
{  
    
    return(

        <div className="Board">
        
        <Container> 
        <div className="strap"> 
         <Row>

        <Col>
        <img className="avatar" src={props.avatar} />
        </Col> 

        <Col> 
        <div className="counter"> {props.clicks}</div>
        </Col>
        
        <Col>
        <br/>
        <div style={{ width: 100, height: 'auto' }}>
        <CircularProgressbar value={props.xp} maxValue={props.xp2} text={props.lvl} />
        </div>
        </Col>
        </Row>
        </div>
        <h4>POWER: {props.power}</h4>
        <button className="btn btn-primary btn-lg cbtn" onClick={props.event}>🚀</button>
        </Container>
        </div>
    )
}




export default DisplayBoard;