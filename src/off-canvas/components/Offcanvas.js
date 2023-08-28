import React from "react";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { navbarSliceActions } from "../../store/navbarSlice";
import Cart from "../../cart/components/Cart";
import Status from "../../status/components/Status";


function Offcanvas(){

    const dispatch = useDispatch();

    const currentMenu = useSelector((state) => state.navbar.currentValue);

    const closeCartHandler = () => {
        dispatch(navbarSliceActions.currrentMenu({menuName : 'Close'}))
    }

    useEffect(() => {
        if(currentMenu === 'Cart' || currentMenu === "Orders" || currentMenu == "Close"){
            document.getElementById('cartToggleButton').click() 
        } 
    },[currentMenu]);

    return (
        <Fragment>
            <button className="btn btn-primary d-none" id="cartToggleButton" type="button" data-bs-toggle="offcanvas" data-bs-target="#cartoffcanvas" aria-controls="offcanvasRight">Toggle right offcanvas</button>

            <div className="offcanvas offcanvas-end" tabIndex="-1" id="cartoffcanvas" aria-labelledby="offcanvasRightLabel" data-bs-backdrop="static">
                <div className="offcanvas-header bg-light">
                    <h4 id="offcanvasRightLabel" className="text-center"><b>{currentMenu}</b></h4>
                    <button type="button" className="btn-close text-reset" aria-label="Close" onClick={closeCartHandler}></button>
                </div>
                <div className="offcanvas-body">
                   { currentMenu === 'Cart' && <Cart /> }  
                   { currentMenu === 'Orders' && <Status/> }  
                </div>
            </div>
        </Fragment>
    )
}

export default Offcanvas;