import { useEffect, useState } from "react";
import Product from "./product";
import { Book } from "../../types";
import { Request } from "../../helpers/Request";

const Products = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const { data } = await Request<Book[]>("/product", "GET");
      setBooks(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {loading && <p>Loading...</p>}
      {books.map((book, ind) => (
        <Product key={ind} book={book} />
      ))}
    </div>
  );
};

export default Products;
