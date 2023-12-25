import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { AnimeDetailsComponent } from '../anime-details/anime-details.component';
import { AnimesListComponent } from '../anime-list/animes-list.component';
import { AnimeRoutingModule } from './animes-routing.module';
import { AnimeService } from '../../data-access/anime.service';
import { DataViewComponent } from 'src/app/shared/ui/data-view/data-view.component';
import { PaginatorComponent } from 'src/app/shared/ui/paginator/paginator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataViewFilterComponent } from 'src/app/shared/ui/data-view-filter/data-view-filter.component';
import { ItemsContainerComponent } from 'src/app/shared/ui/items-container/items-container.component';
import { CardModule } from 'primeng/card';
import { MainPreviewContentComponent } from 'src/app/shared/ui/main-preview-content/main-preview-content.component';
import { DividerModule } from 'primeng/divider';
import { GalleriaModule } from 'primeng/galleria';
import { PanelModule } from 'primeng/panel';
import { AccordionModule } from 'primeng/accordion';
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

@NgModule({
  declarations: [AnimesListComponent, AnimeDetailsComponent],
  imports: [
    CommonModule,
    AnimeRoutingModule,
    DataViewComponent,
    PaginatorComponent,
    ReactiveFormsModule,
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
  ],
  providers: [AnimeService],
})
export class AnimeModule {}
