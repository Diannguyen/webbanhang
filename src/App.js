import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Header from './components/Layout/Head';
import MenuLeft from './components/Layout/MenuLeft';
import Footer from './components/Layout/Footer';
class App extends Component {
  constructor(props){
    super(props)
  }
  
  render (){
    let pathname = this.props.location.pathname;
    let path = ["/account/member", "/account/product/list","/login","/account/product/add","/account/product/edit"];
    let checkPath = path.includes(pathname);
    return(
      <div>
        <Header />
        <section>
          <div className="container">
            <div className="row">
                {
                  checkPath ? "" : 
                  <div className="col-sm-3"><MenuLeft/></div>
                }
               <div className ="col-sm-9">
              {this.props.children}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
}
}
export default withRouter(App)
