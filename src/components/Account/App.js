import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route,
    useRouterMatch
  } from "react-router-dom";

  import MenuLeft from './MenuLeft.js';
  class App extends Component {
    constructor(props){
        super(props)
      }
      
      render (){
        return(
            <section>
              <div className="container">
                <div className="row">
                  <div className="col-sm-3">
                  <MenuLeft/>
                  </div>
                   <div className ="col-sm-9">
                  {this.props.children}
                  </div>
                </div>
              </div>
            </section>
        )
    }

  }
  export default withRouter(App)