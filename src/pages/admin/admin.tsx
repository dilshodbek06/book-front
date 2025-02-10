import { FaUsers } from "react-icons/fa";
import { GrCompliance, GrInProgress } from "react-icons/gr";
import { ImCancelCircle } from "react-icons/im";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { Link, Outlet, useLocation } from "react-router-dom";
import Logo from "./logo";
import { GiBookshelf } from "react-icons/gi";

const sidebarLinks = [
  { to: "/admin/users", icon: <FaUsers className="size-6" />, label: "Users" },
  {
    to: "/admin/books",
    icon: <GiBookshelf className="size-6" />,
    label: "Books",
  },
  {
    to: "/admin/orders-new",
    icon: <MdOutlineCreateNewFolder className="size-6" />,
    label: "New Orders",
  },
  {
    to: "/admin/orders-inprogress",
    icon: <GrInProgress className="size-6" />,
    label: "Inprogress Orders",
  },
  {
    to: "/admin/orders-completed",
    icon: <GrCompliance className="size-6" />,
    label: "Completed Orders",
  },
  {
    to: "/admin/orders-canceled",
    icon: <ImCancelCircle className="size-6" />,
    label: "Canceled Orders",
  },
];

// const adminRoutes = [
//   { to: "/admin/users", icon: <FaUsers className="size-6" />, label: "Users" },
//   {
//     to: "/admin/books",
//     icon: <GiBookshelf className="size-6" />,
//     label: "Books",
//   },
// ];

// const operatorRoutes = [
//   {
//     to: "/admin/orders-new",
//     icon: <MdOutlineCreateNewFolder className="size-6" />,
//     label: "New Orders",
//   },
//   {
//     to: "/admin/orders-inprogress",
//     icon: <GrInProgress className="size-6" />,
//     label: "Inprogress Orders",
//   },
//   {
//     to: "/admin/orders-completed",
//     icon: <GrCompliance className="size-6" />,
//     label: "Completed Orders",
//   },
//   {
//     to: "/admin/orders-canceled",
//     icon: <ImCancelCircle className="size-6" />,
//     label: "Canceled Orders",
//   },
// ];

const Admin = () => {
  const location = useLocation();
  const routes = sidebarLinks;
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="min-w-[300px] border-r bg-gray-50 text-white">
        <div className="px-3 py-4">
          <Logo />
        </div>
        <div className="px-2 mt-2 flex flex-col items-center space-y-2">
          {routes.map(({ to, icon, label }) => (
            <Link key={to} className="w-full" to={to}>
              <div
                className={`hover:bg-blue-500 hover:text-white cursor-pointer px-3 py-3 w-full rounded-md border border-blue-500 ${
                  location.pathname === to
                    ? "bg-blue-500 hover:bg-blue-400"
                    : "text-black"
                } `}
              >
                <div className="flex items-center gap-x-3 pl-2">
                  {icon} {label}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-2 w-full py-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
