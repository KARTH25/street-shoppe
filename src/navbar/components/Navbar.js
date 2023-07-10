import './Navbar.css';
import { DeviceInfo } from '../../services/DeviceInfo';
import { useDispatch, useSelector } from 'react-redux';
import { navbarSliceActions } from '../../store/navbarSlice';
import { Link } from 'react-router-dom';
import bootstrapBundleMin from "bootstrap/dist/js/bootstrap.bundle.min";

/**
 * Compatiblility : Both Mobile and Web
*/

function Navbar(){

    const deviceType = DeviceInfo();

    const dispatch = useDispatch();

    const cartCount = useSelector(state => state.user.productsInCart) || [];

    const streekCount = useSelector(state => state.user.streekInfo?.['purchase_streek']) || 0;

    const streekInfo = useSelector(state => state.user.streekInfo) || {};


    const menus = [
        //{ name : "Home", icon : 'ri-home-7-line stree_shoppe_menu_icon' },
        { name : 'Streek', icon : 'ri-fire-fill', route : '', enableRouteForLargeDevice : false, enableRouteForSmallDevice : false, addBadge : true, badgeValue : streekCount },
        { name : 'Orders', icon : 'ri-book-mark-line', route : '/status', enableRouteForLargeDevice : false, enableRouteForSmallDevice : false, addBadge : false, badgeValue : "" },
        { name : "Cart", icon : 'ri-shopping-cart-2-line', route : '/cart', enableRouteForLargeDevice : false, enableRouteForSmallDevice : false, addBadge : true, badgeValue : cartCount.length },
        { name : "Profile", icon : 'ri-shield-user-line', route : '/admin', enableRouteForLargeDevice : true, enableRouteForSmallDevice : true, addBadge : false, badgeValue : "" },
    ]

    const currentSelectedMenu = (menuName) => {
        dispatch(navbarSliceActions.currrentMenu({menuName}))
    }

    const tooltip = () => {
        var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(function (popoverTriggerEl) {
          return new bootstrapBundleMin.Popover(popoverTriggerEl)
        })
    }

    const searchBar = (
        <div className={`${(deviceType === 'lg') ? 'col-md-4 d-flex align-items-center' : 'col-md-12'}`}>
            <input type="text" className='form-control' placeholder='Search Products' /> 
        </div>
    )

    console.log(streekInfo);

    const remaining_spend = (1 - (streekInfo?.next_streek_purchase_amount - streekInfo?.purchase_total_amount)/streekInfo?.next_streek_purchase_amount) * 100;

    console.log(remaining_spend);

    const progress = `
    <div>Purchased : ${streekInfo?.purchase_total_amount} / ${streekInfo?.next_streek_purchase_amount}</div>
    <div class="progress ml-2">
        <div class="progress-bar" role="progressbar" aria-valuenow="10" style="width: 10%"  aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    `

    console.log(progress);

    return (
        <div className="container-fluid">
           <div className={`row street_shoppe_navbar_primary ${(deviceType === 'lg')? 'street_shoppe_navbar_lg' : 'street_shoppe_navbar_sm'}`}>
               <div className={`d-flex align-items-center ${(deviceType === 'lg')? 'col-md-4' : 'col-8'}`}>
                <Link to="/" className='street_shoppe_link_text' style={{'cursor' : 'pointer'}}>
                   <div className="text-light stree_shoppe_brand_icon"><b>Street Shoppe</b></div>
                </Link>
               </div>

               { (deviceType === 'lg') && searchBar }

               <div className={`d-flex align-items-center justify-content-end text-dark ${(deviceType === 'lg')? 'col-md-4' : 'col-4'}`}>
                    { 
                        menus.map((menu,index) => (
                          
                            ((deviceType === 'sm' && menu.enableRouteForSmallDevice === true) || (deviceType === 'lg' && menu.enableRouteForLargeDevice === true))? (
                                <Link to={menu.route} className="street_shoppe_link_text" key={index}>
                                    <div className='m-3 position-relative' key={index}>
                                        <button className='btn bg-transparent' data-bs-toggle="popover" data-bs-html="true" title="Popover title" data-bs-content={progress} onClick={tooltip}>
                                            <span className={menu.icon + ' stree_shoppe_menu_icon'}></span>
                                            { menu.addBadge && <div className="position-absolute top-0 start-60 translate-middle badge rounded-pill bg-danger mt-2">{menu.badgeValue}</div> }
                                        </button> 
                                    </div> 
                                </Link>
                            ) : 
                            (
                                <div className='m-3 position-relative' key={index} onClick={() => currentSelectedMenu(menu.name)}>
                                    <button className='btn bg-transparent' data-bs-toggle="popover" data-bs-html="true" title="Popover title" data-bs-content={progress} onClick={tooltip}>
                                        <span className={menu.icon + ' stree_shoppe_menu_icon'}></span>
                                        { menu.addBadge && <div className="position-absolute top-0 start-60 translate-middle badge rounded-pill bg-danger mt-2">{menu.badgeValue}</div> } 
                                    </button>
                                </div>
                            )
                        )) 
                    }
               </div>

               { (deviceType === 'sm') && searchBar }
           </div>
        </div>
    )
}

export default Navbar;

/**
 * 
 * *
*/