import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Product } from '../../services/data.service';
import { CartService } from '../../services/cart.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatFormFieldModule, MatIconModule, MatSelectModule, MatChipsModule, MatButtonToggleModule, FormsModule, MatButtonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  product: Product = {
    id: '1',
    name: 'Premium Athletic Sneakers',
    price: 129.99,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    images: [
      {
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
        alt: 'Red Nike sneaker'
      },
      {
        url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa',
        alt: 'Nike sneaker side view'
      },
      {
        url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
        alt: 'Nike sneaker top view'
      },
      {
        url: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329',
        alt: 'Nike sneaker back view'
      }
    ],
    description: 'High-performance athletic sneakers designed for maximum comfort and durability. Perfect for running, training, and casual wear.',
    category: 'Footwear',
    rating: 4.5,
    discount: 15,
    tags: ['Athletic', 'Running', 'Comfortable'],
    inStock: true,
    brand: 'Nike',
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
    colors: ['#FF0000', '#000000', '#FFFFFF', '#0000FF']
  };

  selectedQuantity = 1;
  selectedColor: string = this.product.colors[0];
  selectedSize: string = this.product.sizes[0];
  isZoomed = false;
  zoomStyle = '';
  thumbnailOffset = 0;
  showThumbNav = false;
  readonly THUMB_SCROLL_AMOUNT = 200;
  selectedImageIndex = 0;
  selectedImage: any
  isFullscreen = false;

  @ViewChild('zoomContainer') zoomContainer!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    this.selectedImage = { url: this.product.images[this.selectedImageIndex].url, alt: this.product.images[this.selectedImageIndex].alt };
    this.checkThumbNavigation();
    // this.dataService.getProducts().subscribe((products: any)=>{
    //   this.product = products.find((item: Product)=> item.id === productId);
    //   console.log(this. product);

    // })
  }
  calculateDiscountedPrice(): number {
    if (this.product.discount) {
      return this.product.price * (1 - this.product.discount / 100);
    }
    return this.product.price;
  }

  addToWishlist(): void {
    console.log('Adding to wishlist:', this.product);
  }

  selectColor(color: string): void {
    this.selectedColor = color;
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  openSizeGuide(): void {
    // Implement size guide dialog/modal
    console.log('Opening size guide...');
  }

  handleZoom(event: MouseEvent) {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    this.isZoomed = true;
    this.zoomStyle = `scale(1.5) translate(${-x * 100}%, ${-y * 100}%)`;
  }

  selectImage(index: number): void {
    this.selectedImageIndex = index;
    this.ensureVisibleThumbnail();
    this.selectedImage = { url: this.product.images[index].url, alt: this.product.images[index].alt };
    this.resetZoom();  // Reset zoom on image change
}


scrollThumbnails(direction: 'prev' | 'next'): void {
  const multiplier = direction === 'prev' ? 1 : -1;
  this.thumbnailOffset += this.THUMB_SCROLL_AMOUNT * multiplier;
  this.checkThumbNavigation();
}
checkThumbNavigation(): void {
  const stripWidth = this.product.images.length * 110; // thumbnail width + gap
  const containerWidth = 600; // approximate container width
  this.showThumbNav = stripWidth > containerWidth;

  // Prevent scrolling too far
  const maxOffset = 0;
  const minOffset = -(stripWidth - containerWidth);
  this.thumbnailOffset = Math.min(maxOffset, Math.max(minOffset, this.thumbnailOffset));
}
ensureVisibleThumbnail(): void {
  const thumbnailPos = this.selectedImageIndex * 110;
  const containerWidth = 600;

  if (thumbnailPos < -this.thumbnailOffset) {
    this.thumbnailOffset = -thumbnailPos;
  } else if (thumbnailPos + 110 > -this.thumbnailOffset + containerWidth) {
    this.thumbnailOffset = -(thumbnailPos - containerWidth + 110);
  }

  this.checkThumbNavigation();
}

toggleFullscreen(element: HTMLElement): void {
  if (!document.fullscreenElement) {
      // Enter fullscreen
      element.requestFullscreen().then(() => {
          this.isFullscreen = true;  // Update icon to 'fullscreen_exit'
      }).catch(err => {
          console.error(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
      });
  } else {
      // Exit fullscreen
      document.exitFullscreen().then(() => {
          this.isFullscreen = false;  // Update icon to 'fullscreen'
      }).catch(err => {
          console.error(`Error attempting to exit fullscreen mode: ${err.message} (${err.name})`);
      });
  }
}
  previousImage(): void {
    if (this.selectedImageIndex > 0) {
        this.selectedImageIndex--;
        this.selectImage(this.selectedImageIndex);  // Reset zoom when navigating
    }
}
nextImage(): void {
  if (this.selectedImageIndex < this.product.images.length - 1) {
      this.selectedImageIndex++;
      this.selectImage(this.selectedImageIndex);  // Reset zoom when navigating
  }
}

  resetZoom() {
    this.isZoomed = false;
    this.zoomStyle = 'scale(1) translate(0, 0)';
}
}
