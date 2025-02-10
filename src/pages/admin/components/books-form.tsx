import { ChangeEvent, useEffect, useState } from "react";
import { Request } from "../../../helpers/Request";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Category } from "../../../types";

const BooksForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<null | File>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    setImageUrl(URL.createObjectURL(event.target.files![0]));
    setImage(event.target.files![0]);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("file", image!);
      const { data } = await Request<{ success: boolean; url: string }>(
        "/upload",
        "POST",
        formData
      );

      const obj = {
        name,
        description,
        author,
        imageUrl: data.url,
        price: parseInt(price),
        categoryId: category,
      };
      setLoading(true);
      await Request("/product", "POST", obj);
      toast.success("Muvaffaqiyatli");
      navigate("/admin/books");
    } catch (error) {
      console.log(error);
      toast.error("Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageUrl("");
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await Request<Category[]>("/category", "GET");
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container p-3">
      <div className=" w-full max-w-[45rem] space-y-4">
        <div>
          <p className="font-medium mb-1">Kitob rasmi</p>
          {imageUrl !== "" ? (
            <div className="flex items-center gap-3">
              <img className="w-[250px] h-[250px]" src={imageUrl} alt="image" />
              <button
                onClick={handleRemoveImage}
                className="px-4 py-2 cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-md"
              >
                o'chirish
              </button>
            </div>
          ) : (
            <label
              htmlFor="banner"
              className="bg-white text-gray-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed  font-[sans-serif]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-11 mb-2 fill-gray-500"
                viewBox="0 0 32 32"
              >
                <path
                  d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                  data-original="#000000"
                />
                <path
                  d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                  data-original="#000000"
                />
              </svg>
              Upload file
              <input
                onChange={handleFile}
                type="file"
                id="banner"
                className="hidden"
              />
              <p className="text-xs font-medium text-gray-400 mt-2">
                PNG, JPG SVG, WEBP, and GIF are Allowed.
              </p>
            </label>
          )}
        </div>
        <div>
          <label htmlFor="name" className="font-medium mb-1">
            Kitob nomi
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-blue-500 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="kitob nomi..."
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="font-medium mb-1">
            Kitob tavsifi
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-blue-500"
            placeholder="Kitob tavsifi..."
          ></textarea>
        </div>
        <div>
          <label htmlFor="author" className="font-medium mb-1">
            Kitob muallifi
          </label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            type="text"
            id="author"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-blue-500 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="kitob muallifi..."
            required
          />
        </div>
        <div>
          <label htmlFor="price" className="font-medium mb-1">
            Kitob narxi
          </label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            id="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-blue-500 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="kitob narxi..."
            required
          />
        </div>
        <div>
          <label htmlFor="categories" className="font-medium mb-1">
            Kitob kategoriyasi
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="categories"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-blue-500"
          >
            <option selected>Kategoriya tanlang.</option>
            {categories.map((category) => (
              <option value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
          <button
            disabled={loading}
            onClick={handleSave}
            type="button"
            className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm px-9 py-2.5 me-2 mb-2 focus:outline-none disabled:opacity-60"
          >
            {loading ? "Saqlanmoqda" : "Saqlash"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BooksForm;
