import Categories from "./components/categories";
import Header from "./components/header";
import Products from "./components/products";

const Home = () => {
  return (
    <div className="min-h-screen bg-white py-2">
      <div className="container py-3 px-4 mx-auto max-w-xl min-h-[500px]">
        <Header name="Falaq nashr" />
        <div className="mt-3">
          <Categories />
        </div>
        <div className="mt-2">
          <Products />
        </div>
      </div>
    </div>
  );
};

export default Home;
