import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SeasonListComponent } from '../season-list/season-list.component';

const routes: Routes = [
  {
    path: ':year/:season',
    component: SeasonListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeasonRoutingModule {}
