import { AiOutlineClose } from "react-icons/ai";
// import Pagination from "../../../components/pagination";
import { Request } from "../../../helpers/Request";
import { useEffect, useState } from "react";
import { BookWithCategory } from "../../../types";
import toast from "react-hot-toast";

const BooksTable = () => {
  const [books, setBooks] = useState<BookWithCategory[]>([]);
  const [loading, setLoading] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const { data } = await Request<BookWithCategory[]>("/product", "GET");
      setBooks(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookId: string) => {
    try {
      setLoading(true);
      await Request(`/product/${bookId}`, "DELETE");
      toast.success("Muvaffaqiyatli");
      fetchBooks();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="overflow-x-auto max-w-[64rem]">
      <table className=" min-w-max rounded-xl">
        <thead>
          <tr className="bg-gray-50">
            <th
              scope="col"
              className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-tl-xl"
            >
              №
            </th>
            <th
              scope="col"
              className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
            >
              Image
            </th>
            <th
              scope="col"
              className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
            >
              Name
            </th>
            <th
              scope="col"
              className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
            >
              Description
            </th>
            <th
              scope="col"
              className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
            >
              Category
            </th>
            <th
              scope="col"
              className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
            >
              Author
            </th>

            <th
              scope="col"
              className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
            >
              Price
            </th>

            <th
              scope="col"
              className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {loading && (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-700">
                Loading...
              </td>
            </tr>
          )}
          {books?.length <= 0 && (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-700">
                No data found
              </td>
            </tr>
          )}
          {books.map((book, ind) => (
            <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
              <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                {ind + 1}
              </td>
              <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                <img
                  src={`https://book-backend-git-main-dilshodbek06s-projects.vercel.app/${book.imageUrl}`}
                  alt="book cover"
                  className="w-12 h-12 rounded"
                />
              </td>
              <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                {book.name}
              </td>
              <td className="p-5 text-sm font-medium text-gray-900 w-64">
                <p className="line-clamp-2 overflow-hidden text-ellipsis">
                  {book.description}
                </p>
              </td>
              <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                {book.category.name}
              </td>
              <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                {book.author}
              </td>
              <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                {book.price?.toLocaleString()} so'm
              </td>
              <td className=" p-5 ">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="p-2 rounded-full  group transition-all duration-500  flex item-center hover:text-red-600 hover:bg-gray-100"
                  >
                    <AiOutlineClose size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="flex justify-end mt-2">
        <Pagination
          currentPage={currentPage}
          onPageChange={() => {}}
          totalPages={4}
        />
      </div> */}
    </div>
  );
};

export default BooksTable;
