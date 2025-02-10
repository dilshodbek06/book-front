import Header from "./components/header";

import { LuShoppingCart } from "react-icons/lu";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useCartStore } from "../store/useCartStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Request } from "../helpers/Request";
import { BookWithCategory } from "../types";

const ProductDetail = () => {
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<null | BookWithCategory>(
    null
  );
  const params = useParams();

  useEffect(() => {
    fetchCurrentBook();
  }, []);

  const fetchCurrentBook = async () => {
    try {
      setLoading(true);
      const { data } = await Request<BookWithCategory>(
        `/product/${params.id}`,
        "GET"
      );
      setCurrentProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(currentProduct!, quantity);
    toast.success("Savatga qo'shildi");
  };
  return (
    <div className="min-h-screen bg-white py-2">
      <div className="container py-3 px-4 mx-auto max-w-xl min-h-[500px]">
        <Header name="Kitoblar" />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="mt-3 min-h-[500px] ">
            <div>
              <img
                src={`https://book-front-git-main-dilshodbek06s-projects.vercel.app/${currentProduct?.imageUrl}`}
                alt={currentProduct?.name}
                className="mx-auto"
              />
              <h4 className="font-semibold text-xl mt-3 text-center">
                {currentProduct?.name}
              </h4>
              <p className="text-gray-600 text-center mt-[4px]">
                {currentProduct?.author}
              </p>
              <p className="text-center text-xl mt-4 font-bold">
                {currentProduct?.price?.toLocaleString()} so’m
              </p>
            </div>
            <div className="mt-5 flex items-center gap-3 ">
              <div className="flex items-center gap-x-3 w-1/2">
                <button
                  disabled={quantity <= 1}
                  onClick={() => setQuantity(quantity - 1)}
                  className="p-2 flex justify-center items-center  w-[48px] h-[48px] hover:bg-gray-200 rounded-md bg-gray-100 disabled:opacity-60 disabled:hover:bg-gray-100"
                >
                  <FaMinus className="size-3" />
                </button>
                <p className="p-2 text-gray-800 text-lg font-medium">
                  {quantity}
                </p>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 flex justify-center items-center w-[48px] h-[48px] hover:bg-gray-200 rounded-md bg-gray-100"
                >
                  <FaPlus className="size-3" />
                </button>
              </div>
              <button
                onClick={() => handleAddToCart()}
                className={`text-white group bg-[#348AEC] focus:ring-1 focus:outline-none focus:ring-blue-300  rounded-xl  px-[16px] py-[14px] text-center relative overflow-hidden hover:opacity-80 flex items-center gap-x-2 w-1/2 justify-center`}
              >
                <LuShoppingCart className="size-5" />
                <span className="mt-[2px]">Savatga</span>
              </button>
            </div>
            <div className="mt-6 text-gray-500">
              {currentProduct?.description}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
