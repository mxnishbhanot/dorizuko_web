import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService, FilterState, Product } from '../../services/data.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { FiltersComponent } from '../../components/filters/filters.component';
import { MatIconModule } from '@angular/material/icon';
import { animate, style, transition, trigger } from '@angular/animations';
import { ProductNotFoundComponent } from "../../components/product-not-found/product-not-found.component";
import { Subject, Subscription, debounceTime, distinctUntilChanged, fromEvent, takeUntil } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, RouterLink, FiltersComponent, MatDividerModule, MatIconModule, MatChipsModule, ProductNotFoundComponent, MatProgressSpinner],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ProductListComponent {
  products: Product[] = [];
  currentPage = 0;
  hasMore = true;
  isInitialLoading = true;
  isLoadingMore = false;
  currentFilters: FilterState = {
    searchTerm: '',
    category: '',
    sortBy: 'price-asc'
  };
  @ViewChild('productFilters') productFilters!: FiltersComponent;
  @ViewChild('productContainer') productContainer!: ElementRef;
  private destroy$ = new Subject<void>();
  private scrollSubscription?: Subscription;
  private isScrolling = false;

  constructor(private dataService: DataService, private cartService: CartService) { }


  ngOnInit(): void {
    this.loadInitialProducts();
  }
  ngAfterViewInit(): void {
    this.setupInfiniteScroll();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }

  private setupInfiniteScroll(): void {
    const container = this.productContainer.nativeElement;
    this.scrollSubscription = fromEvent(container, 'scroll')
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        if (!this.isScrolling) {
          this.isScrolling = true;
        }

        if (this.shouldLoadMore(container)) {
          this.loadMoreProducts();
        }

        // Reset isScrolling after load or scroll debounce
        setTimeout(() => {
          this.isScrolling = false;
        }, 100);
      });
}


  private shouldLoadMore(container: HTMLElement): boolean {
    if (!this.hasMore || this.isLoadingMore || this.isInitialLoading) return false;

    const threshold = 200; // pixels from bottom
    const position = container.scrollTop + container.offsetHeight;
    const height = container.scrollHeight;
    
    return position > height - threshold;
  }

  private loadInitialProducts(): void {
    this.isInitialLoading = true;
    this.currentPage = 0;
    this.products = [];
    
    this.dataService.getProductsWithPagination(this.currentPage, this.currentFilters)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ products, hasMore }) => {
          this.products = products;
          this.hasMore = hasMore;
          this.isInitialLoading = false;
        },
        error: (error) => {
          console.error('Error loading products:', error);
          this.isInitialLoading = false;
        }
      });
  }

  private loadMoreProducts(): void {
    if (!this.hasMore || this.isLoadingMore) return;

    this.isLoadingMore = true;
    this.currentPage++;

    this.dataService.getProductsWithPagination(this.currentPage, this.currentFilters)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ products, hasMore }) => {
          this.products = [...this.products, ...products];
          this.hasMore = hasMore;
          this.isLoadingMore = false;
        },
        error: (error) => {
          console.error('Error loading more products:', error);
          this.isLoadingMore = false;
          this.currentPage--; // Revert page increment on error
        }
      });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }


  handleFilterChange(filters: FilterState): void {
    this.currentFilters = filters;
    this.loadInitialProducts();
  }

  get filteredProducts(): Product[] {
    let filtered = this.products;

    if (this.currentFilters.searchTerm) {
      filtered = filtered.filter((p: any) =>
        p.name.toLowerCase().includes(this.currentFilters.searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(this.currentFilters.searchTerm.toLowerCase())
      );
    }

    if (this.currentFilters.category) {
      filtered = filtered.filter((p: any) => p.category === this.currentFilters.category);
    }

    switch (this.currentFilters.sortBy) {
      case 'price-asc':
        filtered.sort((a: { price: number }, b: { price: number }) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a: { price: number }, b: { price: number }) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a: { price: number, name: string }, b: { price: number, name: string }) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }

  clearAllFilters(): void {
    this.currentFilters = {
      searchTerm: '',
      category: '',
      sortBy: 'price-asc'
    };
    this.productFilters.resetFilters();
    this.loadInitialProducts();
  }
}
