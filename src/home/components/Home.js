import Deals from "../../deals/components/Deals"
import ProductCard from "../../product-card/components/ProductCard"
import ProductList from "../../product-list/components/ProductList"

function Home(){
    return (
      <div>
        <Deals/>
        <ProductList/>
      </div>
    )
}

export default Home