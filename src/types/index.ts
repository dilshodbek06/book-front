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
