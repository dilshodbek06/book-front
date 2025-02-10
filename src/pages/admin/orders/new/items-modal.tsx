import { Drawer } from "vaul";
import { OrdersType } from "../../../../types";

interface AllCategoryModalProps {
  open: boolean;
  handleClose: () => void;
  item: OrdersType;
}

const ItemsModal = ({ handleClose, open, item }: AllCategoryModalProps) => {
  return (
    <div>
      <Drawer.Root
        open={open}
        onOpenChange={handleClose}
        onClose={handleClose}
        direction="right"
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content
            className="right-2 top-2 bottom-2 fixed z-10 outline-none w-[310px] flex"
            // The gap between the edge of the screen and the drawer is 8px in this case.
            style={
              {
                "--initial-transform": "calc(100% + 8px)",
              } as React.CSSProperties
            }
          >
            <div className="bg-zinc-50 h-full w-full grow p-5 flex flex-col rounded-[16px]">
              <div className="max-w-lg w-full mx-auto">
                <Drawer.Title className="font-medium mb-2 text-zinc-900">
                  Buyurtma mahsulotlari
                </Drawer.Title>
                <Drawer.Description className="text-zinc-600 mb-2"></Drawer.Description>
                <div className="mt-4 space-y-1 w-full">
                  {item !== null &&
                    item.orderItems.map((pr, ind) => (
                      <div
                        className="flex items-center gap-x-3  rounded-md  w-full"
                        key={ind}
                      >
                        <p className="font-medium">{pr.book.name}-</p>
                        <p>{pr.quantity} ta</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};

export default ItemsModal;
