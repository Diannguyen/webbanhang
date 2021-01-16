import React,{ Component } from "react";
import{
    BrowserRouter as Router,
    Link,
    Switch,
    Route,
    useRouterMatch
} from 'react-router-dom';
import axios from 'axios';

class List extends Component{
    constructor(props){
        super(props)
        this.state={
            listProduct : {}
        }
    }
    componentDidMount(){
        axios.get("http://api-local.com:8888/api/product/wishlist")
        .then(res =>{
         
            this.setState({
                listProduct: res.data.data,
            })
            console.log(this.state.listProduct)
        })
    }
    renderListProduct(){
        let wishlist = this.state.listProduct;
        if(wishlist.length > 0){
            return wishlist.map((value,key) =>{
                let image = value['image']
                console.log(image[0])
                return(
                        <tr>
                            <td>{value['id']}</td>
                            <td className="price">{value['price']}</td>
                            <td ><img width="50" height="50" src={"http://api-local.com:8888/upload/user/product/"+ value['id_user'] + "/" + image[0]}/></td>
                            <td className="description">{value['name']}</td>
                            <td className="total" colSpan="2">Action</td>
                        </tr>
                )
            })
        }
    }
    render(){
        return(
            <div className="col-sm-9" id="cart_items">
                <div className="table-responsive cart_info">
                    <table className="table table-condensed">
                        <thead>
                            <tr className="cart_menu">
                                <td>Id</td>
                                <td className="price">Name</td>
                                <td >Image</td>
                                <td className="description">Price</td>
                                <td className="total" colSpan="2">Action</td>
                            </tr>
                        </thead>
                        <tbody>
                        {this.renderListProduct()}
                        </tbody>
                    </table>
                    <Link  to="/account/product/add" className="btn btn-default check_out">Add New</Link>
                </div>
            </div>
    
        )
    }
}
export default List