import React, { useState } from 'react'; 
import DeviceInfo from '../../services/DeviceInfo';
import { useSelector, useDispatch } from 'react-redux';
import { baseApiCallService } from '../../services/baseApiCallService';
import { notifierSliceActions } from '../../store/notifierSlice';
import { userDataSliceActions } from '../../store/userDataSlice';
import './Status.css';


function Status(){

    const deviceType = DeviceInfo();

    const dispatch = useDispatch();

    const orderStates = [
        { key : 'ordered', name : "Ordered" },
        { key : 'shipped', name : "Shipped" },
        { key : 'delivered', name : "Delivered" }
    ]

    const orders = useSelector(state => state.user.orders) || {};

    console.log("order updated in status page")

    const [cancellationProduct, setCancellationProduct] = useState('');

    const [cancellationReason, setCancellationReason] = useState('');

    const cancelOrder = (id) => {

        console.log(id);

        baseApiCallService.patch(`/api/data/orders/karthick/orders/${id}/orders.json`, { cancelled : true }).then(res => {
            if(res.status == 200){
                dispatch(notifierSliceActions.alertInfo({alertInfo : { showAlert : true, message : 'Order cancelled successfully !', type : 'success' } }));

                baseApiCallService.get(`/api/data/orders/karthick/orders.json`).then(res => {
                    if(res.status == 200 && res.data){
                        setCancellationProduct('');
                        setCancellationReason('');
                        dispatch(userDataSliceActions.updateOrders({ orders : res.data }));
                    }
                })
            }

            })
    }

    const purchaseList = []; 
    const purchaseHistory = [];
    
    Object.keys(orders).forEach((id) => {
        let orderInfo = orders[id]['orders'];
        purchaseList.push({ orderId : id, ...orderInfo });
    });

    let sortedList = { ordered : [], shipped : [], cancelled : [], delivered : []  }
    
    purchaseList.forEach((list) => {
        if(list?.cancelled == true)
           sortedList['cancelled'].push(list);
        else if(list?.shipped == true)
           sortedList['shipped'].push(list);
        else if(list?.ordered == true)
            sortedList['shipped'].push(list);
        else if(list?.delivered == true)
            sortedList['delivered'].push(list);
    });
    
    purchaseHistory.push(...sortedList.ordered);
    purchaseHistory.push(...sortedList.shipped);
    purchaseHistory.push(...sortedList.delivered);
    purchaseHistory.push(...sortedList.cancelled);

    console.log(purchaseHistory);

    return (
        <div className='container-fluild'>
            <div className="row p-3">
                {
                   purchaseHistory.map((purchase, index) => (
                       <div className="col-md-12 card mb-2 shadow shadow-lg" key={index}>
                          <div className="card-body">
                            <div>Order Id : {purchase.orderId}</div>
                            <div className={`d-flex align-items-start justify-content-start mt-3`}>
                                <div className={`border border-light bg-light`}>
                                    <img src={purchase.image} alt="" width="150px" height="150px"/>
                                </div>

                                <div className="m-2">
                                    <b>Name :</b> { purchase.productName } <br />
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
                            {
                                (cancellationProduct == purchase.id) && (
                                    <div className='mt-5'>
                                        <div className="form-group">
                                            <label htmlFor="reason" className="form-label">Reason for cancellation</label>
                                            <input type="text" className='form-control' placeholder='Enter Reason'  onKeyUp={(e) => setCancellationReason(e.target.value)}/>
                                        </div>
                                        <div className="mt-3 text-center">
                                           <button className="btn btn-md btn-danger" disabled={cancellationReason.length <= 0} onClick={() => cancelOrder(purchase.orderId)}>Confirm</button>
                                           <button className="btn btn-md btn-secondary m-1" onClick={() => setCancellationProduct('')}>Cancel</button>
                                        </div>
                                    </div>
                                    
                                )
                            }
                            {
                                (cancellationProduct !== purchase.id) && (
                                    <div className="mt-3 text-center">
                                        <button className="btn btn-md btn-danger" disabled={purchase.shipped || purchase.cancelled} onClick={() => setCancellationProduct(purchase.id)}>Cancel Order</button>
                                    </div>
                                )
                            }
                          </div>
                       </div>
                   ))
                }
                {
                    (purchaseHistory.length == 0) && (
                        <div className='text-muted text-center h4'>
                            No orders to ship !!
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Status