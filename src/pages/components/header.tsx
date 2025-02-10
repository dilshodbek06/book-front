import { BsCart3 } from "react-icons/bs";
import { FaChevronLeft } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";

const Header = ({ name }: { name: string }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = useCartStore();
  return (
    <div className="flex items-center justify-between">
      <div
        onClick={() => location.pathname !== "/" && navigate(-1)}
        className="flex items-center gap-x-1 cursor-pointer"
      >
        {location.pathname !== "/" && <FaChevronLeft className="mt-[1px]" />}
        <p className="font-medium text-gray-700">{name}</p>
      </div>

      <Link to={"/cart"}>
        <button className="p-2 rounded-full hover:bg-gray-50 transition-all duration-300 relative">
          <BsCart3 className="size-6 text-gray-800" />
          <div className="w-[20px] flex justify-center items-center rounded-full text-xs h-[20px] bg-blue-500 text-white absolute top-0 right-0">
            {cart?.length ?? 0}
          </div>
        </button>
      </Link>
    </div>
  );
};

export default Header;
