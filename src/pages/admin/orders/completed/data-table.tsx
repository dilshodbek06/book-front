import { useEffect, useState } from "react";
import { Request } from "../../../../helpers/Request";
import { OrdersType } from "../../../../types";
import { Link } from "react-router-dom";
import { formatDate } from "../../../../helpers/date";
import { formatUzbekPhoneNumber } from "../../../../helpers/phone";
import { FaRegEye } from "react-icons/fa";
import ItemsModal from "../new/items-modal";

const DataTable = () => {
  const [orders, setOrders] = useState<OrdersType[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [currentOrder, setCurrentOrder] = useState<null | OrdersType>(null);

  useEffect(() => {
    fetchCompletedOrders();
  }, []);

  const fetchCompletedOrders = async () => {
    try {
      setLoading(true);
      const { data } = await Request<OrdersType[]>("/order/completed", "GET");
      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSeeDetail = (selectedOrder: OrdersType) => {
    setOpen(true);
    setCurrentOrder(selectedOrder);
  };

  return (
    <div>
      <table className=" min-w-full rounded-xl">
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
              Do'kon nomi
            </th>
            <th
              scope="col"
              className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
            >
              Telefon raqam
            </th>
            <th
              scope="col"
              className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
            >
              Shahar
            </th>
            <th
              scope="col"
              className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
            >
              Manzil
            </th>
            <th
              scope="col"
              className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
            >
              Status
            </th>
            <th
              scope="col"
              className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
            >
              Vaqt
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
          {!loading && orders?.length <= 0 && (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-700">
                No data found
              </td>
            </tr>
          )}
          {orders.map((order, ind) => (
            <tr
              key={ind}
              className="bg-white transition-all duration-500 hover:bg-gray-50"
            >
              <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                {order.id?.slice(0, 5)}
              </td>
              <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                {order.shopName}
              </td>
              <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                {formatUzbekPhoneNumber(order.phoneNumber)}
              </td>
              <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                {order.city}
              </td>
              <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                <Link
                  className="text-blue-500 underline"
                  target="_blank"
                  to={`https://www.google.com/maps?q=${order.location[0]},${order.location[1]}`}
                >
                  Joylashuv
                </Link>
              </td>
              <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                <div className="p-1 rounded-md flex justify-center items-center text-white bg-blue-500 hover:bg-blue-600 text-xs">
                  COMPLETED
                </div>
              </td>
              <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                {formatDate(order.createdAt)}
              </td>
              <td className=" p-5 ">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleSeeDetail(order)}
                    title="Mahsulotlarni ko'rish"
                    className="p-2 rounded-full  group transition-all duration-500  flex item-center hover:text-sky-600 hover:bg-gray-100"
                  >
                    <FaRegEye size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <ItemsModal
          item={currentOrder!}
          handleClose={() => setOpen(false)}
          open={open}
        />
      </div>
    </div>
  );
};

export default DataTable;
