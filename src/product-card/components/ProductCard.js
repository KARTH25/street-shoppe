import DeviceInfo from '../../services/DeviceInfo';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { userDataSliceActions } from '../../store/userDataSlice';
import { notifierSliceActions } from '../../store/notifierSlice';
import { baseApiCallService } from '../../services/baseApiCallService';
import './ProductCard.css';

/**
 * Compatiblility : Both Mobile and Web
*/

function ProductCard(props){

    const deviceType = DeviceInfo();

    const dispatch = useDispatch();

    const product = props.products;
   
    const productsInCartList = useSelector(state =>  state.user.productsInCart ) || [];

    const productsInCart = productsInCartList.map((cart) => cart.id);

    const addProductToCartHandler = (id) => {

        let checkIfItemExistsInCart = productsInCartList.filter((item) => { if(item.id === id){ return item; } } );

        let updatedCart = [...productsInCartList];

        let type;

        if(checkIfItemExistsInCart.length > 0){
            type = "update";
            let productIndex = productsInCartList.findIndex(product => product.id === id);
            updatedCart[productIndex] = { id : id, quantity : updatedCart[productIndex]['quantity'] + 1 };
        }
        else{
            type = "add";
            updatedCart.push({ id : id, quantity : 1 });
        }

        baseApiCallService.put('/api/data/user/karthick/cart.json',updatedCart).then(res => {
            if(res.status === 200){
                dispatch(userDataSliceActions.updateProductsInCart({ productsInCart : updatedCart }));

                if(type == 'update'){
                    dispatch(notifierSliceActions.alertInfo({ alertInfo : {showAlert : true, message : 'Product updated to cart', type : 'success'} }));
                }
                else if(type == 'add'){
                    dispatch(notifierSliceActions.alertInfo({ alertInfo : { showAlert : true, message : 'Product added to cart', type : 'success' } }));
                }
            }
        })
    }

    return (

        <div key={product.id} className={`col-md-3 bg-light shadow shadow-lg p-3 ${(deviceType === 'lg')? 'm-5 mb-5' : 'm-1 mb-3'}`}>
            

            <div className={`text-dark text-center h5 ${(props.actions === 'none')? '' : 'd-none'}`}><b>Product Information</b></div>

            { /* Add to cart icon */}
            <div className={`text-end ${(props?.actions === 'none')? 'd-none' : ''}`} onClick={() => addProductToCartHandler(product.id)}>
                <span className='ri-heart-fill' style={{ 'color': (productsInCart.includes(product.id)) ? 'red' : 'black', 'fontSize': '25px' }}></span>
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
                <div className='mt-2'>
                    <button className={`btn btn-dark m-1 ${(props.actions === 'none')? 'd-none' : ''}`}>
                        <Link to={`/checkout/product/${product.id}`} className='street_shoppee_link_text'><i class="ri-gift-line"></i> Buy Now</Link>
                    </button>
                    <button className={`btn btn-dark m-1 ${(props.actions === 'none')? 'd-none' : ''}`} onClick={() => addProductToCartHandler(product.id)}>
                        <i class="ri-shopping-cart-2-line"></i> Add to cart
                    </button>
                </div>
            </div>

        </div>
    )
}

export default ProductCard