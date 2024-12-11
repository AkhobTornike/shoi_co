import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Review } from '../../Interface/review';

import { ProductsService } from '../../Services/products.service';
import { ReviewsService } from '../../Services/reviews.service';

import { Product } from '../../Interface/product';
import { UserService } from '../../Services/user.service';
import { User } from '../../Interface/user';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  private productId!: number;
  product!: Product;
  reviews: Review[] = [];

  activeImageUrl!: string;
  selectedColorIndex: number | null = null;
  selectedSize: string | null = null;

  activeTab = 'details';

  quantity = 1;


  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private reviewsService: ReviewsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.product = this.productsService.getProductById(this.productId);
      this.reviews = this.reviewsService.getReviewForProduct(this.product.reviewsIDs);
    });
    console.log(this.reviews)
    this.activeImageUrl = this.product.frontImage;
  }


  calculateAverageRating(): number {
    return this.reviews.reduce((sum, review) => sum + (typeof review.stars === 'number' ? review.stars : 0), 0) / this.reviews.length || 0;
  }

  getAssessmentValue(product: Product): number {
    if (product.reviewsIDs.length === 0) {
      return 0;
    }

    let totalRating = 0 ;
    let count = 0;

    product.reviewsIDs.forEach(reviewId => {
      this.reviews = this.reviewsService.getReviewsByIds(reviewId);
      totalRating += Number(this.reviews[0].stars);
      count++;
    });

    const averageRating = count > 0 ? totalRating / count : 0;
    return parseFloat(averageRating.toFixed(1));
  }

  getStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }

  getDiscountedPrice(price: number, discount: number): number {
    return price - (price * discount) / 100;
  }

  getUserName(userId: number): string {
    return this.userService.getUserByID(userId).userName;
  }

  incrementQuantity(): void {
    this.quantity++;
  }

  decrementQuantity(): void {
    if (this.quantity > 1) this.quantity--;
  }

  selectColor(index: number): void {
    this.selectedColorIndex = index;
  }

  selectSize(size: string): void {
    this.selectedSize = size;
  }
}
