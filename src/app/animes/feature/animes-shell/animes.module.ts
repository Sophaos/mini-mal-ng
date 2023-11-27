import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { AnimeDetailsComponent } from '../anime-details/anime-details.component';
import { AnimesListComponent } from '../anime-list/animes-list.component';
import { AnimeRoutingModule } from './animes-routing.module';
import { AnimeService } from '../../data-access/anime.service';
import { DataViewComponent } from 'src/app/shared/ui/data-view/data-view.component';
import { AnimesFilterComponent } from '../animes-filter/animes-filter.component';
import { PaginatorComponent } from 'src/app/shared/ui/paginator/paginator.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AnimesListComponent,
    AnimeDetailsComponent,
    AnimesFilterComponent,
  ],
  imports: [
    CommonModule,
    AnimeRoutingModule,
    DataViewComponent,
    PaginatorComponent,
    DropdownModule,
    ReactiveFormsModule,
  ],
  providers: [AnimeService],
})
export class AnimeModule {}
