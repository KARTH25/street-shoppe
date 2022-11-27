import { useState } from 'react';
import DeviceInfo from '../../services/DeviceInfo';
import { Outlet, Link } from "react-router-dom";
import './ProductCard.css';

/**
 * Compatiblility : Both Mobile and Web
*/

function ProductCard(props){

    const deviceType = DeviceInfo();

    const product = props.products;

    // To maintain liked products and add products to cart
    const [productInCart, addProductToCart] = useState([]);

    return (

        <div key={product.id} className={`col-md-3 bg-light shadow shadow-lg p-3 ${(deviceType === 'lg')? 'm-5 mb-5' : 'm-1 mb-3'}`}>
            

            <div className={`text-dark text-center h5 ${(props.actions == 'none')? '' : 'd-none'}`}><b>Product Information</b></div>

            { /* Add to cart icon */}
            <div className={`text-end ${(props?.actions == 'none')? 'd-none' : ''}`} onClick={() => addProductToCart([...productInCart, product.id])}>
                <span className='ri-heart-fill' style={{ 'color': (productInCart.includes(product.id)) ? 'red' : 'black', 'fontSize': '25px' }}></span>
            </div>

            { /* Product image */}
            <div className='bg-light d-flex justify-content-center'>
                <div>
                    <img src={product.image} className='m-1' width={(deviceType === 'lg')? "350px" : "250px"} height={(deviceType === 'lg')? "350px" : "200px"} alt="Preview Not Available" />
                </div>
            </div>

            { /* Product Name, Price / Quantity, Amount */}
            <div className={`text-center ${(deviceType === "lg")? 'm-3' : 'm-2'}`}>
                <div className='text-muted mt-1'><b>{product.productName}</b></div>
                <div className='mt-1'>&#8377; <b>{product.price} / {product.quantity}</b></div>
                <button className={`btn btn-dark mt-1 ${(props.actions == 'none')? 'd-none' : ''}`}>
                    <Link to="/checkout" className='street_shoppee_link_text'>Buy Now</Link></button>
            </div>

        </div>
    )
}

export default ProductCard