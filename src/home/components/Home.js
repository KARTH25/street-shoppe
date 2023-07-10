import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Deals from "../../deals/components/Deals"
import ProductList from "../../product-list/components/ProductList"
import { userDataSliceActions } from "../../store/userDataSlice";
import { uiSliceActions } from "../../store/uiSlice";
import { baseApiCallService } from "../../services/baseApiCallService";

function Home(){

    const dispatch = useDispatch();

    const orders = useSelector(state => state.user.orders) || [];
 
    useEffect(() => {

      baseApiCallService.get('/api/data/user/karthick/cart.json').then(res => {
        if(res.status === 200 && res.data){
            dispatch(userDataSliceActions.updateProductsInCart({ productsInCart : res.data }));
        }
      });

      baseApiCallService.get('/api/data/orders/karthick.json').then(res => {
        if(res.status == 200 && res.data){
          dispatch(userDataSliceActions.updateStreekInfo({ streekInfo : res.data }));
          dispatch(userDataSliceActions.updateOrders({ orders : res.data['orders'] }));
        }
      })

      baseApiCallService.get('/api/data/streetshoppe.json').then(res => {
        if(res.status === 200 && res.data){
            console.log(res.data);
            dispatch(uiSliceActions.updateConfigs({ uiConfigs : res.data }));
        }
      })

    }, []);

    return (
      <div>
        <Deals/>
        <ProductList/>
      </div>
    )
}

export default Home