import DeviceInfo from '../../services/DeviceInfo';
import  macroonLogo from '../../assets/macroons.svg';
import Swal from 'sweetalert2';
import './Cart.css';

/**
 * Compatiblility : Both Mobile and Web
*/

function Cart(){

    const deviceType = DeviceInfo();

    const confirmAlert = () => { 
        Swal.fire({
           title : 'Confirm',
           text : 'Please confirm removal of this product from cart',
           showConfirmButton : true,
           showCancelButton : true,
           confirmButtonText : 'Remove',
           cancelButtonColor : 'Cancel',
           confirmButtonColor : 'black',
        }) 
    }

    const list = [
        { 'id' : 1, 'productName' : 'lifestyle 1', 'price' : '100.00', 'quantity' : '100g', 'image' : macroonLogo, 'tag' : ['Mens Lifestyle'] },
        { 'id' : 2, 'productName' : 'lifestyle 2', 'price' : '100.00', 'quantity' : '100g', 'image' : macroonLogo, 'tag' : ['Womens Lifestyle'] },
        { 'id' : 3, 'productName' : 'Food 1', 'price' : '100.00', 'quantity' : '100g', 'image' : macroonLogo, 'tag' : ['food'] },
        { 'id' : 4, 'productName' : 'Food 2', 'price' : '100.00', 'quantity' : '100g', 'image' : macroonLogo, 'tag' : ['food'] },
    ]

    return (
        // Cart Base container
        <div className="container-fluid">
            <div className={`p-3 ${(deviceType === 'lg')? 'street_shoppe_cart_content_lg' : 'street_shoppe_cart_content_sm'}`}>
            {
                // Iterate through each item in list
                list.map((product, index) => (
                    // Card
                    <div className="row shadow p-1 mb-3" key={index}>
                        {/* Image and Product name */}
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
                                        <button className="btn btn-md btn-outline-primary">+</button>
                                        <button className="btn btn-md btn-light m-1 disabled">3</button>
                                        <button className="btn btn-md btn-outline-primary">-</button>
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
                     <span className='h6'>6</span>
                </div>
            </div>

            <div className="row mt-2">
                <div className="col text-end">
                        <h5>Total Amount</h5>
                    </div>
                    <div className="col text-end">
                        <span className='h6'>1000</span>
                </div>
            </div>

            <div className="row mt-2">
                <button className="btn btn-dark">Checkout</button>
            </div>
            
        </div>
    )
}

export default Cart