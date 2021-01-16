import React,{ Component } from "react";
import axios from 'axios';


class Add extends Component{
    constructor(props){
        super(props)
        this.state = {
            id:"",
            name: "",
            price:"",
            category:"",
            brand:"",
            status: 0,
            company:"",
            detail:"",
            sale: 0,
            categoryData:{},
            brandData:{},
            formErrors:{},
            avatar:'',
            avatarData:{},
            avatarOld:{}
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderBrand = this.renderBrand.bind(this);
        this.renderCategory = this.renderCategory.bind(this);
        this.renderSaleInput = this.renderSaleInput.bind(this);
        this.handleUserInputFile = this.handleUserInputFile.bind(this);
    }
    componentDidMount(){
        axios.get("http://api-local.com:8888/api/category-brand")
        .then(res =>{
            this.setState({
                categoryData: res.data.category,
                brandData: res.data.brand,
            })
        })
    }
    renderCategory(){
        let categoryRender = this.state.categoryData;
        if(categoryRender.length > 0){
            return categoryRender.map((value,key)=>{
                return <option value={value['id']}>{value['category']}</option>
            }
            )
        }       
    }
    renderBrand(){
        let brandRender = this.state.brandData;
        if(brandRender.length > 0){
            return brandRender.map((value,key)=>{
                return <option value={value['id']}>{value['brand']}</option>
            }
            )
        }      
    }
    handleChange(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name] : value
        })
    }
    renderSaleInput(){
        if(this.state.status == 2){
            return (
                    <input  type="text" placeholder=""  name="sale" value={this.state.sale} onChange={this.handleChange}/>
            )
        }   
    }
    handleUserInputFile(e){
        const upFile = e.target.files;
        this.setState({
            avatar: upFile
        })
    }

    handleSubmit(e){
        e.preventDefault();
        let check = true;

        let getName = this.state.name;
        let getPrice = this.state.price;
        let getBrand = this.state.brand;
        let getCategory = this.state.category;
        let getStatus = this.state.status;
        let getCompany = this.state.company;
        let getDetail = this.state.detail;
        let getSale = this.state.sale;
        let avatar = this.state.avatar;
        let submitErrors = this.state.formErrors;
     
        submitErrors.name 
        = submitErrors.price 
        = submitErrors.brand 
        = submitErrors.category 
        = submitErrors.status 
        = submitErrors.company 
        = submitErrors.detail 
        = submitErrors.sale 
        = submitErrors.avatar =  "";

        if(!getName){
            check = false;
            submitErrors.name = "Vui long nhap ten san pham";
        }
        if(!getPrice){
            check = false;
            submitErrors.price = "Vui long nhap gia ";
        }
        if(!getBrand){
            check = false;
            submitErrors.brand = "Vui long chon brand";
        }
        if(!getCategory){
            check = false;
            submitErrors.category = "Vui long chon category ";
        }
        if(!getCompany){
            check = false;
            submitErrors.company = "Vui long nhap cong ty";
        }
        if(!getDetail){
            check = false;
            submitErrors.detail = "Vui long nhap thong tin chi tiet";
        }
        if(getStatus == 2 && !getSale) {
            check = false;
            submitErrors.sale = "Vui long nhap sale";
        }
        if((avatar.length) > 3) {
            check = false;
            submitErrors.avatar = "avatar length > 3";
        } 
        if(!check){
            this.setState({
                formErrors : submitErrors
            })
        }else{
        
            const userData = JSON.parse(localStorage['ListUser'])

            let url = "http://api-local.com:8888/api/user/add-product";
            let accessToken = userData.token.token;
            let config = {
                headers:{
                    'Authorization': 'Bearer  ' + accessToken,
                    'Content-type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            };
            

            let addProduct = this.state;
            if(addProduct){
                const formData = new FormData();
                formData.append('name',this.state.name);
                formData.append('price',this.state.price);
                formData.append('brand',this.state.brand);
                formData.append('category',this.state.category);
                formData.append('company',this.state.company);
                formData.append('detail',this.state.detail);
                formData.append('status',this.state.status);
                formData.append('sale',this.state.sale);

                Object.keys(avatar).map((item,i) =>{
                    formData.append("file[]", avatar[item])
                })

                axios.post(url, formData, config)
                .then(res =>{
                    console.log(res)
                })
            }
        }
    }
    

    render(){
        return(
            <div className="col-sm-9">
                <div className="col-sm-12">
                    <div className="signup-form">
                        <h2>Create product!</h2>
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" placeholder="Name" name="name" value={this.state.name} onChange={this.handleChange}/>
                            <input type="text" placeholder="Price"  name="price" value={this.state.price}onChange={this.handleChange}/>
                            <select  value={this.state.category} name="category" onChange={this.handleChange}>
                                <option value="">Please choose category</option>
                                {this.renderCategory()}
                            </select>
                            
                            <select  value={this.state.brand} name="brand" onChange={this.handleChange}>
                                <option value="">Please choose brand</option>
                                {this.renderBrand()}
                            </select>
                            
                            <select  value={this.state.status} name="status" onChange={this.handleChange}>
                                <option value="0">Please choose status</option>
                                <option value="1">New</option>
                                <option value="2">Sale</option>
                            </select>
                            {this.renderSaleInput()}
                            <input type="text" placeholder="Company profile"  name="company" value={this.state.company}onChange={this.handleChange}/>
                            <input type="file" name="avatar[]" onChange={this.handleUserInputFile} multiple/>
                            <textarea name="detail" placeholder="Detail" value={this.state.detail} onChange={this.handleChange}></textarea>
                            <button type="submit" className="btn btn-default">ADD</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Add