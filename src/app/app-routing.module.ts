import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimeDetailsComponent } from './anime/feature/anime-details/anime-details.component';
import { AnimesListComponent } from './anime/feature/animes-list/animes-list.component';
import { AnimesHomeComponent } from './home/feature/animes-home/animes-home.component';
import { MangasHomeComponent } from './home/feature/mangas-home/mangas-home.component';
import { AnimeSeasonListComponent } from './season/feature/anime-season-list/anime-season-list.component';

const routes: Routes = [
  { path: 'animes/:id', component: AnimeDetailsComponent },
  { path: 'animes-home', component: AnimesHomeComponent },
  { path: 'mangas-home', component: MangasHomeComponent },

  { path: 'animes', component: AnimesListComponent },
  { path: 'season', component: AnimeSeasonListComponent },
  { path: '**', component: AnimesHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
