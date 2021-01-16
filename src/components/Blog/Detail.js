import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route,
    useRouterMatch
  } from "react-router-dom";
import axios from 'axios';
import Comment from './Comment.js';
import Rate from './Rate.js';
import ListComment from './ListComment.js';



class Detail extends Component {
    
    constructor(props){
        super(props)
        this.state ={
            detail: {},
            comment:{},
            idCmt: "",
        }
       this.getCmt = this.getCmt.bind(this);
       this.getId = this.getId.bind(this);
    }
    

    componentDidMount(){
        let idUrl = this.props.match.params.id;
        axios.get('http://api-local.com:8888/api/blog/detail/'+ idUrl)
        .then(res => {
            this.setState({
                detail: res.data.data,
                comment: res.data.data.comment
            });
        })
        .catch(error => console.log(error));
    }
    renderData(){
        let {detail} = this.state;
            return(
                <div className="blog-post-area">
						<h2 className="title text-center">{detail['title']}</h2>
						<div className="single-blog-post">
							<h3>{detail['description']}</h3>
							<div className="post-meta">
								<ul>
									<li><i className="fa fa-user"></i>{detail['id_auth']}</li>
									<li><i className="fa fa-clock-o"></i> 1:33 pm</li>
									<li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
								</ul>
								<span>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star-half-o"></i>
								</span>
							</div>
							<Link to="">
								<img src={"http://api-local.com:8888/upload/Blog/image/" + detail['image']} alt=""/>
							</Link>
							<p>{detail['content']}</p>
							<div className="pager-area">
								<ul className="pager pull-right">
									<li><Link to="">Pre</Link></li>
									<li><Link to="">Next</Link></li>
								</ul>
							</div>
						</div>
					</div>
            )
    }
    getCmt(data){
        this.setState({
            comment: this.state.comment.concat(data)
        })
    }

    getId(idComment){
        this.setState({
            idCmt : idComment
        })
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-9">
                        <div className="blog-post-area">
                            <h2 className="title text-center">Latest From our Blog</h2>
                            <div className="single-blog-post">
                                {this.renderData()}
                            </div>
                        </div>
                        <Rate idBlog ={this.props.match.params.id} />
                        <div className="socials-share">
                            <Link to =""><img src="images/blog/socials.png" alt=""/></Link>
                        </div>
                        <div className="response-area">
                            <ListComment idBlog = {this.props.match.params.id} Cmt = {this.state.comment} getId = {this.getId} reply = {this.reply}/>   			
                        </div>
                        <div className="replay-box" >
                            <Comment idBlog = {this.props.match.params.id} getCmt = {this.getCmt} id = {this.state.idCmt}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Detail
