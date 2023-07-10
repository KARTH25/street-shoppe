import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from './navbar/components/Navbar';
import Home from './home/components/Home';
import Offcanvas from "./off-canvas/components/Offcanvas";
import Checkout from './checkout/components/Checkout';
import './App.css';
import DeviceInfo from "./services/DeviceInfo";
import Footer from "./footer/Footer";
import ToastAlert from "./toast-alert/components/ToastAlert";
import AdminWrapper from "./admin/components/admin-wrapper-component/AdminWrapper";

function App() {


  //const isViewScrolled = (e) => { console.log(e) };

  const deviceType = DeviceInfo();

  return (
    <div>
      <BrowserRouter>
        <ToastAlert />
        <Navbar />
        <div className={`${(deviceType === 'lg') ? 'street_shoppe_view_lg' : 'street_shoppe_view_sm'}`}>
          <Offcanvas />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/checkout/:page/:id' element={<Checkout />} />
            <Route path='/admin' element={<AdminWrapper />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
