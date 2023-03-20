import DeviceInfo from '../../services/DeviceInfo';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { userDataSliceActions } from '../../store/userDataSlice';
import { notifierSliceActions } from '../../store/notifierSlice';
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
            type = "remove";
            let productIndex = productsInCartList.findIndex(product => product.id === id);
            updatedCart.splice(productIndex, 1);
        }
        else{
            type = "add";
            updatedCart.push({ id : id, quantity : 1 });
        }

        axios.put('https://street-shoppe.firebaseio.com/user/karthick/cart.json?auth=eyJhbGciOiJSUzI1NiIsImtpZCI6IjFlOTczZWUwZTE2ZjdlZWY0ZjkyMWQ1MGRjNjFkNzBiMmVmZWZjMTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3RyZWV0LXNob3BwZSIsImF1ZCI6InN0cmVldC1zaG9wcGUiLCJhdXRoX3RpbWUiOjE2NzkwNjc5OTUsInVzZXJfaWQiOiJVd3JCQm44UXQ1Z05jQ0dlVGY1WGtmZEJDWHUyIiwic3ViIjoiVXdyQkJuOFF0NWdOY0NHZVRmNVhrZmRCQ1h1MiIsImlhdCI6MTY3OTA2Nzk5NSwiZXhwIjoxNjc5MDcxNTk1LCJlbWFpbCI6InN0cmVldHVzZXJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInN0cmVldHVzZXJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Um-s-TvczEtEiiZb9oqMvEwPgUIY6ivccn6Yv-7Yd-MecwKjXRTUV4XIcR8rYCxDUYoBbxJPdzYXfKC67ji_LyQCAqWhxFIhRVKViP1VqZtElLvpiBUmykmY5MQEKMOVoXXiHnyg3ybcSsC5LFtWN3nh8Z8XgM3OAcLpibS43FKb0SxjPsuQbSbwav3n48K5Qk4H_kpbSTFxZdZ41XhBq_m7dYns1qYnxXMLloRHCkbuoqZTC-LRYvO4KW36okq1qwzrmjqaaYS_CsXVJpflBBZ3W_9chijehxqtPIJ7IGhfEW74pgZBeZcyURIr-ljsXXtURHoyYpouEnZT4wZqZQ',updatedCart).then(res => {
            if(res.status === 200){

                console.log("recieved 200");
                
                dispatch(userDataSliceActions.updateProductsInCart({ productsInCart : updatedCart }));

                if(type == 'remove'){
                    dispatch(notifierSliceActions.alertInfo({ alertInfo : {showAlert : true, message : 'Product removed from cart', type : 'success'} }));
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
                        <Link to="/checkout" className='street_shoppee_link_text'><i class="ri-gift-line"></i> Buy Now</Link>
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