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
  ],
  providers: [AnimeService],
})
export class AnimeModule {}
