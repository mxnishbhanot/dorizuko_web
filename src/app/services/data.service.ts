import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  getProducts(count: number = 20): Observable<Product[]> {
    const products = Array.from({ length: count }, () => ({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      imageUrl: faker.image.url({ width: 400, height: 400 }),
      description: faker.commerce.productDescription(),
      category: faker.commerce.department(),
      rating: faker.number.int({ min: 1, max: 5 }),
      discount: faker.helpers.maybe(() => faker.number.int({ min: 10, max: 50 })),
      tags: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => faker.commerce.productAdjective())
    }));
    return of(products);
  }

  getCategories(count: number = 6): Observable<Category[]> {
    const categories = Array.from({ length: count }, () => ({
      id: faker.string.uuid(),
      name: faker.commerce.department(),
      imageUrl: faker.image.url({ width: 600, height: 400 }),
      productCount: faker.number.int({ min: 10, max: 100 }),
      description: faker.commerce.productDescription()
    }));
    return of(categories);
  }

  getFeaturedProducts(count: number = 4): Observable<Product[]> {
    return this.getProducts(count);
  }
}


export interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  description: string;
  category: string;
  rating: number;
  discount?: number;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
  productCount: number;
  description: string;
}