import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import {
  GeolocationControl,
  Map,
  Placemark,
  SearchControl,
  YMaps,
  ZoomControl,
} from "react-yandex-maps";
import { Drawer } from "vaul";
import { useStore } from "../../store/useStore";

const apiKey = "9a3bc7b2-bad0-416c-939a-1e4d9298f19c";

interface CityModalProps {
  open: boolean;
  handleClose: () => void;
}

const LocationModal = ({ handleClose, open }: CityModalProps) => {
  const { setSelectedAddress, setSelectedLong } = useStore();

  const [userLocation, setUserLocation] = useState<[number, number]>([
    41.2995, 69.2401,
  ]);
  const [address, setAddress] = useState<string>("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMapClick = async (e: any) => {
    const coords = e.get("coords") as [number, number];
    if (coords) {
      setUserLocation(coords);
      setSelectedLong(coords);
      await fetchAddress(coords);
    }
  };

  const fetchAddress = async (coords: [number, number]) => {
    try {
      const response = await fetch(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${coords[1]},${coords[0]}&format=json`
      );
      const data = await response.json();
      const addressDetail =
        data.response.GeoObjectCollection.featureMember[0]?.GeoObject
          ?.metaDataProperty?.GeocoderMetaData?.text || "Unknown Address";
      setAddress(addressDetail);
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Error retrieving address");
    }
  };

  const handleCloseClick = () => {
    setUserLocation([41.2995, 69.2401]);
    setAddress("");
    setSelectedAddress("");
    handleClose();
  };

  const handleSaveLocation = () => {
    setSelectedAddress(address);
    handleClose();
  };

  return (
    <div>
      <Drawer.Root
        disablePreventScroll
        dismissible={false}
        onClose={handleClose}
        open={open}
        onOpenChange={handleClose}
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-gray-100 flex flex-col items-center rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none z-[200]">
            <Drawer.Title className="hidden"></Drawer.Title>
            <Drawer.Description className="hidden"></Drawer.Description>

            <div className="w-full bg-white rounded-t-[10px] h-screen relative">
              <div
                onClick={handleCloseClick}
                className="w-[29px] h-[29px] rounded flex justify-center items-center bg-white shadow-md absolute top-[10px] right-12 z-[50] cursor-pointer"
              >
                <IoClose className="size-5" />
              </div>
              <YMaps
                query={{
                  apikey: apiKey,
                  lang: "en_US",
                  coordorder: "latlong",
                }}
              >
                <Map
                  onClick={handleMapClick}
                  defaultState={{ center: userLocation, zoom: 10 }}
                  state={{ center: userLocation, zoom: 10 }}
                  width="100%"
                  height="100%"
                >
                  <Placemark
                    options={{ draggable: true }}
                    geometry={userLocation}
                  />
                  <GeolocationControl options={{ float: "right" }} />
                  {/* <TrafficControl options={{ float: "right" }} /> */}
                  <ZoomControl options={{ float: "left" }} />
                  <SearchControl options={{ float: "left" }} />
                </Map>
              </YMaps>
              {address !== "" && (
                <div className="transition-all duration-300 fixed bottom-2 bg-white shadow-[0px_-11px_14px_-9px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] rounded-3xl px-4 py-4 -translate-x-1/2 left-1/2 w-[95%] ">
                  <div className="container  mx-auto max-w-xl ">
                    <div
                      className="flex items-center gap-x-3 
                    "
                    >
                      <div>
                        <FaMapMarkerAlt className="size-5 text-red-500" />
                      </div>
                      <div>
                        <p>{address}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleSaveLocation}
                      className={`text-white group bg-[#348AEC] focus:ring-1 focus:outline-none focus:ring-blue-300  rounded-lg  px-[16px] py-[11px] text-center relative overflow-hidden hover:opacity-80 flex items-center gap-x-2 w-full justify-center transition-all duration-300 mt-4`}
                    >
                      Manzilni tasdiqlash
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};

export default LocationModal;
