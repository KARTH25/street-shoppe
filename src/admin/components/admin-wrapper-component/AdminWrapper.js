import React, { useState } from "react";
import Inventory from "../inventory-component/Inventory";
import Orders from "../orders-component/Orders";
import './AdminWrapper.css';

function AdminWrapper(){

    const [currentTab, setCurrentTab] = useState('Inventory');

    const tabs = ['Inventory','Deals','Orders','Sales'];

    const changeTab = (tab) => {
        setCurrentTab(tab)
    }
 
    return (
        <div className="container-fluid street_shoppe_bg">
            <div className="row mt-5">
                {
                    tabs.map(tab => (
                        <div className="col-md-1" key={tab}> 
                            <button className={`btn btn-md ${(currentTab === tab)? 'btn-dark' : 'btn-light'}`} style={{borderRadius : '30px'}} onClick={() => changeTab(tab)}>{tab}</button>
                        </div>
                    ))
                }
            </div>
            <div className="row">
                {
                    (currentTab == 'Inventory') && (<Inventory />)
                }
                {
                    (currentTab == 'Orders') && (<Orders />)
                }
            </div>
        </div>
    )

}

export default AdminWrapper;