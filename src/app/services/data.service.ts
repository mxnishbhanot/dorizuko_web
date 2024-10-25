import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly PAGE_SIZE = 12;

  getProducts(count: number = 20): Observable<Product[]> {
    const products = Array.from({ length: count }, () => ({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      imageUrl: faker.image.url({ width: 400, height: 400 }),
      description: faker.commerce.productDescription(),
      category: faker.commerce.department(),
      rating: faker.number.int({ min: 1, max: 5 }),
      discount: faker.helpers.maybe(() => faker.number.int({ min: 10, max: 50 })),
      tags: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => faker.commerce.productAdjective()),
      inStock: true,
      brand: faker.commerce.department(),
      sizes: ['S', 'XL', 'XXL'],
      colors: ['#ffffff', '#eb5234', '#34ebdc']
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

  getProductsWithPagination(page: number, filters: FilterState): Observable<{ products: Product[], hasMore: boolean }> {
    let filtered: any = []
    this.getProducts(50).subscribe((products)=>{
      filtered = products;
    });
    
    // Apply filters
    if (filters.searchTerm) {
      filtered = filtered.filter((p: any) => 
        p.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter((p: any) => p.category === filters.category);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a: Item, b: Item) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a: Item, b: Item) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a: Item, b: Item) => a.name.localeCompare(b.name));
        break;
    }

    // Paginate
    const start = page * this.PAGE_SIZE;
    const paginatedProducts = filtered.slice(start, start + this.PAGE_SIZE);
    const hasMore = start + this.PAGE_SIZE < filtered.length;

    // Simulate API delay
    return of({ products: paginatedProducts, hasMore }).pipe(delay(800));
  }
}


export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category: string;
  rating: number;
  discount?: number;
  tags: string[];
  inStock: boolean;
  brand: string;
  sizes: string[];
  colors: string[];
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
  productCount: number;
  description: string;
}

export interface FilterState {
  searchTerm: string;
  category: string;
  sortBy: string;
}

export interface Item  {
  price: number;
  name: string;
};