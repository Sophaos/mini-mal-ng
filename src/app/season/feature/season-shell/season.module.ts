import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeasonListComponent } from '../season-list/season-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { SeasonRoutingModule } from './season-routing.module';
import { SeasonsService } from '../../data-access/seasons.service';
import { TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PaginatorComponent } from 'src/app/shared/ui/paginator/paginator.component';
import { DataViewComponent } from 'src/app/shared/ui/data-view/data-view.component';
import { DataViewFilterComponent } from 'src/app/shared/ui/data-view-filter/data-view-filter.component';
import { SkeletonDataListComponent } from 'src/app/shared/ui/skeleton-data-list/skeleton-data-list.component';
import { StoreModule } from '@ngrx/store';
import { SeasonEffects } from '../../data-access/season.effects';
import { EffectsModule } from '@ngrx/effects';
import {
  seasonFeatureKey,
  seasonReducer,
} from '../../data-access/season.reducers';

@NgModule({
  declarations: [SeasonListComponent],
  imports: [
    SeasonRoutingModule,
    CommonModule,
    ButtonModule,
    PaginatorModule,
    DropdownModule,
    ReactiveFormsModule,
    InputTextModule,
    TabViewModule,
    TabMenuModule,
    SelectButtonModule,
    PaginatorComponent,
    DataViewComponent,
    DataViewFilterComponent,
    SkeletonDataListComponent,
    StoreModule.forFeature(seasonFeatureKey, seasonReducer),
    EffectsModule.forFeature([SeasonEffects]),
  ],
  providers: [SeasonsService],
})
export class SeasonModule {}
