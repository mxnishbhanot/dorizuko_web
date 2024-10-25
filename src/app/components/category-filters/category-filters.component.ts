import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ProductSearchComponent } from '../product-search/product-search.component';

@Component({
  selector: 'app-category-filters',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './category-filters.component.html',
  styleUrl: './category-filters.component.scss'
})
export class CategoryFiltersComponent {
  @Input() selectedCategory: string = '';
  @Output() categoryChange = new EventEmitter<string>();


  onCategoryChange(event: any): void {
    this.categoryChange.emit(event.value);
  }
}
