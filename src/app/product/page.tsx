
import ProductsTable from './ProductsTable';


// Assigning types for variable
interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
}


interface ProductsResponse {
  products: Product[];
}
// ProductsPage component is an async function that fetches product data
const ProductsPage = async () => {
  

  const response = await fetch('https://dummyjson.com/products');
  const data: ProductsResponse = await response.json();
  const productss: Product[] = data.products;
 
  

  return (
    
    
    // Rendering the ProductsTable component, passing the products as props
    <div> 
      <ProductsTable products={productss} />
    </div>
  );
};

export default ProductsPage;
