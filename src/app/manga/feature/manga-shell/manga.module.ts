import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewComponent } from 'src/app/shared/ui/data-view/data-view.component';
import { PaginatorComponent } from 'src/app/shared/ui/paginator/paginator.component';
import { DataViewFilterComponent } from 'src/app/shared/ui/data-view-filter/data-view-filter.component';
import { ItemsContainerComponent } from 'src/app/home/ui/items-container/items-container.component';
import { MangaListComponent } from '../manga-list/manga-list.component';
import { MangaService } from '../../data-access/manga.service';
import { MangaRoutingModule } from './manga-routing.module';

@NgModule({
  declarations: [MangaListComponent],
  imports: [
    CommonModule,
    MangaRoutingModule,
    DataViewComponent,
    PaginatorComponent,
    DataViewFilterComponent,
    ItemsContainerComponent,
  ],
  providers: [MangaService],
})
export class MangaModule {}
