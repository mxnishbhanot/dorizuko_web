import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category, DataService, Product } from '../../services/data.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatCardModule,MatIconModule, CommonModule, MatButtonModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  featuredProducts: Product[] = [];
  categories: Category[] = [];
  trendingProducts: Product[] = [];
  loading = true;

  features = [
    { icon: 'local_shipping', title: 'Free Shipping', description: 'On orders over $100' },
    { icon: 'replay', title: 'Easy Returns', description: '30-day return policy' },
    { icon: 'headset_mic', title: '24/7 Support', description: 'Always here to help' },
    { icon: 'security', title: 'Secure Payments', description: '100% secure checkout' }
  ];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.dataService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.dataService.getFeaturedProducts(8).subscribe(products => {
      this.featuredProducts = products;
      this.loading = false;
    });

    this.dataService.getProducts(4).subscribe(products => {
      this.trendingProducts = products;
    });
  }

  getStarArray(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
