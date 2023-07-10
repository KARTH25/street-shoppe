import { useState, useRef, useEffect } from "react";
import DeviceInfo from "../../services/DeviceInfo";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import './Checkout.css';
import { baseApiCallService } from "../../services/baseApiCallService";
import { notifierSliceActions } from "../../store/notifierSlice";
import { userDataSliceActions } from "../../store/userDataSlice";
import { navbarSliceActions } from "../../store/navbarSlice";
import orderSuccessLogo from '../../assets/order-success.svg';


function Checkout(){

    const deviceInfo = DeviceInfo();

    const params = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [orderSuccess, setOrderSuccess] = useState('');

    const streekInfo = useSelector(state => state.user.streekInfo);

    let newStreekInfo = streekInfo;

    const formValidators = {
        firstName : { type : '', validator : (value) => { return (value.length > 0) }, errorMessage : 'Please enter first name' },
        lastName : { type : '', validator : (value) => { return (value.length > 0) }, errorMessage : 'Please enter last name' },
        addressLine1 : { type : '', validator : (value) => { return (value.length > 0) }, errorMessage : 'Please enter address line 1' },
        addressLine2 : { type : '', validator : (value) => { return (value.length > 0) }, errorMessage : 'Please enter address line 2' },
        district : { type : '', validator : (value) => { return (value.length > 0) }, errorMessage : 'Please enter district' },
        mobileNumber : { type : '', validator : (value) => { return (typeof(value) === 'number' && value.length == 10) }, errorMessage : 'Please enter mobile number' },
        landMark : { type : '', validator : (value) => { return (value.length > 0) }, errorMessage : 'Please enter land mark' },
        state : { type : '', validator : (value) => { return (value.length > 0) }, errorMessage : 'Please enter state' },
        pincode : { type : '', validator : (value) => { return (value.length > 0) }, errorMessage : 'Please enter pincode' },
    }

    let list = [];

    const checkoutList = useSelector(state => state.user.checkout);

    const productList = useSelector(state => state.uiConfigs.uiConfigs.products[params.id]);

    const [productQuantity, setProductQuantity] = useState(1);

    const [formValidator, setFormValidator] = useState({...formValidators});

    // ref to get and set form data
    const formDataRef = useRef({ firstName : '', lastName : '', addressLine1 : '', addressLine2 : '', mobileNumber : '', district : '', landMark : '', state : '', pincode : '' });

    useEffect(() => {
        if(params.page == 'cart'){
            dispatch(navbarSliceActions.currrentMenu({menuName : 'Close'}));
        }
    }, []);

    if(params.page == 'cart'){
       list = [...checkoutList];
    }
    else{
        list = [{...productList}];
        list[0]['id'] = params.id;
    }

    const productQuantityHandler = (e) => {
        if(parseInt(e?.target?.value) <= 5){
            setProductQuantity(parseInt(e.target.value));
        }
    }

    const formValidationHandler = (field) => {

        let validation = formValidator;

        if(formValidator[field].validator(formDataRef.current[field].value)){
            validation[field] = { ...formValidator[field], type : 'success' }
        }
        else{
            validation[field] = { ...formValidator[field], type : 'error' };
        }

        setFormValidator({...validation});
    }

    const submitOrder = () => {
        let orderInfo = {};
        let orders = {};
        let recievedResponses = [];
        let date = new Date();
        let fields = ['firstName','lastName','addressLine1','addressLine2','district','landMark','state','pincode'];

        fields.forEach((field) => {
            orderInfo[field] = formDataRef.current[field].value;
        });    

        list.forEach((pl) => {
            orders = { id : pl.id, quantity : ((params.page == 'product')? productQuantity : pl.cartQuantity), price : pl.price, image : pl.image, productName : pl.productName, ordered : true, invoice_date : date.toISOString().split('T')[0] };
            orderInfo['orders'] = orders;
            baseApiCallService.post('/api/data/orders/karthick/orders.json',orderInfo).then(res => {
                if(res.status == 200){
                    recievedResponses.push(res.data);

                    if(recievedResponses.length == list.length){
                        dispatch(notifierSliceActions.alertInfo({ alertInfo : {showAlert : true, message : 'Order placed successfully !', type : 'success'} }));

                        // If routed checkout from cart on successfull order of all product emptying cart
                        if(params.page == 'cart'){
                            baseApiCallService.put('/api/data/user/karthick/cart.json',[]).then(res => {
                                dispatch(userDataSliceActions.updateProductsInCart({ productsInCart : [] }));
                            })
                        }

                        baseApiCallService.get('/api/data/orders/karthick/orders.json').then(res => {
                            if(res.status == 200 && res.data){
                                dispatch(userDataSliceActions.updateOrders({ orders : res.data }));

                                let purchaseList = [];

                                Object.keys(res.data).forEach((id) => {
                                    let orderInfo = res.data[id]['orders'];
                                    if(new Date(orderInfo['invoice_date']) > new Date(streekInfo?.['last_streek_date'])){
                                        purchaseList.push({ "invoice_number" : id, "invoice_date" : orderInfo['invoice_date'], "purchase_amount" : (parseInt(orderInfo['price'] *  parseInt(orderInfo['quantity']))) });
                                    }
                                });

                                console.log("streek info",streekInfo);

                                let reqBody = {
                                    "purchase_history" : purchaseList,
                                    "last_streek_date" : streekInfo?.['last_streek_date'],
                                    "purchase_streek" : streekInfo?.['purchase_streek']
                                }

                                baseApiCallService.post('/api/street-shoppe-apis/getUserStreekInfo',reqBody).then(res => {
                                    if(res.status == 200 && res.data){
                                        newStreekInfo = res.data;
                                        if(res.data['purchase_total_amount'] == 0){
                                            dispatch(userDataSliceActions.updateStreekInfo({ streekInfo : res?.data }));
                                            baseApiCallService.patch('/api/data/orders/karthick.json', 
                                            {...res.data, "last_streek_date" : new Date().toLocaleDateString('en-CA') }).then(res => {
                                            console.log("Streek Updated");
                                            setOrderSuccess('ordered');
                                            })
                                        }
                                        else{
                                        baseApiCallService.patch('/api/data/orders/karthick.json', 
                                        {...res.data}).then(res => {
                                            console.log("Streek Updated");
                                            setOrderSuccess('ordered');
                                        })
                                        }
                            }
                        });
                            
                    }
                        
                });

                    
            }
                       
                
        }
            
    })
        
});

    
}

    const openOrders = () => {
        dispatch(navbarSliceActions.currrentMenu({ menuName : "Orders" }));
        navigate('/');
    }

    const productQuantityRef = (
        <select defaultValue="1" onChange={productQuantityHandler}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
    )

    return (
        <div className="container-fluid">
            { (orderSuccess == '') && (
                <>
                <div className="row h4 mt-1 p-2">
                    Checkout
                </div>

                <div className="row">

                    <div className="col-md-4">
                        <div className="h5 mt-4">Review products</div>
                        {
                            list.map(product => (
                                <div className="card shadow shadow-lg mb-2">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <img src={product.image} alt="" width="130px" height="130px"/>
                                            </div>
                                            <div className="col">
                                                <div>Name : <b>{product.productName}</b></div><br />
                                                <div>Price : {product.price} / {product.quantity}</div><br />
                                                <div>Qunatity : { (params.page == 'cart')? (<span>{product.cartQuantity}</span>) :  productQuantityRef } </div> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div className="col-md-4">
                        <div className="card card-body shadow shadow-lg">
                            <div className="card-title text-center h5"><b>Order Information</b></div>
                            <div className="card-subtilte mt-3 text-muted">Please provide required informations to confirm your order</div>
                            <form action="" className="mt-3">
                                <div className="form-group mt-3">
                                    <label htmlFor="firstName">First Name</label>
                                    <input type="text" className="form-control" id="firstName" onKeyUp={() => formValidationHandler('firstName')} ref={ref => formDataRef.current.firstName = ref}/>
                                    {(formValidator['firstName']['type'] === 'error') && (<div className="mt-2 text-danger">{formValidator['firstName']['errorMessage']}</div>)}
                                </div>

                                <div className="form-group mt-3">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" className="form-control" id="lastName" ref={ref => formDataRef.current.lastName = ref}/>
                                </div>

                                <div className="form-group mt-3">
                                    <label htmlFor="addressline1">Address Line 1</label>
                                    <input type="text" className="form-control" id="addressline1" ref={ref => formDataRef.current.addressLine1 = ref}/>
                                </div>

                                <div className="form-group mt-3">
                                    <label htmlFor="addressline2">Address Line 2</label>
                                    <input type="text" className="form-control" id="addressline2" ref={ref => formDataRef.current.addressLine2 = ref}/>
                                </div>

                                <div className="form-group mt-3">
                                    <label htmlFor="mobileNumber">Mobile Number</label>
                                    <input type="tel" className="form-control" id="mobileNumber" ref={ref => formDataRef.current.mobileNumber = ref}/>
                                </div>

                                <div className="form-group mt-3">
                                    <label htmlFor="district">District</label>
                                    <input type="text" className="form-control" id="district" ref={ref => formDataRef.current.district = ref}/>
                                </div>

                                <div className="form-group mt-3">
                                    <label htmlFor="landmark">Landmark</label>
                                    <input type="text" className="form-control" id="landmark" ref={ref => formDataRef.current.landMark = ref}/>
                                </div>

                                <div className="row mt-3">
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="state">state</label>
                                            <input type="text" className="form-control" id="state" ref={ref => formDataRef.current.state = ref}/>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="pincode">Pincode</label>
                                            <input type="text" className="form-control" id="pincode" ref={ref => formDataRef.current.pincode = ref}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center mt-5">
                                    <button type="button" className="btn btn-md btn-dark" onClick={submitOrder}>Place your order</button>
                                </div>
                                
                            </form>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className={`card card-body shadow shadow-lg ${(deviceInfo === 'lg')? 'mt-5' : 'mt-2 mb-2'} `}>
                            <div className="card-title text-center h5"><b>Payment Information</b></div>
                            <div className="card-subtilte mt-3 text-muted">
                                <div>
                                    <input type="checkbox" id="cod" name="cod" className="form-check-input" checked onChange={e => {}}/>
                                    <label htmlFor="cod" className="form-check-label">&nbsp;&nbsp;Cash On Delivery</label>
                                </div>
                                <div className="mt-3">Currently we support only cash on delivery for all orders</div>
                            </div>
                        </div>
                        { (deviceInfo === 'lg') && <div className="background"></div> }
                    </div>
                </div>
                </>
            ) }

            {
                (orderSuccess == 'ordered') && (
                    <>
                        <div className="row street_shoppe_ordered_content">
                            <div className="col-md-12">
                                <h4 className="m-4">We Recieved your order !</h4>
                            </div>
                            <div className="col-md-12 mt-2 text-center">
                                <img src={orderSuccessLogo} alt="" width="200px" height="200px"/>
                                <h5>Thanks for your purchase with street shoppe !!</h5> 
                                <h6 className="mt-4">Please check orders for more details</h6>

                                <div className="mt-3 mb-3">
                                    {
                                        (newStreekInfo?.['purchase_total_amount'] == 0) && (
                                            <>
                                                <div className="text-success">Hurray ! New Streek unlocked </div>
                                                <span className="ri-fire-fill"></span> {newStreekInfo?.['purchase_streek']}
                                                <div>Purchase for minimum spend of INR {newStreekInfo?.['minimum_spend']} to unlock next step offer !</div>
                                            </>
                                        )
                                    }
                                    {
                                        (newStreekInfo?.['purchase_total_amount'] != 0) && (
                                            <> 
                                                <div className="text-success">Continue purchasing with min spend of INR {newStreekInfo?.['minimum_spend']} to unlock next streek</div>
                                            </>
                                        )
                                    }
                                </div>
                                

                                <div className="btn-group"> 
                                    <button className="btn btn-md btn-dark m-1">
                                        <Link to="/" className="street_shoppe_cart_link_text">Home</Link>
                                    </button>
                                    <button className="btn btn-md btn-dark m-1" onClick={openOrders}>
                                        Orders 
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
            
        </div>
    )
}

export default Checkout

/**
 * 
 * Code for saving billing address used for lated enhancements
 * 
 * {
     (userInfo.billingAddress.length > 0) && (<div className="mt-3 h5 text-muted">Select an existing address for current order</div>)
   }

    <div className="row street_shoppee_saved_address">
        {
            (userInfo.billingAddress.length > 0) && (
            userInfo.billingAddress.map((address) => (
                <div className="col-md-2">
                    <div className="card bg-light shadow shadow-lg">
                        <div className="card-body">
                            <div className="card-title">{address.name}</div>
                            <div className="card-subtitle text-muted">
                                { address.addressline1 } <br />
                                { address.addressline2 } <br />
                                { address.district } <br />
                                { address.state } - { address.pincode } <br />
                            </div>
                        </div>
                    </div>
                </div>
            ))
            )
        }
    </div>
*/