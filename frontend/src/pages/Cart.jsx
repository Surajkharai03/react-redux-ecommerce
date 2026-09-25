import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  asyncremovefromcart,
  asyncupdatecart,
} from "../store/actions/userAction";


const Cart = () => {

  const dispatch = useDispatch();


  const users = useSelector(
    (state) => state.usersReducer.users
  );

  const products = useSelector(
    (state) => state.productsReducer.products
  );


  // 
  // IF USER NOT LOGGED IN
  // 

  if (!users) {

    return (

      <div className="min-h-screen bg-slate-800 flex items-center justify-center text-white">

        <div className="text-center">

          <h1 className="text-3xl font-bold">
            Please Login
          </h1>

          <Link
            to="/login"
            className="inline-block mt-5 bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-lg"
          >
            Login
          </Link>

        </div>

      </div>

    );

  }


  // 
  // CART
  // 

  const cart = users.cart || [];


  // 
  // GET PRODUCT DETAILS
  // 

  const cartProducts = cart
    .map((cartItem) => {

      const product = products.find(
        (p) =>
          String(p.id) === String(cartItem.id)
      );

      if (!product) {
        return null;
      }

      return {
        ...product,
        quantity: cartItem.quantity,
      };

    })
    .filter(Boolean);


  // 
  // INCREASE QUANTITY
  //

  const increaseQuantity = (
    id,
    quantity
  ) => {

    dispatch(
      asyncupdatecart(
        users.id,
        id,
        quantity + 1
      )
    );

  };


  // 
  // DECREASE QUANTITY
  // 

  const decreaseQuantity = (
    id,
    quantity
  ) => {

    if (quantity === 1) {

      dispatch(
        asyncremovefromcart(
          users.id,
          id
        )
      );

      return;
    }


    dispatch(
      asyncupdatecart(
        users.id,
        id,
        quantity - 1
      )
    );

  };


  // 
  // REMOVE PRODUCT
  // 

  const removeItem = (id) => {

    dispatch(
      asyncremovefromcart(
        users.id,
        id
      )
    );

  };


  // TOTAL


  const total = cartProducts.reduce(
    (sum, product) =>
      sum +
      Number(product.price) *
      product.quantity,
    0
  );



  // EMPTY CART
  

  if (cartProducts.length === 0) {

    return (

      <div className="min-h-screen bg-slate-800 flex items-center justify-center text-white">

        <div className="text-center">

          <h1 className="text-4xl font-bold">
            Your Cart is Empty
          </h1>

          <p className="text-gray-300 mt-3">
            Add some products to your cart.
          </p>

          <Link
            to="/"
            className="inline-block mt-6 bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-lg"
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    );

  }



  // CART UI


  return (

    <div className="min-h-screen bg-slate-800 p-6">

      <h1 className="text-4xl font-bold text-white mb-8">
        Shopping Cart
      </h1>


      <div className="grid lg:grid-cols-3 gap-8">


        {/* 
            CART ITEMS
         */}

        <div className="lg:col-span-2 space-y-5">

          {cartProducts.map((product) => (

            <div
              key={product.id}
              className="bg-white rounded-xl p-5 flex gap-5"
            >


              {/* IMAGE */}

              <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">

                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain p-3"
                />

              </div>


              {/* DETAILS */}

              <div className="flex-1">

                <h2 className="text-lg font-semibold text-gray-900">
                  {product.title}
                </h2>


                <p className="text-green-600 font-bold text-xl mt-2">

                  ₹
                  {Number(
                    product.price
                  ).toLocaleString(
                    "en-IN",
                    {
                      minimumFractionDigits: 2,
                    }
                  )}

                </p>


                {/* QUANTITY */}

                <div className="flex items-center gap-3 mt-4">

                  <button
                    onClick={() =>
                      decreaseQuantity(
                        product.id,
                        product.quantity
                      )
                    }
                    className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg text-black"
                  >
                    -
                  </button>


                  <span className="font-semibold text-black">
                    {product.quantity}
                  </span>


                  <button
                    onClick={() =>
                      increaseQuantity(
                        product.id,
                        product.quantity
                      )
                    }
                    className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg text-black"
                  >
                    +
                  </button>

                </div>


                {/* REMOVE */}

                <button
                  onClick={() =>
                    removeItem(product.id)
                  }
                  className="text-red-500 mt-4 hover:text-red-700"
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

        </div>


        {/* 
            ORDER SUMMARY
        */}

        <div className="bg-white rounded-xl p-6 h-fit">

          <h2 className="text-2xl font-bold text-gray-900">
            Order Summary
          </h2>


          <div className="flex justify-between mt-6 text-gray-700">

            <span>
              Items
            </span>

            <span>

              {cartProducts.reduce(
                (sum, product) =>
                  sum + product.quantity,
                0
              )}

            </span>

          </div>


          <div className="border-t my-5"></div>


          <div className="flex justify-between text-xl font-bold">

            <span>
              Total
            </span>

            <span className="text-green-600">

              ₹
              {total.toLocaleString(
                "en-IN",
                {
                  minimumFractionDigits: 2,
                }
              )}

            </span>

          </div>


          <button
            className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold"
          >
            Checkout
          </button>

        </div>

      </div>

    </div>

  );

};

export default Cart;