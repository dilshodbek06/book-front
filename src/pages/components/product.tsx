import { useNavigate } from "react-router-dom";
import { Book } from "../../types";

const Product = ({ book }: { book: Book }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/product/" + book.id)}
      className=" max-w-[165px] w-full rounded-md"
    >
      <div className=" max-w-[165px]  flex justify-center items-center">
        <img
          src={`https://book-backend-git-main-dilshodbek06s-projects.vercel.app/${book.imageUrl}`}
          alt="book image"
          className="w-full"
        />
      </div>
      <div className="mt-[6px]">
        <p className="line-clamp-1 font-medium">{book.name}</p>
        <div className="flex items-center justify-between mt-1">
          <p className="font-semibold text-lg text-[#0E1A23]">
            {book.price?.toLocaleString()} so’m
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
