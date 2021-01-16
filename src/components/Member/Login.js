import React,{Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route,
    useRouterMatch,
    withRouter
  } from "react-router-dom";
import axios from 'axios';

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            password: "",
            email: "",
            level: 0,
            formErrors:{},
            auth:{},
            token:{},

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        const name = e.target.name;
        const value = e.target.value
        this.setState({
           [name]: value
        })
    }
    handleSubmit(e){
        e.preventDefault();
        this.setState({
            formErrors: {}
        })
        let flat = true;
        let submitErrors = this.state.formErrors;

        let getPass = this.state.password;
        let getEmail = this.state.email;

        if(!getPass){
            flat = false;
            submitErrors.password = "vui long nhap name"
        }else{
            submitErrors.password = ""
        }
        if(!getEmail){
            flat = false;
            submitErrors.email = "vui long nhap email"
        }else{
            submitErrors.email = ""
        }
        if(!flat){
            this.setState({
                formErrors: submitErrors
            });
        }else{
            const info ={
                email: this.state.email,
                password: this.state.password,
                level: 0
            }
            axios.post("http://api-local.com:8888/api/login",  info)
            .then((res) =>{
                console.log(res)
                this.setState({
                    auth: res.data.Auth,
                    token: res.data.success
                })
                if(res.data.errors) {
                    this.setState({
                        formErrors: res.data.errors
                    });
                } else {
                    const data = {
                        auth: this.state.auth,
                        token: this.state.token
                    }
                    var convert = JSON.stringify(data);
                    localStorage.setItem("ListUser" , convert);
                    localStorage.setItem("isLogin" , true);
                     this.props.history.push('/')
                     }
            })
        }
       
    }
    renderError(){
        let formErrors = this.state.formErrors;
        return(
            <div className= 'formErrors'>
                {Object.keys(formErrors).map((fieldName,i) =>{
                    if(Object.keys(formErrors).length > 0) {
                        return(
                            <p key={i}> {formErrors[fieldName]}</p>
                            )
                    }
                })
                } 
            </div>
        )
    }
    successLogin(){
        this.props.history.push("/account")
    }

    
    render(){
        return(
            <div className="login-form" onSubmit={this.handleSubmit}>
                            <h2>Login to your account</h2>
                            <div className="formErrors">
                                {this.renderError()}
                            </div>
                            <form action="#">
                                <input type="email" placeholder="Email Address" name="email"  value={this.state.email} onChange={this.handleChange}/>
                                <input type="password" placeholder="Password" name="password"  value={this.state.password} onChange={this.handleChange}/>
                                <span>
                                    <input type="checkbox" className="checkbox"/> 
                                    Keep me signed in
                                </span>
                                <button type="submit" className="btn btn-default">Login</button>
                            </form>
                            
                        </div>
        )
    }
}
export default withRouter(Login)