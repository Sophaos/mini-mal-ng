import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeService } from '../data-access/home.service';
import { ItemsContainerComponent } from '../../shared/ui/items-container/items-container.component';
import { MainPreviewComponent } from '../../shared/ui/main-preview/main-preview.component';
import { ReviewRowComponent } from '../../shared/ui/review-row/review-row.component';
import { RecommendationRowComponent } from '../../shared/ui/recommendation-row/recommendation-row.component';
import { SkeletonMainPreviewComponent } from 'src/app/shared/ui/skeleton-main-preview/skeleton-main-preview.component';
import { SkeletonPanelHeaderComponent } from 'src/app/shared/ui/skeleton-panel-header/skeleton-panel-header.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { homeFeatureKey, homeReducer } from '../data-access/home.reducers';
import { HomeEffects } from '../data-access/home.effects';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ItemsContainerComponent,
    MainPreviewComponent,
    ReviewRowComponent,
    RecommendationRowComponent,
    SkeletonMainPreviewComponent,
    SkeletonPanelHeaderComponent,
    StoreModule.forFeature(homeFeatureKey, homeReducer),
    EffectsModule.forFeature([HomeEffects]),
  ],
  providers: [HomeService],
})
export class HomeModule {}
