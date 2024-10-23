import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { StripeService } from '../../services/stripe.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
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
