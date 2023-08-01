import { EventHandler } from "@create-figma-plugin/utilities";

export interface CreatePopulateDataHandler extends EventHandler {
  name: "CREATE_POPULATE_DATA";
  handler: (textOptions: string[]) => void;
}

export interface CloseHandler extends EventHandler {
  name: "CLOSE";
  handler: () => void;
}
export interface Product {
  id: string;
  title: string;
  price: {
    amount: string;
  };
  shop: {
    name: string;
  };
  images: {
    width: number;
    height: number;
    url: string;
  }[];
}

export interface ProductSearchV2 {
  nodes: Product[];
}

export interface Products {
  productSearchV2: ProductSearchV2;
}
