import React from "react";


const ProgressBar = (props)=> {
    const { completed } = props;
    const containerStyles = {
        height: 40,
        width: '70%',
        backgroundColor: "grey",
        borderRadius: 50,
        margin: 10
      }
     
      
    
      const fillerStyles = {
        height: '100%',
        
        width: `${completed}%`,
        backgroundColor: 'red',
        borderRadius: 'inherit',
        textAlign: 'right',
        
      }
    
      const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
      }

      const txt = {
          color: 'white',
          fontSize: '40px',
          
          textShadow: '2px 2px black'
      }

      const txt2 = {
        color: 'white',
        fontSize: '20px',
        
        textShadow: '2px 2px black'
    }

      const FuelBG = {
          backgroundColor: '#181818',
          width: '1250px',
          borderRadius: '3%',
          paddingBottom: '0.5%'
      }

      return (
          <div style={FuelBG}> 
          
          <div style={txt}>⛽FUEL </div>
        <div style={containerStyles}>
          <div style={fillerStyles}>
            <span style={labelStyles}>{`${completed}%`}</span>
          </div>
        </div>
        <div style={txt}> <h2>Tank capacity: {props.FuelMax}L</h2></div>
        <div style={txt2}> <p>Fuel consumption: {props.fuelUsage}L/click</p></div>
        </div>
      );
}

export default ProgressBar;