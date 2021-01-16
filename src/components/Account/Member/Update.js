import React, { Component } from "react";
import axios from 'axios';
import{
    BrowserRouter as Router,
    Link,
    Switch,
    Route,
    useRouterMatch
} from 'react-router-dom';

class Update extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: "",
            name: "",
            email: "",
            password:"",
            address: "",
            phone:"",
            country:"",
            formErrors: {},    
            auth: {},
            token: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderError = this.renderError.bind(this);
    }
    componentDidMount(){
        const userData = JSON.parse(localStorage['ListUser']);
        this.setState({
            id: userData.auth.id,
            name: userData.auth.name,
            email: userData.auth.email,
            password: userData.auth.password,
            phone: userData.auth.phone,
            country: userData.auth.country,
        })

    }
    handleChange(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        const userData = JSON.parse(localStorage['ListUser']);
        
        let check = true;
        let submitErrors = this.state.formErrors;
        let getEmail = this.state.email;
        let getPhone = this.state.phone;
        let getAdd = this.state.address;
        let getCountry = this.state.country;

        submitErrors.name = submitErrors.email = submitErrors.password = submitErrors.phone = submitErrors.address = ""
        if(!getEmail){
            check = false;
            submitErrors.email = "vui long nhap email";
        }
        if(!getPhone){
            check = false;
            submitErrors.phone = "vui long nhap phone"
        }
        if(!getAdd){
            check = false;
            submitErrors.address = "vui long nhap address"
        }
        if (!getCountry){
            check = false;
            submitErrors.country = "vui long nhap country";
        }
        if(!check){
            this.setState({
                formErrors : submitErrors
            })
        }else{

            let url = 'http://api-local.com:8888/api/user/update/' + userData.auth.id;
            let accessToken = userData.token.token;
            let config = {
                headers:{
                    'Authorization': 'Bearer  ' + accessToken,
                    'Content-Type': 'Application/x-www-form-urlencoded',
                    'Accept' : 'application/json'
                }
            };
            let updateUser = this.state;
            if(updateUser){
                const formData = new FormData();
                formData.append('name', this.state.name,);
                formData.append('phone', this.state.phone);
                formData.append('email', this.state.email);
                formData.append('password',this.state.password)
                formData.append('address', this.state.address);
                formData.append('country',this.state.country);
                formData.append('level', 0);

                axios.post(url, formData, config)
                .then(res =>{
                    this.setState({
                        auth: res.data.Auth,
                        token: res.data.success
                    })
                    console.log(this.state)
                    if(res.data.errors) {
                        this.setState({
                            formErrors: res.data.errors,
                        }); 
                    }else{
                        const data = {
                            auth: this.state.auth,
                            token: this.state.token
                        }
                        var convert = JSON.stringify(data);
                        localStorage.setItem("ListUser" , convert);
                        alert("Update Thanh cong")
                        }
                })
            }
              
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
            <h2>Update User!</h2>
            {this.renderError()}
            <form onSubmit = {this.handleSubmit}>
                <input type="text" placeholder="Name" name="name"  value= {this.state.name} onChange={this.handleChange}/>
                <input type="email" placeholder="Email Address" name="email"  value= {this.state.email} onChange={this.handleChange}/>
                <input type="password" placeholder="Password" name="password"  value= {this.state.password} onChange={this.handleChange}/>
                <input type="phone"placeholder="Phone" name="phone" value= {this.state.phone}onChange={this.handleChange}/>
                <input type="address"placeholder="Address" name="address" value= {this.state.address} onChange={this.handleChange}/>
                <input type="country"placeholder="Country" name="country" value= {this.state.country} onChange={this.handleChange}/>
                <span><label type="text"placeholder="0">Level: 0</label></span>
                <button type="submit" className="btn btn-default">Update</button>
            </form>
        </div>
        )
    }
}
export default Update