import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import Navbar from './navbar/components/Navbar';
import Home from './home/components/Home';
import Cart from './cart/components/Cart';
import Checkout from './checkout/components/Checkout';
import Status from './status/components/Status';
import './App.css';
import DeviceInfo from "./services/DeviceInfo";


function App() {

  const isViewScrolled = (e) => { console.log(e) }

  const deviceType = DeviceInfo();

  return (
    <div>
      <BrowserRouter> 
         <Navbar />
         <div className={`${(deviceType == 'lg')? 'street_shoppe_view_lg' : 'street_shoppe_view_sm'}`} onScroll={isViewScrolled()}>
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/status' element={<Status />} />
          </Routes>
         </div>
       </BrowserRouter>
    </div>
  );
}

export default App;
