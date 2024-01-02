import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewComponent } from 'src/app/shared/ui/data-view/data-view.component';
import { PaginatorComponent } from 'src/app/shared/ui/paginator/paginator.component';
import { DataViewFilterComponent } from 'src/app/shared/ui/data-view-filter/data-view-filter.component';
import { ItemsContainerComponent } from 'src/app/shared/ui/items-container/items-container.component';
import { MangaListComponent } from '../manga-list/manga-list.component';
import { MangaService } from '../../data-access/manga.service';
import { MangaRoutingModule } from './manga-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  mangaFeatureKey,
  mangaReducer,
} from '../../data-access/manga.reducers';
import { MangaEffects } from '../../data-access/manga.effects';
import { ThemeComponent } from 'src/app/animes/ui/theme/theme.component';
import { CharactersComponent } from 'src/app/shared/ui/characters/characters.component';
import { DetailedReviewComponent } from 'src/app/shared/ui/detailed-review/detailed-review.component';
import { MainPreviewContentComponent } from 'src/app/shared/ui/main-preview-content/main-preview-content.component';
import { MediaRecommendationsComponent } from 'src/app/shared/ui/media-recommendations/media-recommendations.component';
import { RecommendationRowComponent } from 'src/app/shared/ui/recommendation-row/recommendation-row.component';
import { RelationsComponent } from 'src/app/shared/ui/relations/relations.component';
import { ReviewRowComponent } from 'src/app/shared/ui/review-row/review-row.component';
import { SkeletonDataListComponent } from 'src/app/shared/ui/skeleton-data-list/skeleton-data-list.component';
import { SkeletonMainPreviewComponent } from 'src/app/shared/ui/skeleton-main-preview/skeleton-main-preview.component';
import { SkeletonPanelHeaderComponent } from 'src/app/shared/ui/skeleton-panel-header/skeleton-panel-header.component';
import { MangaDetailsComponent } from '../manga-details/manga-details.component';

@NgModule({
  declarations: [MangaListComponent, MangaDetailsComponent],
  imports: [
    CommonModule,
    MangaRoutingModule,
    DataViewComponent,
    PaginatorComponent,
    DataViewFilterComponent,
    ItemsContainerComponent,
    MainPreviewContentComponent,
    ReviewRowComponent,
    RecommendationRowComponent,
    DetailedReviewComponent,
    ThemeComponent,
    CharactersComponent,
    RelationsComponent,
    MediaRecommendationsComponent,
    SkeletonDataListComponent,
    SkeletonMainPreviewComponent,
    SkeletonPanelHeaderComponent,
    StoreModule.forFeature(mangaFeatureKey, mangaReducer),
    EffectsModule.forFeature([MangaEffects]),
  ],
  providers: [MangaService],
})
export class MangaModule {}
