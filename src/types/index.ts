export type Category = {
  id: string;
  name: string;
};

export type Book = {
  name: string;
  id: string;
  author: string;
  categoryId: string;
  description: string;
  imageUrl: string;
  price: number;
};

export type BookWithCategory = {
  name: string;
  id: string;
  author: string;
  categoryId: string;
  description: string;
  imageUrl: string;
  price: number;
  category: {
    id: string;
    name: string;
  };
};

export type OrdersType = {
  id: string;
  status: "NEW" | "INPROGRESS" | "CANCELED" | "COMPLETED";
  createdAt: Date;
  userId: string;
  phoneNumber: string;
  shopName: string;
  city: string;
  location: number[];
  user: {
    id: string;
    telegramId: string;
    username?: string | null;
    firstName: string;
    lastName?: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
  orderItems: {
    id: string;
    orderId: string;
    bookId: string;
    quantity: number;
    book: {
      id: string;
      name: string;
      description: string;
      author: string;
      imageUrl: string;
      price: number;
      categoryId: string;
    };
  }[];
};
