import { useState } from 'react';
import { useSelector } from 'react-redux';
import DeviceInfo from '../../services/DeviceInfo';
import ProductCard from '../../product-card/components/ProductCard';
import './ProductList.css';

/**
 * Compatiblility : Both Mobile and Web
*/

function ProductList(){

    const deviceType = DeviceInfo();

    const categories = useSelector(state => state.uiConfigs.uiConfigs.categories) || [];

    const productList = useSelector(state => state.uiConfigs.uiConfigs.products) || {};

    const list = [];

    console.log(categories, productList);

    if(Object.keys(productList).length > 0){
        Object.keys(productList).forEach((key) => {
            list.push({ id : key, ...productList[key] });  
        })
    }
 
    const [currentCategory, setCurrentCategory] = useState('Food');

   return (
      <div className="container-fluid">
        { /* Product Categories */ }
        <div className="row">
            <div className={`col-md-12 bg-light d-flex justify-content-around align-items-center street_shoppe_categories`}>
                { 
                    categories.map((category, index) => (
                        <div className={`m-1 ${(currentCategory === category)? 'h3' : 'h4'}`} style={{'cursor' : 'pointer'}} key={index} onClick={() => setCurrentCategory(category)}>
                            <span className={`badge rounded-pill ${(currentCategory === category)? 'bg-dark text-light' : 'bg-light text-dark'}`}>{category}</span>
                        </div> 
                    )) 
                }
            </div>
        </div>

        { /* Product list based on selected category */ }
        <div className={`row productlist-background`}>
            <div className={`d-flex ${(deviceType === 'lg')? '' : 'mt-3'} street_shoppe_product_list`} style={{"overflow" : "scroll"}}>  
            {
                list.map((product, index) => (
                   (product.tag.includes(currentCategory)) && <ProductCard key={index} products={product}/>
                ))
            }
            </div>
        </div>
      </div>
   )
} 

export default ProductList