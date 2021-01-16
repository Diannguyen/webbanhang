import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import Login from './Login';
import Register from './Register';


class Index extends Component {

  render (){
    return(
        <div>
            <section id="form">
            <div className="container">
                <div className="row">
                    <div className="col-sm-4 col-sm-offset-1">
                        <Login/>
                    </div>
                    <div className="col-sm-1">
                        <h2 className="or">OR</h2>
                    </div>
                    <div className="col-sm-4">
                       <Register/>
                    </div>
                </div>
            </div>
        </section>
      </div>
    )
    }
}
export default Index
