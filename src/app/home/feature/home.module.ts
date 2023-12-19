import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeService } from '../data-access/home.service';
import { ItemsContainerComponent } from '../ui/items-container/items-container.component';
import { MediaCarouselComponent } from '../ui/media-carousel/media-carousel.component';
import { CardModule } from 'primeng/card';
import { MainPreviewComponent } from '../ui/main-preview/main-preview.component';
import { ReviewRowComponent } from '../ui/review-row/review-row.component';
import { DataViewModule } from 'primeng/dataview';
import { RecommendationRowComponent } from '../ui/recommendation-row/recommendation-row.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ItemsContainerComponent,
    MediaCarouselComponent,
    MainPreviewComponent,
    CardModule,
    ReviewRowComponent,
    DataViewModule,
    RecommendationRowComponent,
  ],
  providers: [HomeService],
})
export class HomeModule {}
