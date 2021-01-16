import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Detail from './Detail';
import MenuLeft from '';

class Index extends Component {

  render (){
    return(
        
            <section id="form">
           <div className="container">
            <div className="row">
              <div className="col-sm-3">
              <MenuLeft/>
              </div>
               <div className ="col-sm-9">
                <Detail/>
              </div>
            </div>
          </div>
            </section>
    )
    }
}
export default Index
