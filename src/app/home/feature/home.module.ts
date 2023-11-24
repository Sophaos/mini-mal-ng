import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { HomeService } from '../data-access/home.service';
import { MediaCardComponent } from '../ui/media-card/media-card.component';
import { ReviewRowComponent } from '../ui/review-row/review-row.component';
import { DividerModule } from 'primeng/divider';
import { ItemsContainerComponent } from '../ui/items-container/items-container.component';
import { MediaCarouselComponent } from '../ui/media-carousel/media-carousel.component';
import { ReviewsComponent } from '../ui/reviews/reviews.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    DataViewModule,
    ButtonModule,
    CarouselModule,
    PaginatorModule,
    DropdownModule,
    ReactiveFormsModule,
    InputTextModule,
    MediaCardComponent,
    ReviewRowComponent,
    DividerModule,
    ItemsContainerComponent,
    MediaCarouselComponent,
    ReviewsComponent,
  ],
  providers: [HomeService],
})
export class HomeModule {}
