import React from 'react'; 
import DeviceInfo from '../../services/DeviceInfo';
import macroons from '../../assets/macroons.svg'
import './Status.css';


function Status(){

    const deviceType = DeviceInfo();

    const orderStates = [
        { key : 'ordered', name : "Ordered" },
        { key : 'shipped', name : "Shipped" },
        { key : 'delivered', name : "Delivered" }
    ]

    const purchaseHistory = [
        { id : 123, name : 'Macroons', price : '100', quantity : '100g', date : '02/11/2022', image : macroons, ordered : true, shipped : false, delivered : false, cancelled : false },
        { id : 123, name : 'Macroons', price : '100', quantity : '100g', date : '02/11/2022', image : macroons, ordered : true, shipped : false, delivered : false, cancelled : false },
        { id : 123, name : 'Macroons', price : '100', quantity : '100g', date : '02/11/2022', image : macroons, ordered : true, shipped : true, delivered : true, cancelled : false },
        { id : 123, name : 'Macroons', price : '100', quantity : '100g', date : '02/11/2022', image : macroons, ordered : true, shipped : true, delivered : true, cancelled : false },
    ]

    return (
        <div className='container-fluild'>
            <div className="row">
                <div className="col-md-12 m-3 h4"><b>Order History</b></div>
            </div>
            <div className="row p-4">
                {
                   purchaseHistory.map((purchase, index) => (
                       <div className="col-md-12 card card-body mb-2 shadow shadow-lg" key={index}>
                           <div className={`align-items-center justify-content-around ${(deviceType == 'lg')? 'd-flex' : ''}`}>
                               <div className={`border border-light bg-light ${(deviceType == 'lg')? '' : 'text-center'}`}>
                                   <img src={purchase.image} alt="" width={`${(deviceType == 'lg')? '200px' : '150px'}`} height={`${(deviceType == 'lg')? '200px' : '150px'}`} className='p-2' />
                               </div>

                               <div className={`${(deviceType == 'lg')? '' : 'text-center'}`}>
                                   <b>Order Id :</b> # { purchase.id } <br /><br />
                                   <b>Order Name :</b> { purchase.name } <br /><br />
                                   <b>Order Price :</b> Rs { purchase.price } / { purchase.quantity } <br /><br />
                                   <b>Order Date :</b> { purchase.quantity } <br /><br />
                               </div>

                               <div className={`d-flex ${(deviceType == 'lg')? '' : 'justify-content-center'}`}>
                                  {
                                    orderStates.map((state, index) => (
                                        <React.Fragment key={index}>
                                            <div className='text-center'>
                                                <div className={`ri-checkbox-circle-fill stree_shoppe_status_icon ${(purchase[state.key] == true)? 'text-success' : 'text-dark'}`}></div>
                                                <div>{state.name}</div>
                                            </div>
                                            {
                                                (state.key != 'delivered') && <div className='mt-2'> ------------ </div>
                                            }
                                        </React.Fragment>
                                    ))
                                  }
                               </div>

                               <div className={`${(deviceType == 'lg')? '' : 'mt-3 text-center'}`}>
                                   <button className="btn btn-md btn-danger" disabled={purchase.shipped}>Cancel Order</button>
                               </div>
                           </div>
                       </div>
                   ))
                }
            </div>
        </div>
    )
}

export default Status