import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  asyncupdateproduct,
  asyncdeleteproduct,
} from "../../store/actions/productAction";

const ProductDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();


  // GET PRODUCTS FROM REDUX
 

  const products = useSelector(
    (state) => state.productsReducer.products
  );

  // GET CURRENT USER FROM REDUX
 

  const user = useSelector(
    (state) => state.usersReducer.users
  );

 
  // CHECK ADMIN


  const isAdmin = user?.isAdmin === true;

  // DEBUG
  console.log("CURRENT USER:", user);
  console.log("IS ADMIN:", isAdmin);

 
  // FIND PRODUCT


  const product = products.find(
    (item) => String(item.id) === String(id)
  );


  // LIKE


  const [liked, setLiked] = useState(false);

  // REACT HOOK FORM


  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  // LOAD PRODUCT INTO FORM
 

  useEffect(() => {
    if (product) {
      reset({
        image: product.image || "",
        title: product.title || "",
        price: product.price || "",
        category: product.category || "",
        description: product.description || "",
      });
    }
  }, [product?.id, reset]);

 
  // UPDATE PRODUCT


  const updateProductHandler = (data) => {
    if (!isAdmin) {
      console.log("Only admin can update products");
      return;
    }

    const updatedProduct = {
      ...data,
      price: Number(data.price),
    };

    dispatch(
      asyncupdateproduct(
        product.id,
        updatedProduct
      )
    );
  };

 
  // DELETE PRODUCT
  

  const deleteProductHandler = () => {
    if (!isAdmin) {
      console.log("Only admin can delete products");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    dispatch(
      asyncdeleteproduct(product.id)
    );

    navigate("/products");
  };

 
  // LOADING
 
  if (!product) {
    return (
      <div className="w-full min-h-screen bg-slate-800 flex items-center justify-center">
        <p className="text-white text-xl">
          Loading product...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-800 px-[8%] py-12">

     
          {/* MAIN PRODUCT CARD */}
     

      <div className="w-full max-w-6xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">

        {/* IMAGE */}

        <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-10 md:p-14">

          <div className="w-full h-[500px] flex items-center justify-center bg-white rounded-2xl p-8 shadow-sm">

            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
            />

          </div>

        </div>

        {/* PRODUCT INFORMATION */}

        <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center">

          {/* CATEGORY */}

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pink-600">
            {product.category}
          </p>

          {/* TITLE */}

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 leading-tight">
            {product.title}
          </h1>

          {/* RATING */}

          <div className="flex items-center gap-2 mt-5">

            <div className="text-yellow-400 text-lg">
              ★ ★ ★ ★ ★
            </div>

            <span className="text-sm text-gray-400">
              4.8 / 5
            </span>

          </div>

          {/* DESCRIPTION */}

          <p className="text-gray-500 text-base leading-7 mt-6">
            {product.description}
          </p>

          {/* PRICE */}

          <div className="mt-8">

            <p className="text-sm text-gray-400 uppercase tracking-wider">
              Price
            </p>

            <p className="text-4xl font-bold text-green-600 mt-1">
              {Number(product.price).toFixed(2)}
            </p>

          </div>

          {/* DIVIDER */}

          <div className="border-t border-gray-200 mt-8" />

          {/* BUTTONS */}

          <div className="flex gap-4 mt-8">

            {/* ADD TO CART */}

            <button
              type="button"
              className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Add to Cart
            </button>

            {/* LIKE */}

            <button
              type="button"
              onClick={() => setLiked(!liked)}
              className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center text-2xl transition-all ${
                liked
                  ? "bg-pink-600 border-pink-600 text-white"
                  : "border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {liked ? "♥" : "♡"}
            </button>

          </div>

          {/* BACK */}

          <Link
            to="/products"
            className="mt-5 text-center text-slate-500 hover:text-pink-600 font-medium"
          >
            ← Back to Products
          </Link>

        </div>

      </div>


      {/* 
          PRODUCT DETAILS
      */}

      <div className="w-full max-w-6xl mx-auto mt-10 bg-white rounded-3xl shadow-2xl p-8 md:p-12">

        <h2 className="text-3xl font-bold text-slate-900 mb-8">
          Product Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* PRODUCT NAME */}

          <div>

            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Product Name
            </p>

            <p className="text-xl font-semibold text-slate-900 mt-2">
              {product.title}
            </p>

          </div>

          {/* CATEGORY */}

          <div>

            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Category
            </p>

            <p className="text-xl font-semibold text-slate-900 mt-2 capitalize">
              {product.category}
            </p>

          </div>

          {/* PRICE */}

          <div>

            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Price
            </p>

            <p className="text-2xl font-bold text-green-600 mt-2">
              {Number(product.price).toFixed(2)}
            </p>

          </div>

          {/* PRODUCT ID */}

          <div>

            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Product ID
            </p>

            <p className="text-lg font-medium text-slate-700 mt-2">
              {product.id}
            </p>

          </div>

          {/* DESCRIPTION */}

          <div className="md:col-span-2">

            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Description
            </p>

            <p className="text-gray-600 text-base leading-7 mt-3">
              {product.description}
            </p>

          </div>

          {/* IMAGE URL */}

          <div className="md:col-span-2">

            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Image URL
            </p>

            <p className="text-gray-500 text-sm break-all mt-2">
              {product.image}
            </p>

          </div>

        </div>

      </div>


      {/* 
          UPDATE PRODUCT
          ADMIN ONLY
      */}

      {isAdmin && (
        <div className="w-full max-w-6xl mx-auto mt-10 bg-white rounded-3xl shadow-2xl p-8 md:p-10">

          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Update Product
          </h2>

          <form
            onSubmit={handleSubmit(updateProductHandler)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >

            {/* IMAGE */}

            <div>

              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Image URL
              </label>

              <input
                {...register("image")}
                type="url"
                className="w-full outline-none border border-gray-300 rounded-xl p-3 text-lg text-black focus:border-pink-600"
              />

            </div>


            {/* TITLE */}

            <div>

              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Product Name
              </label>

              <input
                {...register("title")}
                type="text"
                className="w-full outline-none border border-gray-300 rounded-xl p-3 text-lg text-black focus:border-pink-600"
              />

            </div>


            {/* PRICE */}

            <div>

              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Price
              </label>

              <input
                {...register("price")}
                type="number"
                step="0.01"
                className="w-full outline-none border border-gray-300 rounded-xl p-3 text-lg text-black focus:border-pink-600"
              />

            </div>


            {/* CATEGORY */}

            <div>

              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Category
              </label>

              <input
                {...register("category")}
                type="text"
                className="w-full outline-none border border-gray-300 rounded-xl p-3 text-lg text-black focus:border-pink-600"
              />

            </div>


            {/* DESCRIPTION */}

            <div className="md:col-span-2">

              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Description
              </label>

              <textarea
                {...register("description")}
                className="w-full h-32 outline-none border border-gray-300 rounded-xl p-3 text-lg text-black resize-none focus:border-pink-600"
              />

            </div>


            {/* BUTTONS */}

            <div className="md:col-span-2 flex gap-4">

              <button
                type="submit"
                className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-3 rounded-xl transition-all"
              >
                Update Product
              </button>

              <button
                type="button"
                onClick={deleteProductHandler}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-xl transition-all"
              >
                Delete Product
              </button>

            </div>

          </form>

        </div>
      )}

    </div>
  );
};

export default ProductDetails;