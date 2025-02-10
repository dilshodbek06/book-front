import { AiOutlineClose } from "react-icons/ai";
import { GoPencil } from "react-icons/go";
import Pagination from "../../../components/pagination";

const UsersTable = () => {
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
              Name
            </th>
            <th
              scope="col"
              className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
            >
              Phone
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
              Name
            </th>
            <th
              scope="col"
              className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
            >
              Name
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
          {/* {data?.length <= 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-700">
                    No data found
                  </td>
                </tr>
              )} */}
          <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 "></td>
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"></td>
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"></td>
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"></td>
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"></td>
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
              Link
            </td>
            <td className=" p-5 ">
              <div className="flex items-center gap-1">
                <button className="p-2 rounded-full  group transition-all duration-500  flex item-center hover:text-sky-600 hover:bg-gray-100">
                  <GoPencil size={20} />
                </button>
                <button className="p-2 rounded-full  group transition-all duration-500  flex item-center hover:text-red-600 hover:bg-gray-100">
                  <AiOutlineClose size={20} />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-end mt-2">
        <Pagination currentPage={1} onPageChange={() => {}} totalPages={4} />
      </div>
    </div>
  );
};

export default UsersTable;
