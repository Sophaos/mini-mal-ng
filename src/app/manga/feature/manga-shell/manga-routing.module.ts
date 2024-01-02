import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MangaListComponent } from '../manga-list/manga-list.component';
import { MangaDetailsComponent } from '../manga-details/manga-details.component';

const routes: Routes = [
  {
    path: '',
    component: MangaListComponent,
  },
  {
    path: ':id',
    component: MangaDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MangaRoutingModule {}
