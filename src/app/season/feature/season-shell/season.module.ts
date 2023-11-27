import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeasonListComponent } from '../season-list/season-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
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
import { SeasonFilterComponent } from '../season-filter/season-filter.component';

@NgModule({
  declarations: [SeasonListComponent, SeasonFilterComponent],
  imports: [
    SeasonRoutingModule,
    CommonModule,
    DataViewModule,
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
  ],
  providers: [SeasonsService],
})
export class SeasonModule {}
