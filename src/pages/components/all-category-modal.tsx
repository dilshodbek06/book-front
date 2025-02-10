import { Drawer } from "vaul";
import { useStore } from "../../store/useStore";

interface AllCategoryModalProps {
  open: boolean;
  handleClose: () => void;
}

const AllCategoryModal = ({ handleClose, open }: AllCategoryModalProps) => {
  const { setSelectedCategory } = useStore();

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    handleClose();
  };
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
                <p className="text-lg font-medium text-center">Kategoriyalar</p>
                <div className="mt-2 py-3 px-1 grid grid-cols-4 gap-3 max-h-[300px] overflow-y-auto">
                  {["Diniy", "Diniy", "Diniy", "Diniy", "Diniy", "Diniy"].map(
                    (category, index) => (
                      <button
                        onClick={() => handleCategorySelect(category)}
                        key={index}
                        className="text-gray-600 group bg-gray-100 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-[10px] text-sm px-[18px] py-[10px] text-center relative overflow-hidden hover:opacity-80 flex-shrink-0"
                      >
                        <div className="absolute top-[-31px] left-[-31px] w-[50px] h-[50px] rounded-3xl bg-gray-50 bg-opacity-50"></div>
                        {category}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};

export default AllCategoryModal;
