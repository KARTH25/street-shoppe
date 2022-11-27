import './Deals.css';
import DeviceInfo from '../../services/DeviceInfo';
import ProductCard from '../../product-card/components/ProductCard';
import  macroonLogo from '../../assets/macroons.svg';
import peanutCandy from '../../assets/peanutcandy.svg';
import healthMix from '../../assets/healthmix.svg';

/**
 * Compatiblility : Both Mobile and Web
*/

function Deals(){

    const deviceType = DeviceInfo();

    // Deals
    const deals = [
        { 'id' : 1, 'productName' : 'Peanut Candy', 'price' : '100.00', 'quantity' : '100g', 'image' : peanutCandy, },
        { 'id' : 2, 'productName' : 'Macroons', 'price' : '100.00', 'quantity' : '100g', 'image' : macroonLogo },
        { 'id' : 3, 'productName' : 'Health Mix', 'price' : '100.00', 'quantity' : '100g', 'image' : healthMix}
    ]

    return(
        <div>
            { /* Displaying Deals section only if deals available */ }
            {(deals.length > 0) && (
                <div style={{'minHeight' : (deviceType === 'lg')? "700px" : "460px"}}>
                    <div className="container-fluid street_shoppe_deal_card">

                        { /* Deals Header */}
                        <div className="row">
                            <div className="col-md-12 mt-3">
                                <div className="h3">Top Deals <span className='badge bg-primary'>#only_on_Street_Shoppee</span> </div>
                            </div>
                        </div>

                        { /* Iterating Deals list */}
                        <div className={`row ${(deviceType === 'lg')? '' : 'street_shoppee_deals'}`}>
                            <div className={`${(deviceType === 'lg')? 'd-flex' : 'd-flex'}`}>
                                {
                                    deals.map((deal, index) => (
                                        <ProductCard key={index} products={deal} /> 
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div> 
    ) 

}

export default Deals