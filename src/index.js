import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  useRouterMatch
} from "react-router-dom";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Home from './components/Home';

import Blog_List from './components/Blog/List';
import DetailBlog  from "./components/Blog/Detail";
import MemberIndex from './components/Member/Index';
import Account from './components/Account/Index';


ReactDOM.render(
  <div>
    <Router>
      <App>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path ='/login' component={MemberIndex} />
          {/* <Route path = '/account/product/li' component={AccountProduct} /> */}
          {/* <Route path ='/product/detail/:id' component={DetailProduct} />
          <Route path ='/cart' component={Cart} /> */}
          
          <Route path ='/blog/list' component={Blog_List} />
          <Route path ='/blog/detail/:id' component={DetailBlog} />

          {/* <Route path ='/wishlist' component={WishList} />
          <Route path ='/product/search' component={Search} /> */}
          <Route component={Account} />
           {/* <Route component={NotFound} /> */}
        </Switch>
      </App>
    </Router>
  </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
