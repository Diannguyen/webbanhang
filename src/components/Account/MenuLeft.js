import { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route,
    useRouterMatch
  } from "react-router-dom";


class MenuLeft extends Component{
    render(){
        return(
                <div className ="left-sidebar">
					<div className ="panel-group category-products" id="accordian">
					<div className ="panel panel-default">
								<div className ="panel-heading">
									<h4 className ="panel-title">
										<Link  to="/account/member" data-toggle="collapse" data-parent="#accordian" >
											<span className ="badge pull-right"><i className ="fa fa-plus"></i></span>
											Account
										</Link>
									</h4>
								</div>
							</div>
							<div className ="panel panel-default">
								<div className ="panel-heading">
									<h4 className ="panel-title">
										<Link  to="/account/product/list" data-toggle="collapse" data-parent="#accordian" >
											<span className ="badge pull-right"><i className ="fa fa-plus"></i></span>
											My Product
										</Link>
									</h4>
								</div>
							</div>	
					</div>
					
					</div>
        )
    }
}
export default MenuLeft 