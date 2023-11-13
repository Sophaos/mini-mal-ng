import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimeDetailsComponent } from '../anime-details/anime-details.component';
import { AnimesListComponent } from '../anime-list/animes-list.component';

const routes: Routes = [
  {
    path: '',
    component: AnimesListComponent,
  },
  {
    path: ':id', // Define the route with the :id parameter
    component: AnimeDetailsComponent, // Replace with the actual component for displaying anime details
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimeRoutingModule {}
