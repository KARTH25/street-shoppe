import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { baseApiCallService } from '../../services/baseApiCallService';
import { userDataSliceActions } from '../../store/userDataSlice';
import DeviceInfo from '../../services/DeviceInfo';
import { Link } from 'react-router-dom';
import './Cart.css';

/**
 * Compatiblility : Both Mobile and Web
*/

function Cart(){

    const deviceType = DeviceInfo();

    const dispatch = useDispatch();

    const list = [];

    let price = 0;

    const productList = useSelector(state => state.uiConfigs.uiConfigs.products) || {};

    const productsInCartList = useSelector(state =>  state.user.productsInCart) || [];

    productsInCartList.forEach(cart => {
        let product = {...productList[cart.id], cartQuantity : cart['quantity'], id : cart.id };
        price += parseFloat(product['price']) * product['cartQuantity'];
        list.push(product); 
    });

    dispatch(userDataSliceActions.checkoutSlice({ checkout : list }));

    const updateProductQuantity = (type, id) => {

        let existingCart = [...productsInCartList];

        let index = existingCart.findIndex(product => product.id === id);

        if(type == 'add'){
           existingCart[index] = { id : id, quantity : (existingCart[index]['quantity'] + 1) };
        }
        if(type == 'remove'){
            existingCart[index] = { id : id, quantity : (existingCart[index]['quantity'] - 1) };
        }

        baseApiCallService.put('/api/data/user/karthick/cart.json',existingCart).then(res => {
            if(res.status == 200){
                dispatch(userDataSliceActions.updateProductsInCart({ productsInCart : res.data }));
            }
        })
    }

    const removeProductFromCart = (id) => {
        let existingCart = [...productsInCartList];

        let index = existingCart.findIndex(product => product.id === id);

        existingCart.splice(index,1);

        baseApiCallService.put('/api/data/user/karthick/cart.json',existingCart).then((res) => {
            if(res.status == 200){
                dispatch(userDataSliceActions.updateProductsInCart({ productsInCart : res.data }));
            }
        })
    }

    return (
        // Cart Base container
        <div className="container-fluid">
            {
                (list.length > 0) && (
                    <>
                        <div className={`p-3 ${(deviceType === 'lg') ? 'street_shoppe_cart_content_lg' : 'street_shoppe_cart_content_sm'}`}>
                            {
                                // Iterate through each item in list
                                list.map((product, index) => (
                                    // Card
                                    <div className="row shadow p-1 mb-3" key={index}>
                                        {/* Image and Product name */}
                                        <div className="text-end p-1 h4" style={{ 'cursor': 'pointer' }} onClick={() => removeProductFromCart(product.id)}>&times;</div>
                                        <div className={`col-md-12 ${(deviceType === 'lg') ? '' : 'text-center'}`}>
                                            <div className='d-flex align-items-center justify-content-center"'>
                                                {/* Product Image */}
                                                <img src={product.image} alt="" width="150px" height="150px" className="m-3" />

                                                {/* Product Name and Price / Quantity */}
                                                <div className='text-center'>
                                                    <div><b>{product.productName}</b></div>
                                                    <div className={`${(deviceType === 'lg') ? 'mt-2' : ''}`}>&#8377; {product.price} /  {product.quantity}</div>

                                                    {/* Cart Actions Checkout and Remove */}
                                                    <div className='col mt-2 text-center'>
                                                        <button className="btn btn-md btn-outline-primary" disabled={product.cartQuantity > 3} onClick={() => updateProductQuantity('add', product.id)}>+</button>
                                                        <button className="btn btn-md btn-light m-1 disabled">{product.cartQuantity}</button>
                                                        <button className="btn btn-md btn-outline-primary" disabled={product.cartQuantity == 1} onClick={() => updateProductQuantity('remove', product.id)}>-</button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        {/* Cart Information */}
                        <div className="row mt-5">
                            <div className="col text-end">
                                <h5>Total Quantity</h5>
                            </div>
                            <div className="col text-end">
                                <span className='h6'>{list.length}</span>
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col text-end">
                                <h5>Total Amount</h5>
                            </div>
                            <div className="col text-end">
                                <span className='h6'>{price}</span>
                            </div>
                        </div>

                        <div className="row mt-2">
                            <button className="btn btn-dark">
                                <Link className="street_shoppe_cart_link_text" to="/checkout/cart/bulk">Checkout</Link>
                            </button>
                        </div>
                    </>
                )}
                {
                    (list.length == 0) && (
                        <div className='text-muted text-center h4 mt-5'>
                            Cart is empty !
                        </div>
                    )
                }
        </div>
    )
}

export default Cart