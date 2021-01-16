import React,{Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route,
    useRouterMatch
  } from "react-router-dom";
import axios from 'axios'




class ListComment extends Component{
    constructor(props){
        super(props)
        this.state= {
            reply:{},
            idCmt:""
        }
        this.getId = this.getId.bind(this);
    }
   
    getId(e){
        this.props.getId(e.target.id)
    }

    renderComment(){
    let Comment = this.props.Cmt;
        if(Comment.length > 0){
            return Comment.map((value, key)=>{
                let stt = value['id'];
                if(value['id_comment'] == 0){
                    return(
                        <ul className="media-list">
                                <li className="media">
                                <Link  to="#" className="pull-left">
                                        <img className="media-object" src={"http://api-local.com:8888/upload/user/avatar/" + value['image_user']} alt=""/>
                                    </Link>
                                    <div className="media-body">
                                        <h4 className="media-heading">{value['name_user']}</h4>
                                        <p>{value['comment']}</p>
                                        <div className="blog-socials">
                                            <ul>
                                                <li><Link to=""><i className="fa fa-facebook"></i></Link></li>
                                                <li><Link to=""><i className="fa fa-twitter"></i></Link></li>
                                                <li><Link to=""><i className="fa fa-dribbble"></i></Link></li>
                                                <li><Link to=""><i className="fa fa-google-plus"></i></Link></li>
                                            </ul>
                                            <a id={value['id']}  href="#comment-area"  className="btn btn-primary" onClick={this.getId}>Reply</a>
                                        </div>
                                    </div>
                                </li>
                                    {Comment.map((value,key) => {
                                        if (value['id_comment'] == stt) {
                                            return(
                                                <li className="media second-media">
                                                            <Link  to="#" className="pull-left">
                                                                <img className="media-object" src={"http://api-local.com:8888/upload/user/avatar/" + value['image_user']} alt=""/>
                                                            </Link>
                                                            <div className="media-body">
                                                                <h4 className="media-heading">{value['name_user']}</h4>
                                                                <p>{value['comment']}</p>
                                                                <div className="blog-socials">
                                                                    <ul>
                                                                        <li><Link to=""><i className="fa fa-facebook"></i></Link></li>
                                                                        <li><Link to=""><i className="fa fa-twitter"></i></Link></li>
                                                                        <li><Link to=""><i className="fa fa-dribbble"></i></Link></li>
                                                                        <li><Link to=""><i className="fa fa-google-plus"></i></Link></li>
                                                                    </ul>
                                                                    <a id={value['id']}  href="#comment-area"  className="btn btn-primary" onClick={this.getId}>Reply</a>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )                        
                                            }
                                        } )       
                                    }
                        </ul>
                    )
                }
        })
        }
    }
   
    
    render(){
        return(
            <div className="response-area">
                <h2>Responses</h2>
                {this.renderComment()}
            </div>
        )
    }
}
export default ListComment