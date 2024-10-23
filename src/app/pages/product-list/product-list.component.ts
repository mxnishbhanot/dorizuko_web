import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products:any = [];

  constructor(private dataService: DataService, private cartService: CartService) {}

  ngOnInit() {
    this.products = this.dataService.getProducts();
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
