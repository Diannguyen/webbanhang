import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route,
    useRouterMatch
  } from "react-router-dom";
  import axios from 'axios';


class Comment extends Component{
    constructor(props){
        super(props)
        this.state = {
            comment:""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name] : value
        })

    }
    handleSubmit(e){
        e.preventDefault();
        const checkLogin = localStorage['isLogin'];
        if(checkLogin){
            const userData = JSON.parse( localStorage["ListUser"])

            let url = 'http://api-local.com:8888/api/blog/comment/' + this.props.idBlog;
            let accessToken = userData.token.token;
            let config = {
                headers:{
                    'Authorization': 'Bearer  ' + accessToken,
                    'Content-Type': 'Application/x-www-form-urlencoded',
                    'Accept' : 'application/json'
                }
            };
            let {comment} = this.state;
            if(comment){
                const formData = new FormData();
                formData.append('id_blog', this.props.idBlog);
                formData.append('id_user', userData.auth.id);
                formData.append('id_comment', this.props.id ? this.props.id : 0);
                formData.append('comment', this.state.comment);
                formData.append('image_user', userData.auth.avatar);
                formData.append('name_user', userData.auth.name);

                axios.post(url, formData, config)
                .then(res =>{
                    this.props.getCmt(res.data.data)
                })
            }
        }       
    }
    
    render(){
        return(
            <div className="replay-box" >
                <div className="row">
                        <div className="col-sm-12">
                                    <h2>Leave a replay</h2>
                                    <form onSubmit = {this.handleSubmit}>
                                        <div className="text-area">
                                            <div className="blank-arrow">
                                                <label >Your Comment</label>
                                            </div>
                                            <span>*</span>
                                            <textarea id="comment-area" name="comment" rows="11" onChange = {this.handleChange} value={this.state.comment}></textarea>
                                            <button  className="btn btn-primary" type='submit'>post comment</button>
                                        </div>
                                    </form>
                                </div>
                        </div>	
            </div>      

        )
    }
}
export default Comment