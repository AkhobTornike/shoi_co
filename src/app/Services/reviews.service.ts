import { Injectable } from '@angular/core';

import * as reviewsData from '../../../public/reviews.json';
import { Review } from '../Interface/review';
@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor() { }

  getReviews(): Review[] {
    return (reviewsData as any).default;
  }

  
  getReviewsByIds(id: number): Review[] {
    return (reviewsData as any).default.filter((review: Review) => review.reviewID === id)
  }
}
