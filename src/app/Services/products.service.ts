import { Injectable } from '@angular/core';
import { Product } from '../Interface/product';

import * as productsData from '../../../public/products.json';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  constructor() { }

  getProducts(): Product[] {
    return (productsData as any).default;
  }

  getProductById(id: number): Product {
    const products = this.getProducts();
    return products.find(product => product.id == id)!;
  }

}
