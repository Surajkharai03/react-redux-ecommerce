import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Products = () => {
  const products = useSelector(
    (state) => state.productsReducer.products
  );

  const renderproducts = products.map((product) => {
    return (
      <div
        key={product.id}
        className="group w-[340px] h-[650px] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
      >
        {/* IMAGE */}
        <div className="w-full h-[300px] bg-gray-100 flex items-center justify-center p-6 shrink-0 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* DETAILS */}
        <div className="p-5 flex flex-col flex-1">
          
          {/* CATEGORY */}
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400 h-[18px]">
            {product.category}
          </p>

          {/* TITLE */}
          <h1 className="text-lg font-semibold text-gray-900 mt-2 leading-6 line-clamp-2 h-[48px]">
            {product.title}
          </h1>

          {/* DESCRIPTION */}
          <p className="text-sm text-gray-500 mt-3 leading-5 line-clamp-3 h-[60px]">
            {product.description}
          </p>

          {/* PRICE */}
          <p className="text-2xl font-bold text-green-600 mt-4">
            ₹
            {Number(product.price).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>

          {/* BUTTONS */}
          <div className="mt-auto pt-5">
            
            {/* ADD TO CART + VIEW */}
            <div className="flex gap-3">
              
              <button
                className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-medium py-2.5 rounded-lg transition-colors duration-200"
              >
                Add to Cart
              </button>

              <Link
                to={`/products/${product.id}`}
                className="bg-slate-800 hover:bg-slate-900 text-white font-medium px-6 py-2.5 rounded-lg transition-colors duration-200"
              >
                View
              </Link>

            </div>

            {/* MORE INFO */}
            <Link
              to={`/product/${product.id}`}
              className="block w-full text-center mt-3 border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white font-medium py-2.5 rounded-lg transition-colors duration-200"
            >
              More Info
            </Link>

          </div>
        </div>
      </div>
    );
  });

  return products.length > 0 ? (
    <div className="w-full min-h-screen bg-slate-800 overflow-x-hidden">
      
      <div className="w-full p-6">
        
        <div className="w-full flex flex-wrap gap-8">
          {renderproducts}
        </div>

      </div>
    </div>
  ) : (
    <div className="w-full min-h-screen bg-slate-800 flex items-center justify-center text-white">
      Loading...
    </div>
  );
};

export default Products;