import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import Admin from "./pages/admin/admin";
import NewOrders from "./pages/admin/orders/new/new-orders";
import InprogressOrders from "./pages/admin/orders/inprogress/inprogress-orders";
import CompletedOrders from "./pages/admin/orders/completed/completed-orders";
import CanceledOrders from "./pages/admin/orders/cancel/canceled-orders";
import Users from "./pages/admin/users";
import { ToastProvider } from "./providers/toast-provider";
import Cart from "./pages/cart";
import NotFound from "./components/not-found";
import ProductDetail from "./pages/product-detail";
import Books from "./pages/admin/books";
import BooksForm from "./pages/admin/components/books-form";
import MainOrder from "./pages/main-order";

const App = () => {
  return (
    <div>
      <ToastProvider />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-main" element={<MainOrder />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/books" element={<Books />} />
          <Route path="/admin/books/create" element={<BooksForm />} />
          <Route path="/admin/orders-new" element={<NewOrders />} />
          <Route
            path="/admin/orders-inprogress"
            element={<InprogressOrders />}
          />
          <Route path="/admin/orders-completed" element={<CompletedOrders />} />
          <Route path="/admin/orders-canceled" element={<CanceledOrders />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
