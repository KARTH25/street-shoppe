import axios from "axios";
import ProductCard from "../../product-card/components/ProductCard";
import macroon from '../../assets/macroons.svg';
import DeviceInfo from "../../services/DeviceInfo";

function Checkout(){

    const deviceInfo = DeviceInfo();

    const userInfo = { 
        email : 'xyz@gmail.com', 
        firstName : '',
        lastName : '',
        productsInCart : ['001','002'], // Holds the array of unique product id to display as liked product and also display the list in cart
        billingAddress : [
            { 'name' : 'Karthick', 'doorNumber' : '20', 'addressline1' : 'New street, paris tower, france', 'addressline2' : 'oppposite to new red building', 'district' : 'Chennai', 'state' : 'Tamilnadu', 'pincode' : '600008', 'contact' : '' },
            { 'name' : 'Karthick', 'doorNumber' : '20', 'addressline1' : 'New street, paris tower, france', 'addressline2' : 'oppposite to new red building', 'district' : 'Chennai', 'state' : 'Tamilnadu', 'pincode' : '600008', 'contact' : '' }
        ], // Holds the array of billing address which can be selected by the user as 
        orderInfo : [],
    }

    return (
        <div className="container-fluid">
            <div className="row">
                 <div className="mt-4 h5 text-muted">You are at the final step on placing your order !</div>
            </div>
            
            <div className="row">
                <ProductCard products={ { 'id' : 1, 'productName' : 'lifestyle 1', 'price' : '100.00', 'quantity' : '100g', 'image' : macroon, 'tag' : ['Mens Lifestyle'] } } actions="none"/>

                <div className="col-md-4">
                    <div className="card card-body shadow shadow-lg">
                        <div className="card-title text-center h5"><b>Order Information</b></div>
                        <div className="card-subtilte mt-3 text-muted">Please provide required informations to confirm your order</div>
                        <form action="" className="mt-3">
                            <div className="form-group mt-3">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" className="form-control" id="firstName" />
                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" className="form-control" id="lastName" />
                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="addressline1">Address Line 1</label>
                                <input type="text" className="form-control" id="addressline1" />
                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="addressline2">Address Line 2</label>
                                <input type="text" className="form-control" id="addressline2" />
                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="landmark">Landmark</label>
                                <input type="text" className="form-control" id="landmark" />
                            </div>

                            <div className="row mt-3">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="landmark">state</label>
                                        <input type="text" className="form-control" id="state" />
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="landmark">Landmark</label>
                                        <input type="text" className="form-control" id="landmark" />
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="landmark">Pincode</label>
                                        <input type="text" className="form-control" id="landmark" />
                                    </div>
                                </div>
                            </div>

                            <div className="text-center mt-5">
                                <button type="submit" className="btn btn-md btn-dark">Place your order</button>
                            </div>
                            
                        </form>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className={`card card-body shadow shadow-lg ${(deviceInfo == 'lg')? 'mt-5' : 'mt-2 mb-2'} `}>
                        <div className="card-title text-center h5"><b>Payment Information</b></div>
                        <div className="card-subtilte mt-3 text-muted">
                             <div>
                                <input type="checkbox" id="cod" name="cod" className="form-check-input" checked/>
                                <label htmlFor="cod" className="form-check-label">&nbsp;&nbsp;Cash On Delivery</label>
                             </div>
                             <div className="mt-3">Currently we support only cash on delivery for all orders</div>
                        </div>
                    </div>
                </div>
            </div>
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