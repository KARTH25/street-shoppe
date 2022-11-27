import DeviceInfo from '../../services/DeviceInfo';
import  macroonLogo from '../../assets/macroons.svg';

/**
 * Compatiblility : Both Mobile and Web
*/

function Cart(){

    const deviceType = DeviceInfo();

    const list = [
        { 'id' : 1, 'productName' : 'lifestyle 1', 'price' : '100.00', 'quantity' : '100g', 'image' : macroonLogo, 'tag' : ['Mens Lifestyle'] },
        { 'id' : 2, 'productName' : 'lifestyle 2', 'price' : '100.00', 'quantity' : '100g', 'image' : macroonLogo, 'tag' : ['Womens Lifestyle'] },
        { 'id' : 3, 'productName' : 'Food 1', 'price' : '100.00', 'quantity' : '100g', 'image' : macroonLogo, 'tag' : ['food'] },
        { 'id' : 4, 'productName' : 'Food 2', 'price' : '100.00', 'quantity' : '100g', 'image' : macroonLogo, 'tag' : ['food'] },
    ]

    return (
        // Cart Base container
        <div className="container-fluid p-5">
            {
                // Iterate through each item in list
                list.map((product, index) => (
                    // Card
                    <div className="row shadow shadow-lg bg-light p-3 mb-3">
                        {/* Image and Product name */}
                        <div className={`col-md-8 ${(deviceType === 'lg') ? '' : 'text-center'}`}>
                            <div className={`${(deviceType === 'lg') ? 'd-flex' : ''}`}>
                                
                                {/* Product Image */}
                                <img src={product.image} alt="" width="200px" height="200px" className="m-3" />
                                
                                {/* Product Name and Price / Quantity */}
                                <div className={`${(deviceType === 'lg') ? 'm-5' : 'text-center'}`}>
                                    <div><b>{product.productName}</b></div>
                                    <div className={`${(deviceType === 'lg') ? 'mt-2' : ''}`}>&#8377; {product.price} /  {product.quantity}</div>
                                </div>

                            </div>
                        </div>

                        {/* Cart Actions Checkout and Remove */}
                        <div className={`col-md-4 d-block ${(deviceType === 'lg') ? 'mt-3 text-end' : 'mt-2 text-center'}`}>
                            <button className="btn btn-md btn-dark m-1">Checkout</button>
                            <button className="btn btn-md btn-danger m-1">Remove</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Cart