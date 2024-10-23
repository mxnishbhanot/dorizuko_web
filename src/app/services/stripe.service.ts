import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  private stripePromise = loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY');

  async checkout(items: any[]) {
    const stripe = await this.stripePromise;

    // Create a Checkout Session with the items in the cart
    const response = await fetch('http://localhost:3000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ items })
    });

    const sessionId = await response.json();
    return stripe?.redirectToCheckout({ sessionId });
  }
}
