export interface IProductCreate {
    name: string;
    price: number;
    category_id: number;
    images: File[] | null;
    description: string;
  };

  