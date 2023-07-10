import React from 'react';
import { useSelector } from 'react-redux';
import DeviceInfo from '../../services/DeviceInfo';
import ProductCard from '../../product-card/components/ProductCard';
import './Deals.css';

/**
 * Compatiblility : Both Mobile and Web
*/

function Deals(){

    const deviceType = DeviceInfo();

    // Deals
    const dealsList = useSelector(state => state.uiConfigs.uiConfigs.products) || {};

    const deals = [];

    if(Object.keys(dealsList).length > 0){
        Object.keys(dealsList).forEach((key) => {
            if(dealsList[key]['pod'] != undefined && dealsList[key]['pod'] == 'true'){
                deals.push({ id : key, ...dealsList[key] });
            } 
        })
    }

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
                            <div className={`${(deviceType === 'lg')? 'd-flex' : 'd-flex'}`} style={{"overflow" : "scroll"}}>
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