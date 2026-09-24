import { nanoid } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asynccreateproduct } from "../../store/actions/productAction";

const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const CreateProductHandler = async (product) => {
    product.id = nanoid();

    console.log("CREATE PRODUCT:", product);

    await dispatch(asynccreateproduct(product));

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white py-10">

      <div className="max-w-2xl mx-auto">

        <div className="mb-8">
          <p className="text-sm text-pink-400 font-medium">
            ADMIN
          </p>

          <h1 className="text-3xl font-semibold mt-1">
            Create Product
          </h1>

          <p className="text-gray-400 mt-2">
            Add a new product to your store.
          </p>
        </div>


        <form
          onSubmit={handleSubmit(CreateProductHandler)}
          className="bg-gray-700 border border-gray-600 rounded-2xl p-7 space-y-5"
        >

          {/* IMAGE */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Image URL
            </label>

            <input
              {...register("image", {
                required: "Image URL is required",
              })}
              type="url"
              placeholder="https://example.com/product.jpg"
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-pink-500"
            />

            {errors.image && (
              <p className="text-red-400 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>


          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Product name
            </label>

            <input
              {...register("title", {
                required: "Product name is required",
              })}
              type="text"
              placeholder="Enter product name"
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-pink-500"
            />

            {errors.title && (
              <p className="text-red-400 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>


          {/* PRICE */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Price
            </label>

            <input
              {...register("price", {
                required: "Price is required",
              })}
              type="number"
              placeholder="Enter price"
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-pink-500"
            />

            {errors.price && (
              <p className="text-red-400 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>


          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>

            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              rows="5"
              placeholder="Enter product description"
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-pink-500 resize-none"
            />

            {errors.description && (
              <p className="text-red-400 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>


          {/* CATEGORY */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>

            <input
              {...register("category", {
                required: "Category is required",
              })}
              type="text"
              placeholder="e.g. electronics"
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-pink-500"
            />

            {errors.category && (
              <p className="text-red-400 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>


          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-medium transition"
          >
            Create Product
          </button>

        </form>

      </div>

    </div>
  );
};

export default CreateProduct;