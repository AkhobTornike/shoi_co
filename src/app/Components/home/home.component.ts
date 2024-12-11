import { Component, OnInit, Inject, PLATFORM_ID  } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { PartnersComponent } from "./partners/partners.component";
import { ProductsService } from '../../Services/products.service';
import { Product } from '../../Interface/product';
import { DressStyleComponent } from "./dress-style/dress-style.component";
import { ReviewsComponent } from "./reviews/reviews.component";
import { Review } from '../../Interface/review';
import { ReviewsService } from '../../Services/reviews.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, PartnersComponent, CommonModule, DressStyleComponent, ReviewsComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public newArrivalsProducts: Product[] = [];
  public topSellingsProducts: Product[] = [];
  public reviews: Review[] = [];

  isMobileView: boolean = false;


  constructor(
    private productsService: ProductsService,
    private reviewsService: ReviewsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
      window.addEventListener('resize', () => this.checkScreenSize());
    }
    this.newArrivalsProducts = this.productsService.getProducts().slice(0, 4);
    this.topSellingsProducts = this.productsService.getProducts().filter(p => p.isDiscounted).map(p => ({...p, price: p.price *(1 - p.discount)})).slice(0, 4);
  }

  checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobileView = window.innerWidth <= 947;
    }
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

  navigateToProduct(productId: number): void {
    console.log('Navigating to product with id: ' + productId);
  }

}
