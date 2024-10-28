import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { StripeService } from '../../services/stripe.service';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatBadgeModule, MatChipsModule, MatSelectModule, MatCardModule, MatIconModule, MatButtonModule, MatInputModule, MatDividerModule, MatSnackBarModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems: CartItem[] = [
    {
      product: {
        id: '1',
        name: 'Premium Wireless Headphones',
        price: 299.99,
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
        description: 'High-quality wireless headphones with noise cancellation',
        category: 'Electronics',
        rating: 4.5,
        discount: 15,
        tags: ['Wireless', 'Noise-Cancelling', 'Premium'],
        inStock: true,
        brand: 'SoundMaster',
        sizes: ['S', 'M', 'XL'],
        colors: ['Black', 'Silver', 'Rose Gold'],
        images: [
          { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff', alt: 'Front view' },
          { url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa', alt: 'Side view' },
          { url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5', alt: 'Folded view' }
        ]
      },
      quantity: 1,
      selectedColor: 'Black',
      selectedSize: 'One Size'
    },
    {
      product: {
        id: '1',
        name: 'Premium Wireless Headphones',
        price: 299.99,
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
        description: 'High-quality wireless headphones with noise cancellation',
        category: 'Electronics',
        rating: 4.5,
        discount: 15,
        tags: ['Wireless', 'Noise-Cancelling', 'Premium'],
        inStock: true,
        brand: 'SoundMaster',
        sizes: ['S', 'M', 'XL'],
        colors: ['Black', 'Silver', 'Rose Gold'],
        images: [
          { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff', alt: 'Front view' },
          { url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa', alt: 'Side view' },
          { url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5', alt: 'Folded view' }
        ]
      },
      quantity: 1,
      selectedColor: 'Black',
      selectedSize: 'One Size'
    }
  ];

  shipping: number = 10;
  promoCode: string = '';

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void { }

  updateQuantity(item: CartItem): void {
    if (item.quantity < 1) {
      item.quantity = 1;
    }
    this.snackBar.open('Cart updated', 'Close', { duration: 2000 });
  }

  removeItem(item: CartItem): void {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.snackBar.open('Item removed from cart', 'Close', { duration: 2000 });
    }
  }

  calculateSubtotal(): number {
    return this.cartItems.reduce((sum, item) =>
      sum + (item.product.price * item.quantity), 0);
  }

  calculateDiscount(): number {
    return this.cartItems.reduce((sum, item) => {
      const discount = item.product.discount || 0;
      return sum + (item.product.price * item.quantity * (discount / 100));
    }, 0);
  }

  calculateTax(): number {
    return (this.calculateSubtotal() - this.calculateDiscount()) * 0.1; // 10% tax
  }

  calculateTotal(): number {
    return this.calculateSubtotal() - this.calculateDiscount() + this.calculateTax() + this.shipping;
  }

  applyPromoCode(): void {
    this.snackBar.open('Promo code applied successfully', 'Close', { duration: 2000 });
  }

  checkout(): void {
    this.snackBar.open('Proceeding to checkout...', 'Close', { duration: 2000 });
  }
}
