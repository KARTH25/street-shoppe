import { useState } from 'react';
import DeviceInfo from '../../services/DeviceInfo';
import ProductCard from '../../product-card/components/ProductCard';
import macroon from '../../assets/macroons.svg';
import './ProductList.css';

/**
 * Compatiblility : Both Mobile and Web
*/

function ProductList(){

    const deviceType = DeviceInfo();

    const categories = ['food','Kids','Mens Lifestyle','Womens Lifestyle'];

    const list = [
        { 'id' : 1, 'productName' : 'lifestyle 1', 'price' : '100.00', 'quantity' : '100g', 'image' : macroon, 'tag' : ['Mens Lifestyle'] },
        { 'id' : 2, 'productName' : 'lifestyle 2', 'price' : '100.00', 'quantity' : '100g', 'image' : macroon, 'tag' : ['Womens Lifestyle'] },
        { 'id' : 3, 'productName' : 'Food 1', 'price' : '100.00', 'quantity' : '100g', 'image' : macroon, 'tag' : ['food'] },
        { 'id' : 4, 'productName' : 'Food 2', 'price' : '100.00', 'quantity' : '100g', 'image' : macroon, 'tag' : ['food'] },
    ]
    
    const [currentCategory, setCurrentCategory] = useState('food');

   return (
      <div className="container-fluid">
        { /* Product Categories */ }
        <div className="row">
            <div className={`col-md-12 bg-light d-flex justify-content-around align-items-center ${(deviceType === 'lg')? '' : 'street_shoppe_categories_sm'}`}>
                { 
                    categories.map((category, index) => (
                        <div className={ `m-1 ml-5 ${(currentCategory === category)? 'h3' : 'h4'}`} style={{'cursor' : 'pointer'}} key={index} onClick={() => setCurrentCategory(category)}>
                            <span className={`badge rounded-pill ${(currentCategory === category)? 'bg-dark text-light' : 'bg-light text-dark'}`}>{category}</span>
                        </div> 
                    )) 
                }
            </div>
        </div>

        { /* Product list based on selected category */ }
        <div className="row mt-1">
            {
                list.map((product, index) => (
                   (product.tag.includes(currentCategory)) && <ProductCard key={index} products={product}/>
                ))
            }
        </div>
      </div>
   )
} 

export default ProductList