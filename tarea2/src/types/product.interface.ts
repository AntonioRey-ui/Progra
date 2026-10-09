import { RowDataPacket } from 'mysql2';

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  brand?: string | null;
  img?: string | null;
  active: boolean;
}

export interface ProductRow extends Product, RowDataPacket {}

export interface CreateProductDTO {
  name: string;
  price: number;
  stock: number;
  description: string;
  brand?: string | null;
  img?: string | null;
}

export interface UpdateProductDTO {
  name: string;
  price: number;
  stock: number;
  description: string;
  brand?: string | null;
  img?: string | null;
}

export interface ChangePriceDTO {
  price: number;
}
