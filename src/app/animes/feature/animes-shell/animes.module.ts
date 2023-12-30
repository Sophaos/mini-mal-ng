import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeDetailsComponent } from '../anime-details/anime-details.component';
import { AnimesListComponent } from '../anime-list/animes-list.component';
import { AnimeRoutingModule } from './animes-routing.module';
import { AnimeService } from '../../data-access/anime.service';
import { DataViewComponent } from 'src/app/shared/ui/data-view/data-view.component';
import { PaginatorComponent } from 'src/app/shared/ui/paginator/paginator.component';
import { DataViewFilterComponent } from 'src/app/shared/ui/data-view-filter/data-view-filter.component';
import { ItemsContainerComponent } from 'src/app/shared/ui/items-container/items-container.component';
import { MainPreviewContentComponent } from 'src/app/shared/ui/main-preview-content/main-preview-content.component';
import { ReviewRowComponent } from 'src/app/shared/ui/review-row/review-row.component';
import { RecommendationRowComponent } from 'src/app/shared/ui/recommendation-row/recommendation-row.component';
import { DetailedReviewComponent } from 'src/app/shared/ui/detailed-review/detailed-review.component';
import { ThemeComponent } from '../../ui/theme/theme.component';
import { StaffComponent } from '../../ui/staff/staff.component';
import { CharactersComponent } from 'src/app/shared/ui/characters/characters.component';
import { RelationsComponent } from 'src/app/shared/ui/relations/relations.component';
import { MediaRecommendationsComponent } from 'src/app/shared/ui/media-recommendations/media-recommendations.component';
import { SkeletonDataListComponent } from 'src/app/shared/ui/skeleton-data-list/skeleton-data-list.component';
import { SkeletonMainPreviewComponent } from 'src/app/shared/ui/skeleton-main-preview/skeleton-main-preview.component';
import { SkeletonPanelHeaderComponent } from 'src/app/shared/ui/skeleton-panel-header/skeleton-panel-header.component';
import {
  animeFeatureKey,
  animeReducer,
} from '../../data-access/anime.reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AnimeEffects } from '../../data-access/anime.effects';

@NgModule({
  declarations: [AnimesListComponent, AnimeDetailsComponent],
  imports: [
    CommonModule,
    AnimeRoutingModule,
    DataViewComponent,
    PaginatorComponent,
    DataViewFilterComponent,
    ItemsContainerComponent,
    MainPreviewContentComponent,
    ReviewRowComponent,
    RecommendationRowComponent,
    DetailedReviewComponent,
    ThemeComponent,
    StaffComponent,
    CharactersComponent,
    RelationsComponent,
    MediaRecommendationsComponent,
    SkeletonDataListComponent,
    SkeletonMainPreviewComponent,
    SkeletonPanelHeaderComponent,
    StoreModule.forFeature(animeFeatureKey, animeReducer),
    EffectsModule.forFeature([AnimeEffects]),
  ],
  providers: [AnimeService],
})
export class AnimeModule {}
