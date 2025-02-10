import { useNavigate } from "react-router-dom";
import EmptyCart from "../components/empty-cart";
import { useCartStore } from "../store/useCartStore";
import CartItem from "./components/cart-item";
import Header from "./components/header";

const Cart = () => {
  const { totalPrice, cart } = useCartStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white py-2">
      <div className="container py-3 px-4 mx-auto max-w-xl min-h-[500px]">
        <Header name="Orqaga" />
        <div className="space-y-2 mt-3 pb-12">
          {cart.length <= 0 && <EmptyCart />}
          {cart.map((item, ind) => (
            <CartItem
              key={ind}
              author={item.author}
              id={item.id}
              imageUrl={item.imageUrl}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
            />
          ))}
        </div>
      </div>
      {cart.length > 0 && (
        <div className="h-[80px] fixed bottom-0 bg-white shadow-[0px_-11px_14px_-9px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] rounded-t-3xl px-4 pt-4 pb-4 w-full">
          <div className="container  mx-auto max-w-xl flex justify-between items-center">
            <div>
              <p className="text-gray-600">{cart?.length ?? 0} xil kitob</p>
              <h1 className="text-[#162B4C] font-semibold text-lg">
                {totalPrice.toLocaleString()} so’m
              </h1>
            </div>
            <button
              onClick={() => navigate("/order-main")}
              className={`text-white group bg-[#348AEC] focus:ring-1 focus:outline-none focus:ring-blue-300  rounded-lg  px-[16px] py-[11px] text-center relative overflow-hidden hover:opacity-80 flex items-center gap-x-2 w-1/2 justify-center transition-all duration-300`}
            >
              Sotib olish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
