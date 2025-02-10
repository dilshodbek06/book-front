import { IoIosArrowDown } from "react-icons/io";
import Header from "./components/header";
import { useState, useEffect } from "react";
import CityModal from "./components/city-modal";
import { GrLocation } from "react-icons/gr";
import LocationModal from "./components/location-modal";
import { useStore } from "../store/useStore";
import { useCartStore } from "../store/useCartStore";
import { Request } from "../helpers/Request";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MainOrder = () => {
  const {
    phoneNumber,
    setSelectedPhone,
    selectedCity,
    shopName,
    setSelectedShopName,
    selectedAddress,
    selectedLong,
  } = useStore();
  const { cart, clearCart } = useCartStore();
  // const user=useTelegra

  const navigate = useNavigate();

  const [cityModal, setCityModal] = useState(false);
  const [locationModal, setLocationModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    phone: "",
    shopName: "",
    city: "",
    address: "",
  });

  useEffect(() => {
    if (selectedCity) {
      setErrors((prev) => ({ ...prev, city: "" }));
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedAddress) {
      setErrors((prev) => ({ ...prev, address: "" }));
    }
  }, [selectedAddress]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    if (!value.startsWith("998")) {
      value = "998"; // Ensure it always starts with '998'
    }

    if (value.length > 12) {
      value = value.slice(0, 12); // Max length for Uzbekistan phone
    }

    setSelectedPhone("+" + value);
    setErrors((prev) => ({
      ...prev,
      phone: value.length === 12 ? "" : "Telefon raqam noto’g’ri",
    }));
  };

  const handleCheckout = async () => {
    const newErrors = {
      phone: phoneNumber.length === 13 ? "" : "Telefon raqam noto’g’ri",
      shopName: shopName.trim() ? "" : "Do’kon nomini kiriting",
      city: selectedCity ? "" : "Shaharni tanlang",
      address: selectedAddress ? "" : "Manzilni tanlang",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    try {
      setLoading(true);
      await Request("/order", "POST", {
        city: selectedCity,
        phoneNumber,
        shopName,
        location: selectedLong,
        orderItems: cart.map((c) => ({
          book: { id: c.id },
          quantity: c.quantity,
        })),
      });
      toast.success(
        "Sizning buyurtmangiz qabul qilindi. Operator tez orada aloqaga chiqadi"
      );
      clearCart();
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-2">
      <div className="container py-3 px-4 mx-auto max-w-xl min-h-[500px]">
        <Header name="Orqaga" />
        <div className="mt-5 space-y-5 min-h-[300px]">
          {/* Phone Number Input */}
          <div>
            <label className="font-medium" htmlFor="phone">
              Telefon
            </label>
            <input
              value={phoneNumber}
              onChange={handlePhoneChange}
              id="phone"
              type="tel"
              placeholder="+998"
              className={`block mt-1 w-full h-[48px] bg-gray-100 rounded-2xl pl-4 focus:outline-blue-500 ${
                errors.phone ? "border border-red-500" : ""
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>
          {/* Shop Name Input */}
          <div>
            <label className="font-medium" htmlFor="name">
              Do’kon nomi
            </label>
            <input
              value={shopName}
              onChange={(e) => {
                setSelectedShopName(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  shopName: e.target.value.trim()
                    ? ""
                    : "Do’kon nomini kiriting",
                }));
              }}
              id="name"
              type="text"
              placeholder=".."
              className={`block mt-1 w-full h-[48px] bg-gray-100 rounded-2xl pl-4 focus:outline-blue-500 ${
                errors.shopName ? "border border-red-500" : ""
              }`}
            />
            {errors.shopName && (
              <p className="text-red-500 text-sm">{errors.shopName}</p>
            )}
          </div>
          {/* City Selection */}
          <div>
            <label className="font-medium" htmlFor="city">
              Shaharni tanlang
            </label>
            <div className="flex items-center relative">
              <input
                readOnly
                value={selectedCity || ""}
                onClick={() => setCityModal(true)}
                id="city"
                type="text"
                placeholder="Toshkent"
                className={`block mt-1 w-full h-[48px] bg-gray-100 rounded-2xl pl-4 focus:outline-blue-500 cursor-pointer ${
                  errors.city ? "border border-red-500" : ""
                }`}
              />
              <IoIosArrowDown className="size-5 absolute right-4 mt-1 top-1/2 -translate-y-1/2 text-gray-600" />
            </div>
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city}</p>
            )}
          </div>

          {/* Address Selection */}
          <div>
            <label className="font-medium" htmlFor="address">
              Manzilni kiriting
            </label>
            <div className="flex items-center relative">
              <input
                readOnly
                value={selectedAddress || ""}
                onClick={() => setLocationModal(true)}
                id="address"
                type="text"
                placeholder="Manzilni tanlang"
                className={`block mt-1 w-full h-[48px] bg-gray-100 rounded-2xl pl-4 pr-10 focus:outline-blue-500 cursor-pointer ${
                  errors.address ? "border border-red-500" : ""
                }`}
              />
              <GrLocation className="size-5 absolute right-4 mt-1 top-1/2 -translate-y-1/2 text-gray-600" />
            </div>
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="fixed w-full bottom-2">
        <div className="container max-w-xl mx-auto px-4">
          <button
            onClick={handleCheckout}
            disabled={
              Object.values(errors).some((error) => error !== "") || loading
            }
            className={`text-white w-full bg-[#348AEC] focus:ring-1 focus:outline-none focus:ring-blue-300 rounded-xl px-[16px] py-[10px] text-center relative overflow-hidden hover:opacity-80 flex items-center gap-x-2 justify-center transition-all duration-300 ${
              Object.values(errors).some((error) => error !== "")
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {loading ? "Saqlanmoqda..." : "Tasdiqlash"}
          </button>
        </div>
      </div>

      {/* Modals */}
      <div>
        <CityModal
          handleClose={() => {
            setCityModal(false);
            if (selectedCity) {
              setErrors((prev) => ({ ...prev, city: "" }));
            }
          }}
          open={cityModal}
        />
        <LocationModal
          handleClose={() => {
            setLocationModal(false);
            if (selectedAddress) {
              setErrors((prev) => ({ ...prev, address: "" }));
            }
          }}
          open={locationModal}
        />
      </div>
    </div>
  );
};

export default MainOrder;
