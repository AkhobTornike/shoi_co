import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Review } from '../../../Interface/review';
import { ReviewsService } from '../../../Services/reviews.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../Services/user.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  public reviews: Review[] = [];
  
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;

  constructor(
    private reviewsService: ReviewsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.reviews = this.reviewsService.getReviews().filter((review) => Number(review.stars) > 4.5);
  }

  scrollLeft(): void {
    this.scrollContainer.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  }

  scrollRight(): void {
    this.scrollContainer.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  }

  getStars(stars: Float32Array | number): number[] {
    let rating: number;
  
    if (stars instanceof Float32Array) {
      rating = stars.length > 0 ? stars[0] : 0;
    } else {
      rating = stars;
    }
  
    return Array(Math.round(rating)).fill(0);
  }

  getReviewUserName(userID: number): string {
    return this.userService.getUserByID(userID).userName;
  }
}
