import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MangaListComponent } from '../manga-list/manga-list.component';

const routes: Routes = [
  {
    path: '',
    component: MangaListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MangaRoutingModule {}
