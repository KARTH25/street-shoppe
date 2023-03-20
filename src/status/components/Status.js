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
            <div className="row p-4">
                {
                   purchaseHistory.map((purchase, index) => (
                       <div className="col-md-12 card card-body mb-2 shadow shadow-lg" key={index}>
                           <div className={`d-flex align-items-start justify-content-start`}>
                               <div className={`border border-light bg-light`}>
                                   <img src={purchase.image} alt="" width="150px" height="150px"/>
                               </div>

                               <div className="m-2">
                                   <b>Id :</b> # { purchase.id } <br />
                                   <b>Name :</b> { purchase.name } <br />
                                   <b>Price :</b> Rs { purchase.price } <br />
                                   <b>Quantity :</b> { purchase.quantity } <br />
                               </div>
                           </div>
                           <div className="d-flex justify-content-center">
                                  {
                                    orderStates.map((state, index) => (
                                        <React.Fragment key={index}>
                                            <div className='text-center'>
                                                <div className={`ri-checkbox-circle-fill stree_shoppe_status_icon ${(purchase[state.key] === true)? 'text-success' : 'text-dark'}`}></div>
                                                <div>{state.name}</div>
                                            </div>
                                            {
                                                (state.key !== 'delivered') && <div className='mt-2'> ------- </div>
                                            }
                                        </React.Fragment>
                                    ))
                                  }
                            </div>

                            <div className="mt-3 text-center">
                                   <button className="btn btn-md btn-danger" disabled={purchase.shipped}>Cancel Order</button>
                            </div>
                       </div>
                   ))
                }
            </div>
        </div>
    )
}

export default Status