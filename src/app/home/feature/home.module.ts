import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeService } from '../data-access/home.service';
import { ItemsContainerComponent } from '../../shared/ui/items-container/items-container.component';
import { CardModule } from 'primeng/card';
import { MainPreviewComponent } from '../../shared/ui/main-preview/main-preview.component';
import { ReviewRowComponent } from '../../shared/ui/review-row/review-row.component';
import { DataViewModule } from 'primeng/dataview';
import { RecommendationRowComponent } from '../../shared/ui/recommendation-row/recommendation-row.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ItemsContainerComponent,
    MainPreviewComponent,
    CardModule,
    ReviewRowComponent,
    DataViewModule,
    RecommendationRowComponent,
  ],
  providers: [HomeService],
})
export class HomeModule {}
