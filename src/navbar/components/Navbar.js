import './Navbar.css';
import { DeviceInfo } from '../../services/DeviceInfo';
import { Link } from 'react-router-dom';

/**
 * Compatiblility : Both Mobile and Web
*/

function Navbar(){

    const deviceType = DeviceInfo();

    const menus = [
        //{ name : "Home", icon : 'ri-home-7-line stree_shoppe_menu_icon' },
        { name : 'Orders', icon : 'ri-book-mark-line', route : '/status' },
        { name : "Cart", icon : 'ri-shopping-cart-2-line', route : '/cart' },
        { name : "Profile", icon : 'ri-shield-user-line', route : '/profile' },
    ]

    const searchBar = (
        <div className={`${(deviceType === 'lg') ? 'col-md-4 d-flex align-items-center' : 'col-md-12'}`}>
            <input type="text" className='form-control' placeholder='Search Products' /> 
        </div>
    )

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
                          <Link to={menu.route} className="street_shoppe_link_text" key={index}>
                            <div className='m-3' key={index}>
                                <span className={menu.icon + ' stree_shoppe_menu_icon'}></span>
                            </div> 
                          </Link>
                        )) 
                    }
               </div>

               { (deviceType === 'sm') && searchBar }
           </div>
        </div>
    )
}

export default Navbar