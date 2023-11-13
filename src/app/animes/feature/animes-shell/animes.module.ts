import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { AnimeDetailsComponent } from '../anime-details/anime-details.component';
import { AnimesListComponent } from '../anime-list/animes-list.component';
import { AnimeRoutingModule } from './animes-routing.module';
import { AnimeService } from '../../data-access/anime.service';

@NgModule({
  declarations: [AnimesListComponent, AnimeDetailsComponent],
  imports: [
    CommonModule,
    AnimeRoutingModule,
    DataViewModule,
    ButtonModule,
    CarouselModule,
    PaginatorModule,
    DropdownModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  providers: [AnimeService],
})
export class AnimeModule {}
