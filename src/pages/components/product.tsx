import { useNavigate } from "react-router-dom";
import { Book } from "../../types";
import { useState, useEffect } from "react";

const Product = ({ book }: { book: Book }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Handle image loading properly
  useEffect(() => {
    const img = new Image();
    img.src = `https://book-backend-git-main-dilshodbek06s-projects.vercel.app/${book.imageUrl}`;
    img.onload = () => setLoading(false);
  }, [book.imageUrl]);

  return (
    <div
      onClick={() => navigate(`/product/${book.id}`)}
      className="max-w-[165px] w-full rounded-md cursor-pointer"
    >
      <div className="max-w-[165px]  flex justify-center items-center">
        {loading && (
          <div className=" w-max h-[220px] bg-gray-200 animate-pulse rounded-md"></div>
        )}
        <img
          src={`https://book-backend-git-main-dilshodbek06s-projects.vercel.app/${book.imageUrl}`}
          alt="book image"
          className={`w-full transition-opacity duration-300 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
      <div className="mt-[6px]">
        <p className="line-clamp-1 font-medium">{book.name}</p>
        <div className="flex items-center justify-between mt-1">
          <p className="font-semibold text-lg text-[#0E1A23]">
            {book.price?.toLocaleString() || "0"} so’m
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
