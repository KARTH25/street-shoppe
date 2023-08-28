import React, { useEffect, useState } from "react";
import { orderGridConstants } from "../../constants/OrderGridConstants";
import UiGrid from "../../../grid/components/Grid";
import { baseApiCallService } from "../../../services/baseApiCallService";

function Orders(){

    // state to get and set selected rows initialized with null
    const [selectedRows, setSelectedRows] = useState(null);
    // state to clear all selected Rows
    const [clearAllRows, setClearAllRows] = useState(false);

    // State to store order list
    const [orderList, setOrderList] = useState([]);

    // Method to get selected rows
    const getSelectedRows = (rows) => {
        setSelectedRows(rows);
        setClearAllRows(false);
    }

    useEffect(() => {
        baseApiCallService.get('/api/data/orders.json').then(res => {
            if(res.status == 200 && res.data){
                let data = [];
                let keys = [];
                Object.keys(res.data).forEach((user) => {
                  Object.keys(res.data[user]['orders']).forEach((order) => {
                       data.push({ ...res.data[user]['orders'][order]['orders'], id : order });
                  })
                });
                console.log(data);
                setOrderList(data);
            }
        })
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6">
                    <div>
                        
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-12">
                    <UiGrid selectedRows={getSelectedRows} data={orderList} gridMetaData={orderGridConstants} deselectAll={clearAllRows}></UiGrid>
                </div>
            </div>
        </div>
    )

}

export default Orders;