import { Drawer } from "vaul";
import { useStore } from "../../store/useStore";

interface CityModalProps {
  open: boolean;
  handleClose: () => void;
}

const cities = [
  {
    id: 1,
    name: "Toshkent shahar",
  },
  {
    id: 2,
    name: "Toshkent viloyati",
  },
  {
    id: 3,
    name: "Surxondaryo viloyati ",
  },
  {
    id: 4,
    name: "Sirdaryo viloyati ",
  },
  {
    id: 5,
    name: "Samarqand viloyati ",
  },
  {
    id: 6,
    name: "Qoraqalpog'iston viloyati ",
  },
  {
    id: 7,
    name: "Navoiy viloyati ",
  },
  {
    id: 8,
    name: "Namangan viloyati ",
  },
  {
    id: 9,
    name: "Xorazm viloyati ",
  },
  {
    id: 10,
    name: "Jizzax viloyati ",
  },
  {
    id: 11,
    name: "Farg’ona viloyati ",
  },
  {
    id: 12,
    name: "Buxoro viloyati ",
  },
];

const CityModal = ({ handleClose, open }: CityModalProps) => {
  const { setSelectedCity } = useStore();
  return (
    <div>
      <Drawer.Root onClose={handleClose} open={open} onOpenChange={handleClose}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-gray-100 flex flex-col items-center rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none z-[200]">
            <Drawer.Title className="hidden"></Drawer.Title>
            <Drawer.Description className="hidden"></Drawer.Description>

            <div className="w-full p-4 bg-white rounded-t-[10px]">
              {/* Handle Drawer */}
              <div
                aria-hidden
                className="mx-auto w-12 h-1.5 rounded-full bg-gray-300 mb-6"
              />
              <div className=" min-h-[300px]">
                {cities.map((city) => (
                  <div
                    onClick={() => {
                      setSelectedCity(city.name);
                      handleClose();
                    }}
                    className="px-2 py-1 my-1 cursor-pointer hover:text-black"
                    key={city.id}
                  >
                    {city.name}
                  </div>
                ))}
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};

export default CityModal;
