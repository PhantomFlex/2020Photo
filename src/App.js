import React from "react"
import {BrowserRouter, Route , Link } from "react-router-dom"
//import createBrowserHistory from "history/createBrowserHistory"
import history from './History'
import {Mainmenu} from './Pages/Mainmenu'
import {Aboutme} from './Pages/Aboutme'
import { Portfolio } from "./Pages/Portfolio"
import {Price} from './Pages/Price'
import { Contact } from "./Pages/Contact"
import { All } from "./Pages/PortfolioParts/All"
import { Promo } from "./Pages/PortfolioParts/Promo"
import { Advertising } from "./Pages/PortfolioParts/Advertising"
import { Wedding } from "./Pages/PortfolioParts/Wedding"
import { Events } from "./Pages/PortfolioParts/Events"
import { AirCamera } from "./Pages/PortfolioParts/AirCamera"


//const history = createBrowserHistory();


class Navigation extends React.Component{
  render(){
    return(
      <BrowserRouter history={history}>
        <div>
          <ul>
            <li><Link to="/">1</Link></li>
          </ul>
          <hr/>
          <Route exact path="/" component={Mainmenu}/>
          <Route  path="/about" component={Aboutme}/>
          <Route path="/price" component={Price}/>
          <Route path="/portfolio" component={Portfolio}/>
          <Route path="/contact" component={Contact}/>
          <Route path="/all" component={All}/>
          <Route path="/promo" component={Promo}/>
          <Route path="/advertising" component={Advertising}/>
          <Route path="/wedding" component={Wedding}/>
          <Route path="/events" component={Events}/>
          <Route path="/airCamera" component={AirCamera}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default Navigation;