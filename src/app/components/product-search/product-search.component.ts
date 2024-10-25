import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatIconModule],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss'
})
export class ProductSearchComponent {
  @Input() searchTerm: string = '';
  @Output() search = new EventEmitter<string>();

  onSearch(term: string): void {
    this.search.emit(term);
  }
}
