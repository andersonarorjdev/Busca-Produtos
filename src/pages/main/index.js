import React, {Component} from 'react';
import api from '../../services/api';
import './styles.css';
import {Link} from 'react-router-dom';
 
// Estado vai ser sempre um objeto
export default class Main extends Component{
    state = {
        products: [],
        productinfo: {},
        page: 1,
    }

    componentDidMount(){
        this.loadProducts();
    }

    loadProducts = async (page =1) =>{
        const response = await api.get(`/products?page=${page}`);
        const {docs, ...productinfo} = response.data;
 
        this.setState({products: docs, productinfo, page })
    }

    nextPage = () =>{
        const {page, productinfo} = this.state;

        if(page === productinfo.pages) return;

        const pageNumber = page+1;
        this.loadProducts(pageNumber);
    }

    prevPage = () =>{
        const {page, productinfo} = this.state;

        if(page === 1) return;

        const pageNumber = page-1;

        this.loadProducts(pageNumber);
    }

    render(){
        const {products, page, productinfo} = this.state;
        return (
            <div className="product-list">
                {products.map(product =>(
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                            <p>{product.description}</p>
                        <Link to={`/products/${product._id}`}>Acessar</Link>
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === productinfo.pages} onClick={this.nextPage}>Proximo</button>
                </div>
            </div>
        )
    }
}