import React, { Component } from "react";
import{
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
    useRouterMatch
} from "react-router-dom";
import App from './App';
import Update from './Member/Update';
import Add from "./Product/Add";
import Edit from "./Product/Edit";
import List from "./Product/List";


class Index extends Component{
    render(){
        return(
                    <App>
                        <Switch>
                            <Route path="/account/member" component={Update}/>
                            <Route path="/account/product/list" component={List} />
                            <Route path="/account/product/add" component={Add}/>
                            <Route path="/account/product/edit" component={Edit}/>
                        </Switch>
                    </App>
        )
    }
}
export default Index