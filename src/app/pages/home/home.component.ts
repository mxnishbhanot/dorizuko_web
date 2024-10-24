import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category, DataService, Product } from '../../services/data.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatCardModule,MatIconModule, CommonModule, MatButtonModule, MatSelectModule, MatSnackBarModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  featuredProducts: Product[] = [];
  categories: Category[] = [];
  trendingProducts: Product[] = [];
  loading = true;
  customDesignForm!: FormGroup;

  features = [
    { icon: 'local_shipping', title: 'Free Shipping', description: 'On orders over $100' },
    { icon: 'replay', title: 'Easy Returns', description: '30-day return policy' },
    { icon: 'headset_mic', title: '24/7 Support', description: 'Always here to help' },
    { icon: 'security', title: 'Secure Payments', description: '100% secure checkout' }
  ];

  constructor(private dataService: DataService,private fb: FormBuilder,
    private snackBar: MatSnackBar) {
      this.createForm();
    }

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

  private createForm() {
    this.customDesignForm = this.fb.group({
      designType: ['', Validators.required],
      garmentType: ['', Validators.required],
      sizeRange: [[], Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmitDesign() {
    if (this.customDesignForm.valid) {
      // Handle form submission
      console.log(this.customDesignForm.value);
      this.snackBar.open('Design request submitted successfully!', 'Close', {
        duration: 3000
      });
      this.customDesignForm.reset();
    }
  }

  openCustomDialog(){
    
  }
}
