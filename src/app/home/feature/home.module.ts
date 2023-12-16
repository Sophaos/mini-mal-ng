import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeService } from '../data-access/home.service';
import { ItemsContainerComponent } from '../ui/items-container/items-container.component';
import { MediaCarouselComponent } from '../ui/media-carousel/media-carousel.component';
import { ReviewsComponent } from '../ui/reviews/reviews.component';
import { CardModule } from 'primeng/card';
import { RecommendationsComponent } from '../ui/recommendations/recommendations.component';
import { MainPreviewComponent } from '../ui/main-preview/main-preview.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ItemsContainerComponent,
    MediaCarouselComponent,
    ReviewsComponent,
    RecommendationsComponent,
    MainPreviewComponent,
    CardModule,
  ],
  providers: [HomeService],
})
export class HomeModule {}
