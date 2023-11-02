import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimesHomeComponent } from './components/animes-home/animes-home.component';
import { AnimeDetailsComponent } from './components/anime-details/anime-details.component';
import { AnimeSeasonListComponent } from './components/anime-season-list/anime-season-list.component';
import { AnimesListComponent } from './components/animes-list/animes-list.component';
import { MangasHomeComponent } from './components/mangas-home/mangas-home.component';

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
