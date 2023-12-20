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
import { ItemsContainerComponent } from 'src/app/home/ui/items-container/items-container.component';
import { CardModule } from 'primeng/card';
import { MainPreviewContentComponent } from 'src/app/home/ui/main-preview-content/main-preview-content.component';
import { DividerModule } from 'primeng/divider';
import { GalleriaModule } from 'primeng/galleria';
import { PanelModule } from 'primeng/panel';
import { AccordionModule } from 'primeng/accordion';
import { DataViewModule } from 'primeng/dataview';
import { ReviewRowComponent } from 'src/app/home/ui/review-row/review-row.component';
import { RecommendationRowComponent } from 'src/app/home/ui/recommendation-row/recommendation-row.component';
import { DetailedReviewComponent } from 'src/app/shared/ui/detailed-review/detailed-review.component';
import { ThemeComponent } from '../../ui/theme/theme.component';
import { StaffComponent } from '../../ui/staff/staff.component';
import { CharactersComponent } from 'src/app/shared/ui/characters/characters.component';
import { RelationsComponent } from 'src/app/shared/ui/relations/relations.component';
import { MediaRecommendationsComponent } from 'src/app/home/ui/media-recommendations/media-recommendations.component';

@NgModule({
  declarations: [AnimesListComponent, AnimeDetailsComponent],
  imports: [
    CommonModule,
    AnimeRoutingModule,
    DropdownModule,
    CardModule,
    DataViewComponent,
    PaginatorComponent,
    ReactiveFormsModule,
    DataViewFilterComponent,
    ItemsContainerComponent,
    MainPreviewContentComponent,
    DividerModule,
    GalleriaModule,
    PanelModule,
    AccordionModule,
    DataViewModule,
    ReviewRowComponent,
    RecommendationRowComponent,
    DetailedReviewComponent,
    ThemeComponent,
    StaffComponent,
    CharactersComponent,
    RelationsComponent,
    MediaRecommendationsComponent,
  ],
  providers: [AnimeService],
})
export class AnimeModule {}
