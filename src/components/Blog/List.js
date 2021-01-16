import React,{Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route,
    useRouterMatch
  } from "react-router-dom";
  import axios from 'axios';


class List extends Component {
    constructor(props){
        super(props)
        this.state = {
            list : []
        }
    }
    componentDidMount(){
        axios.get('http://api-local.com:8888/api/blog')
        .then(res =>{

            this.setState({
                list: res.data.blog.data
            } );
           
        })
        .catch(error => console.log(error));
    }
    renderData(){
       var {list} = this.state;
       if(list.length > 0){
            return list.map((value,key) => {
                return (
                    <div className="single-blog-post">
                        <h3>{list[key]['title']}</h3>
                        <div className="post-meta">
                        <ul>
                            <li><i className="fa fa-user" /> Mac Doe</li>
                            <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                            <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                        </ul>
                        <span>
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star-half-o" />
                        </span>
                        </div>
                        <Link to="">
                        <img src={"http://api-local.com:8888/upload/Blog/image/" + list[key]['image']} alt="" />
                        </Link>
                        <p>{list[key]['description']}</p>
                         <Link className="btn btn-primary" to= {"/blog/detail/" + list[key]['id']}>Read More</Link>
                  </div>
                )
            })
        
       }
    }
    render(){
        return(
            <div className ="blog-post-area">
                                <h2 className ="title text-center">Latest From our Blog</h2>
                                <div className ="single-blog-post">
                                   {this.renderData()}
                                </div>
                                <div className ="pagination-area">
                                    <ul className ="pagination">
                                        <li><Link to ="" className ="active">1</Link></li>
                                        <li><Link to ="">2</Link></li>
                                        <li><Link to ="">3</Link></li>
                                        <li><Link to =""><i className ="fa fa-angle-double-right"></i></Link></li>
                                    </ul>
                                </div>
            </div>
        )
    }
}
export default List