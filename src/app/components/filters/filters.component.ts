import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { SortingComponent } from '../sorting/sorting.component';
import { FilterState } from '../../services/data.service';
import { CategoryFiltersComponent } from '../category-filters/category-filters.component';
import { ProductSearchComponent } from '../product-search/product-search.component';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [SortingComponent, CategoryFiltersComponent, ProductSearchComponent],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  @Output() filterChange = new EventEmitter<FilterState>();
  @ViewChild(ProductSearchComponent) searchComponent!: ProductSearchComponent;
  @ViewChild(CategoryFiltersComponent) categoryComponent!: CategoryFiltersComponent;
  @ViewChild(SortingComponent) sortComponent!: SortingComponent;
  
  private filterState: FilterState = {
    searchTerm: '',
    category: '',
    sortBy: 'price-asc'
  };

  onSearchChange(searchTerm: string): void {
    this.filterState = { ...this.filterState, searchTerm };
    this.emitFilterChange();
  }

  onCategoryChange(category: string): void {
    this.filterState = { ...this.filterState, category };
    this.emitFilterChange();
  }

  onSortChange(sortBy: string): void {
    this.filterState = { ...this.filterState, sortBy };
    this.emitFilterChange();
  }

  private emitFilterChange(): void {
    this.filterChange.emit(this.filterState);
  }

  resetFilters(): void {
    this.searchComponent.searchTerm = '';
    this.categoryComponent.selectedCategory = '';
    this.sortComponent.sortBy = 'price-asc';
    
    this.filterState = {
      searchTerm: '',
      category: '',
      sortBy: 'price-asc'
    };
    
    this.emitFilterChange();
  }
}
