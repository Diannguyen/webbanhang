import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route,
    useRouterMatch
  } from "react-router-dom";
  import axios from 'axios';
  import StarRatings from 'react-star-ratings';

class Rate extends Component{
    constructor(props){
        super(props)
        this.state = {
            rating: 0,
            result: ""
        }
        this.changeRating = this.changeRating.bind(this);
    }
    componentDidMount(){
        axios.get("http://api-local.com:8888/api/blog/rate/" + this.props.idBlog)
        .then(res =>{
            this.setState({
                result: res.data.data
            })
            console.log(this.state.result)
            let sum = 0;
            let arrRate = this.state.result.length;
            // reactjs map chi dung return khi tra ve html
            this.state.result.map((value,key)=>{
                sum = sum + parseInt(value['rate']);
            });
            let aveRage = sum/arrRate;
            this.setState({
                rating: aveRage
            })
        })
        .catch(error => console.log(error))
    }

    changeRating( newRating, name ) {
        this.setState({
            rating: newRating
        })
        const checkLogin = localStorage['isLogin'];
        if(checkLogin){
            const userData = JSON.parse( localStorage["ListUser"])
            let url = 'http://api-local.com:8888/api/blog/rate/' + this.props.idBlog;
            let accessToken = userData.token.token;
            let config = {
                headers:{
                    'Authorization': 'Bearer  ' + accessToken,
                    'Content-Type': 'Application/x-www-form-urlencoded',
                    'Accept' : 'application/json'
                }
            };
            let rate = this.state;
            if(rate){
                const formData = new FormData();
                formData.append('blog_id', this.props.idBlog);
                formData.append('user_id', userData.auth.id);
                //Trong reacjt khong dc vua set this.setState xong goi ra lai lien trong 1 ham nen chung ta set truc tiep gia tri xuong la newRating
                formData.append('rate', newRating);

                axios.post(url, formData, config)
                .then(res =>{
                    console.log(res)
                })
            }
        }       
    }
    renderRates(){
        let voted = this.state.result.length;
            return(
                <ul className="ratings">
                            <li className="rate-this">Rate this item:  </li>
                            <li>
                            <StarRatings
                                rating={this.state.rating}
                                starRatedColor="yellow"
                                changeRating={this.changeRating}
                                numberOfStars={5}
                                name='rating'
                                />
                            </li>
                            <li className ="color">({voted} Voted)</li>
                    </ul>            
                )
    }
    render(){
        return(
            <div>
                 <div className="rating-area">
                            {this.renderRates()}
                            <ul className="tag">
                                <li>TAG:</li>
                                <li><Link  to =""className="color" >Pink <span>/</span></Link></li>
                                <li><Link to ="" className="color">T-Shirt <span>/</span></Link></li>
                                <li><Link  to ="" className="color">Girls</Link></li>
                            </ul>
                        </div>
            </div>
        )
    }
}
export default Rate