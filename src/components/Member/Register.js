import React,{Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route,
    useRouterMatch
  } from "react-router-dom";
  import axios from 'axios';

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            email: '',
            password:'',
            phone: "",
            address: "",
            formErrors:{}
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

        let getName = this.state.name;
        let getEmail = this.state.email;
        let getPass = this.state.password;
        let getPhone = this.state.phone;
        let getAdd = this.state.address;

        if(!getName){
            flat = false;
            submitErrors.name = "vui long nhap name"
        }else{
            submitErrors.name = ""
        }
        if(!getEmail){
            flat = false;
            submitErrors.email = "vui long nhap email"
        }else{
            submitErrors.email = ""
        }
        if(!getPass){
            flat = false;
            submitErrors.password = "vui long nhap pass"
        }else{
            submitErrors.password = ""
        }
        if(!getPhone){
            flat = false;
            submitErrors.phone = "vui long nhap phone"
        }else{
            submitErrors.phone = ""
        }
        if(!getAdd){
            flat = false;
            submitErrors.address = "vui long nhap add"
        }else{
            submitErrors.address = ""
        }
      
        if(!flat){
            this.setState({
                formErrors: submitErrors
            });
        }else {
            const data ={
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                phone: this.state.phone,
                address: this.state.address,
                level: 0
            }
            axios.post("http://api-local.com:8888/api/register" , data)
            .then(res =>{
            console.log(res);
            if(res.data.errors) {
                this.setState({
                    formErrors: res.data.errors
                });
            }else{
                console.log("dang ky thanh cong")
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
   

    render(){
        return(
                	 <div className="signup-form">
                            <h2>New User Signup!</h2>
                            <div className="formErrors">
                                {this.renderError()}
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <input type="text" placeholder="Name" name="name" value ={this.state.name} onChange={this.handleChange}/>
                                <input type="email" placeholder="Email Address" name="email" value={this.state.email} onChange={this.handleChange}/>
                                <input type="password" placeholder="Password" name="password" value={this.state.password}onChange={this.handleChange}/>
                                <input type="phone"placeholder="Phone" name="phone" value={this.state.phone} onChange={this.handleChange}/>
                                <input type="address"placeholder="Address" name="address" value={this.state.address} onChange={this.handleChange}/>
                                <span><label type="text"placeholder="0">Level: 0</label></span>
                                <button type="submit" className="btn btn-default">Signup</button>
                            </form>
                            
                        </div>
        )
    }
}
export default Register