import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-not-found',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './product-not-found.component.html',
  styleUrl: './product-not-found.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ProductNotFoundComponent {
  @Input() searchTerm: string = '';
  @Input() category: string = '';
  
  @Output() clearFilters = new EventEmitter<void>();

  getMessage(): string {
    if (this.searchTerm && this.category) {
      return `We couldn't find any products matching "${this.searchTerm}" in the ${this.category} category.`;
    } else if (this.searchTerm) {
      return `We couldn't find any products matching "${this.searchTerm}".`;
    } else if (this.category) {
      return `We couldn't find any products in the ${this.category} category.`;
    }
    return 'No products are currently available.';
  }

  onClearFilters(): void {
    this.clearFilters.emit();
  }
}
