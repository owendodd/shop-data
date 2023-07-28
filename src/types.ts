import { EventHandler } from '@create-figma-plugin/utilities'

export interface CreatePopulateDataHandler extends EventHandler {
  name: 'CREATE_POPULATE_DATA'
  handler: (textOptions: string[]) => void
}

export interface CloseHandler extends EventHandler {
  name: 'CLOSE'
  handler: () => void
}

export interface DataMap {
  [layerName: string]: Array<Product>;
}

export interface Product {
  [key: string]: string;
  productName: string;
  productPrice: string;
  merchantName: string;
  productImage: string;
}