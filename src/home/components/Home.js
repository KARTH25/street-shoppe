import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Deals from "../../deals/components/Deals"
import ProductList from "../../product-list/components/ProductList"
import { userDataSliceActions } from "../../store/userDataSlice";
import { uiSliceActions } from "../../store/uiSlice";
import { baseApiCallService } from "../../services/baseApiCallService";

function Home(){

    const dispatch = useDispatch();
 
    useEffect(() => {

      baseApiCallService.get('/api/data/user/karthick/cart.json').then(res => {
        if(res.status === 200 && res.data){
            dispatch(userDataSliceActions.updateProductsInCart({ productsInCart : res.data }));
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