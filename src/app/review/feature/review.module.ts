import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewListComponent } from './review-list.component';
import { ReviewRoutingModule } from './review-routing.module';
import { ReviewsService } from '../data-access/reviews.service';

@NgModule({
  declarations: [ReviewListComponent],
  imports: [CommonModule, ReviewRoutingModule],
  providers: [ReviewsService],
})
export class ReviewModule {}
