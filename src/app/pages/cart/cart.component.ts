import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { StripeService } from '../../services/stripe.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  items: any = [];
  total = 0;

  constructor(private cartService: CartService, private stripeService: StripeService) {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
  }

  checkout() {
    this.stripeService.checkout(this.items);
  }
}
