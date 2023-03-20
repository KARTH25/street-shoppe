import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import Navbar from './navbar/components/Navbar';
import Home from './home/components/Home';
import Offcanvas from "./off-canvas/components/Offcanvas";
import Checkout from './checkout/components/Checkout';
import Status from './status/components/Status';
import './App.css';
import DeviceInfo from "./services/DeviceInfo";
import Footer from "./footer/Footer";
import ToastAlert from "./toast-alert/components/ToastAlert";
import Product from "./admin/components/products-component/Product";

function App() {

  //const isViewScrolled = (e) => { console.log(e) };

  const deviceType = DeviceInfo();

  return (
    <div>
      <BrowserRouter> 
         <ToastAlert />
         <Navbar />
         <div className={`${(deviceType === 'lg')? 'street_shoppe_view_lg' : 'street_shoppe_view_sm'}`}>
          <Offcanvas />
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/admin' element={<Product />} />
          </Routes>
          <Footer/>
         </div>
       </BrowserRouter>
    </div>
   
  );
}

export default App;
