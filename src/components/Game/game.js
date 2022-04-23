import { click } from "@testing-library/user-event/dist/click";
import React, { Component, useState } from "react";
import { ReactDOM } from "react";
import DisplayBoard from "../GameElements/displayClicks";
import Booster from "../GameElements/booster_frame";
import { useEffect } from "react";
import { notify, green_notify } from "../Alerts/toast";
import 'bootstrap/dist/css/bootstrap.min.css';
import images from "../Images";
import './game.css';
import { Container, Row, Col, Carousel  } from "react-bootstrap";
import ProgressBar from "../FuelBar/FuelProgressBar";
import Fuelstation from "../ModalComponents/FuelStation";
import Custom from "../ModalComponents/Custom";
import Casino from "../ModalComponents/Casino";
import StartAlert from "../ModalComponents/startAlert";
import TrollMessage from "../ModalComponents/TrollMessage";



 class Game extends Component {
    constructor(props)
    {
        super(props);
     

        this.state = {
            click: 0,

            power: 1,

            level: 1,
            
            fuel: 100,

            fuelMax: 100,

            capacityPrice: 10,

            fuel_usage: 0.6,

            fuel_price: 1,

            xp: 0,

            xp_to_nxt: 50,
            
            item_price: [100, 300, 600, 800, 950, 1900, 2800, 5000, 10000000],

            item_name: ["🚀booster1", "🚀booster2", "🚀booster3",   "🚀booster4", "🚀booster5",  "🚀booster6", "🚀booster7", "🚀booster8", "🚀PREMIUMBOOSTER",   ],

            item_amount: [0, 0 ,0, 0, 0 ,0, 0, 0, 0],

            item_power: [1, 3, 5, 7, 12, 14, 21, 49, '100k'],

            item_fusage: [0.1, 0.2, 0.3,   0.5, 1, 1.2, 2, 4, 0],

            item_minfuel: [50, 100, 150,  300, 450, 600, 1800, 2500, 5000 ],

            /* do kasyna */
            casino_multiplier: 0,

            casino_stake: 500,
            
            troll_info: false,

            
           
            

          
           
        };
        this.AddPoints = this.AddPoints.bind(this);
        this.ChangePoints = this.ChangePoints.bind(this);
        this.BuyBooster = this.BuyBooster.bind(this);
        this.lvlSystem = this.lvlSystem.bind(this);
        this.SubstractFuel = this.SubstractFuel.bind(this);
        this.getRandomInt = this.getRandomInt.bind(this);
        this.Refuel = this.refuel.bind(this);
        this.BuyCapacity = this.BuyCapacity.bind(this);
        this.SetCasinoMuliplier = this.SetCasinoMuliplier.bind(this);
        this.AddCasinoStake = this.AddCasinoStake.bind(this);
        this.SubstractStake = this.SubstractStake.bind(this);
        this.StartCasino = this.StartCasino.bind(this);
        this.CasinoWin = this.CasinoWin.bind(this);
        this.DefaultCasinoVal = this.DefaultCasinoVal.bind(this);
        this.CloseTrollmsg = this.CloseTrollmsg.bind(this);

       
        
    }

    StartCasino()
    {

        let checkPossiblity = this.state.click - this.state.casino_stake;
        
        if(this.state.casino_multiplier != 0 && checkPossiblity > 0)
        {
           this.ChangePoints(this.state.casino_stake);
           let randomnmbr = this.getRandomInt(0, 100);
           
           this.CasinoWin(this.state.casino_multiplier, this.state.casino_stake, randomnmbr);
           




        }
        else {
            notify("You can't play... Check stake or select multiplier");
        }

        this.DefaultCasinoVal();
    }

    CasinoWin(x, y, z)
    {
        let winval = x * y;
        
        if(x == 1.25)
        {
            if(z <= 33)
            {
                this.ChangePoints(-winval);
                /* WYGRANA */

                notify("You win. Your award: " + winval);
            }
            else {
                notify("You lose... Try again :-D");
                /*PRZEGRANA */
            }
        }

        if(x == 1.50)
        {
            if(z <= 20)
            {
                this.ChangePoints(-winval);
                /* WYGRANA */

                notify("You win. Your award: " + winval);
            }
            else {
                notify("You lose... Try again :-D");
                /*PRZEGRANA */
            }
        }

        if(x == 2)
        {
            if(z <= 10)
            {
                this.ChangePoints(-winval);
                
                /* WYGRANA */

                notify("You win. Your award: " + winval);
            }
            else {
                notify("You lose... Try again :-D");
               
                /*PRZEGRANA */
            }
        }

        
    }

    DefaultCasinoVal()
    {
        this.setState(() => {
            return {
                casino_stake: 500,
                casino_multiplier: 0
            }
        })
        
    }

    SubstractStake()
    {
        if(this.state.casino_stake > 500)
        {
            this.setState((prevState) => {
                return {
                    casino_stake: prevState.casino_stake - 500,
                }
            })
        }
        else {
            notify("Minimum stake-value is 500!")
        }
    }


    AddCasinoStake() 
    {
       
            this.setState((prevState) => {
                return {
                    casino_stake: prevState.casino_stake + 500,
                }
            })


    }

    SetCasinoMuliplier(mltp)
    {
        this.setState((prevState) => {
            return {
                casino_multiplier: mltp
            }
        })

        

    }

    BuyCapacity(capVal)
    {
        if(this.state.capacityPrice * capVal < this.state.click)
        {
            this.setState((prevState) => {
                return {
                    fuelMax: prevState.fuelMax + capVal,
                    click: prevState.click - (this.state.capacityPrice * capVal)
                }
            })
        }
        else {
            notify("You can't buy it");
        }
    }
    refuel(TankValue)
    {
        let FullCost = Math.round(((this.state.fuelMax - this.state.fuel) * this.state.fuel_price)*100)/100;
        let checkpwrs = '';
        if(this.state.fuel + TankValue < this.state.fuelMax)
        {
            checkpwrs = true;
        }
        else {
            checkpwrs = false;
        }

        if(TankValue == "MAX")
        {
            if(FullCost <= this.state.click)
            {
             this.setState((prevState) => {
                    return {
                        click: prevState.click - FullCost,
                        fuel: this.state.fuelMax
                     }
                  })
            }

        }
        else {
            if(this.state.fuelMax > this.state.fuel && this.state.click > this.state.fuel_price * TankValue && checkpwrs) 
            {
            this.setState((prevState) => {
                return {
                    click: prevState.click - this.state.fuel_price * TankValue,
                    fuel: prevState.fuel + TankValue
                 }
              })

            }
             else {
              notify("⛽You can't buy more fuel....")
            }
        }



        
        
     
    }

    SubstractFuel()
    {
        this.setState((prevState) => {
            return {
                fuel: prevState.fuel - this.state.fuel_usage
            }
        })
    }

    
    
    async lvlSystem()
    {
       

        if(this.state.xp >= this.state.xp_to_nxt)
        {
        
        this.setState((prevState) => {
            
                return {
                    xp: 0,
                    level: prevState.level+ 1,
                    xp_to_nxt: prevState.xp_to_nxt + 100,
                    fuel_price: prevState.fuel_price + 0.5,
                    capacityPrice: 10 * this.state.fuel_price
                }
            
        })
        let lvl = this.state.level + 1;
        green_notify("You have reached the level " + lvl + "!");
    }
        
        

    }

   ChangePoints(val) 
   {
    this.setState((prevState) => {
        return {
            click: prevState.click - val,
        }
    })

   }
    AddPoints() {
        let fuelSim = this.state.fuel - this.state.fuel_usage;

        if(fuelSim > 0)
        {
            this.lvlSystem();
            this.SubstractFuel();
            this.setState((prevState) => {
                return {
                    click: prevState.click + this.state.power,
                    xp: prevState.xp + 2
                }
            })

        }
        else {
            notify("⛽You don't have fuel!");
        }
     
               
    }

    BuyBooster(y) 
    {
        let CheckFuelMax = this.state.fuelMax;
        let price = this.state.item_price[y];
        let power = this.state.item_power[y];
        let addfusage = this.state.item_fusage[y];
        let minimumFuel = this.state.item_minfuel[y];
        const CopyAmonut = this.state.item_amount.slice();



        if(this.state.click >= price && minimumFuel <= CheckFuelMax)
        {
            if(y < 8)
            {
              CopyAmonut[y] += 1;
            
              this.setState((lastState) => {
                return {
                    click: lastState.click - price,
                    power: lastState.power + power,
                    fuel_usage: Math.round((lastState.fuel_usage + addfusage) * 100)/100,

                    item_amount: CopyAmonut
                    
                    
                }
            })

            }
            if(y >= 8)
            {
                this.setState((lastState) => {
                    return {
                        troll_info: true, 

                        click: 0,

                        power: 1,
            
                        level: 1,
                        
                        fuel: 80,
            
                        fuelMax: 100,
            
                        capacityPrice: 10,
            
                        fuel_usage: 1,
            
                        fuel_price: 2,
            
                        xp: 0,

                        item_amount: [0, 0 ,0, 0, 0 ,0, 0, 0, 0],

                        

                        
            
                        
                        
                    }
                })
                
                
            }
            
           

        }
        else {
            notify("💸 You can't buy this item");
        }

    }

     getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }

      CloseTrollmsg()
      {
        this.setState(() => {
            return {
                
                troll_info: false,
                
            }
        })

      }


     

   

 
 

    render() 
    {
        const { click  } = this.state;
        const tanklvl = Math.round(( this.state.fuel / this.state.fuelMax) * 100);
   
     

        return( 
        <> 
        <div className="mobileInfo"> <h2>This game works only on desktop browser</h2><center> <img src="https://c.tenor.com/jM88jRsqnL8AAAAC/peppo-pepe.gif" width='400'/></center></div>

        <div className="fullscreen">
            

            <TrollMessage showinfo={this.state.troll_info} trollbtn={this.CloseTrollmsg}/>
            <StartAlert/>
             <center>  <DisplayBoard avatar={images.avatar1} clicks={ Math.round(click * 100)/100} event={this.AddPoints} power={this.state.power} lvl={this.state.level} xp={this.state.xp} xp2={this.state.xp_to_nxt}/> 
             <br/>

             <Container> 
             <Row>

             <Col> 
             <Fuelstation Btn1={() => this.refuel(1)} Btn2={() => this.refuel(10)} Btn3={() => this.refuel("MAX")}  price={this.state.fuel_price} tanklevel={tanklvl}/>
             </Col>
             <Col><Custom price={this.state.capacityPrice} btn1={() => this.BuyCapacity(50)}   btn2={() => this.BuyCapacity(100)}   btn3={() => this.BuyCapacity(500)}/></Col>
             <Col>


             <Casino 
             lvl={this.state.level}
             multiplier={this.state.casino_multiplier}
             mltp1={() => this.SetCasinoMuliplier(1.25)}
             mltp2={() => this.SetCasinoMuliplier(1.50)}
             mltp3={() => this.SetCasinoMuliplier(2.00)}
             addStake={this.AddCasinoStake}
             subStake={this.SubstractStake}
             stake={this.state.casino_stake}
             play={this.StartCasino}
             />
             
             
             </Col>
             </Row>
             </Container>

            <br/>




           <Carousel indicators={false} interval={null} >

           <Carousel.Item>
          
            <Container>  
            <Row> 
          
            <Col> <Booster name={this.state.item_name[0]} cost={this.state.item_price[0]} amount={this.state.item_amount[0]} buy={() => this.BuyBooster(0)} bg={ images.rocket1 } pwr={this.state.item_power[0]}  click={this.state.click} minFuel={this.state.item_minfuel[0]} fuelUsage={this.state.item_fusage[0]} fmax={this.state.fuelMax}/></Col>
            <Col> <Booster name={this.state.item_name[1]} cost={this.state.item_price[1]} amount={this.state.item_amount[1]} buy={() => this.BuyBooster(1)} bg={ images.rocket2 } pwr={this.state.item_power[1]}  click={this.state.click} minFuel={this.state.item_minfuel[1]} fuelUsage={this.state.item_fusage[1]} fmax={this.state.fuelMax}/> </Col>
            <Col><Booster name={this.state.item_name[2]} cost={this.state.item_price[2]} amount={this.state.item_amount[2]} buy={() => this.BuyBooster(2)} bg={ images.rocket3 }   pwr={this.state.item_power[2]}  click={this.state.click} minFuel={this.state.item_minfuel[2]} fuelUsage={this.state.item_fusage[2]} fmax={this.state.fuelMax}/>  </Col> 
          

            </Row>
            </Container>
           
            </Carousel.Item>

            <Carousel.Item>
            <Container>
                 
            <Row>
            
            <Col> <Booster name={this.state.item_name[3]} cost={this.state.item_price[3]} amount={this.state.item_amount[3]} buy={() => this.BuyBooster(3)} bg={ images.rocket4 } pwr={this.state.item_power[3]}  click={this.state.click} minFuel={this.state.item_minfuel[3]} fuelUsage={this.state.item_fusage[3]} fmax={this.state.fuelMax}/></Col>
            <Col> <Booster name={this.state.item_name[4]} cost={this.state.item_price[4]} amount={this.state.item_amount[4]} buy={() => this.BuyBooster(4)} bg={ images.rocket5 } pwr={this.state.item_power[4]}  click={this.state.click} minFuel={this.state.item_minfuel[4]} fuelUsage={this.state.item_fusage[4]} fmax={this.state.fuelMax}/> </Col>
            <Col><Booster name={this.state.item_name[5]} cost={this.state.item_price[5]} amount={this.state.item_amount[5]} buy={() => this.BuyBooster(5)} bg={ images.rocket6 }   pwr={this.state.item_power[5]}  click={this.state.click} minFuel={this.state.item_minfuel[5]} fuelUsage={this.state.item_fusage[5]} fmax={this.state.fuelMax}/>  </Col> 
          
            </Row>
            
            </Container>
            
            </Carousel.Item>



            <Carousel.Item>
            <Container>
                 
            <Row>
            
            <Col> <Booster name={this.state.item_name[6]} cost={this.state.item_price[6]} amount={this.state.item_amount[6]} buy={() => this.BuyBooster(6)} bg={ images.rocket7 } pwr={this.state.item_power[6]}  click={this.state.click} minFuel={this.state.item_minfuel[6]} fuelUsage={this.state.item_fusage[6]} fmax={this.state.fuelMax}/></Col>
            <Col> <Booster name={this.state.item_name[7]} cost={this.state.item_price[7]} amount={this.state.item_amount[7]} buy={() => this.BuyBooster(7)} bg={ images.rocket8 } pwr={this.state.item_power[7]}  click={this.state.click} minFuel={this.state.item_minfuel[7]} fuelUsage={this.state.item_fusage[7]} fmax={this.state.fuelMax}/> </Col>
            <Col><Booster name={this.state.item_name[8]} cost={this.state.item_price[8]} amount={this.state.item_amount[8]} buy={() => this.BuyBooster(8)} bg={ images.rocket9 }   pwr={this.state.item_power[8]}  click={this.state.click} minFuel={this.state.item_minfuel[8]} fuelUsage={this.state.item_fusage[8]} fmax={this.state.fuelMax}/>  </Col> 
          
            </Row>
            
            </Container>
            
            </Carousel.Item>
            
            </Carousel>







            <br/>
            <ProgressBar completed={Math.round(this.state.fuel/this.state.fuelMax * 100)} FuelMax={this.state.fuelMax}  fuelUsage={this.state.fuel_usage}/>
           
            </center> 

            
        

        </div> </>)
    }
}

export default Game;