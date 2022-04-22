import React, { useContext } from "react";
import { Card  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from "react";
import './gameElements.css';

function Booster(props)
{
  const [btncls, setBtncls] = useState('btn btn-secondary');
  const [txt, setTxt] = useState('Kup');
  const [colortxt, setColortxt] = useState('');
  const [colortxt2, setColortxt2] = useState('');
  const [ItemCost, SetItemCost] = useState(props.cost);

  

  useEffect(()=>{
    if(props.click >= props.cost && props.minFuel <= props.fmax)
    {
      setBtncls('btn btn-success');
      setTxt('BUY');
     


    }
    else {
      setBtncls('btn btn-danger');
      setTxt('\u00A0 🔒 \u00A0'); 
      
    }


    if(props.minFuel <= props.fmax)
    {
      setColortxt2('txtGreen');
      
    }
    else {
      setColortxt2('txtRed'); 
    }


    if(props.click >= props.cost)
    {
      setColortxt('txtGreen');
    }
    else {
      setColortxt('txtRed'); 
    }

    if(ItemCost >= 10000000)
    {
      SetItemCost('10mln');
    }

  


   
  })




   
    return(
        <div>
        <Card style={{ width: '16rem', height: 'auto', background: '#121212', color: 'white' }}>
        <Card.Img variant="top" src={props.bg} />
        <Card.Body>
          
          <Card.Title>{props.name}</Card.Title>
          
           <div className="CardGrid"> 
           <div> 
            <b> Owned:</b> {props.amount} <br/>
            <b> Cost:</b> <span className={colortxt}> {ItemCost} <br/> </span>
            <b> Power:</b> {props.pwr}
            </div>
            <div>
             <b> Fuel usage: </b>  {props.fuelUsage} <br/>
             <b>Min capacity: </b> <span className={colortxt2}> {props.minFuel}L </span>
              


            </div>
            </div>
         
          <button className={btncls} onClick={props.buy}>{txt}</button>
        </Card.Body>
      </Card>
      </div>
    )
}




export default Booster;