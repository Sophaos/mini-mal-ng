import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AnimeDetailsComponent } from './components/anime-details/anime-details.component';
import { AnimeSeasonListComponent } from './components/anime-season-list/anime-season-list.component';
import { AnimesListComponent } from './components/animes-list/animes-list.component';

const routes: Routes = [
  { path: 'animes/:id', component: AnimeDetailsComponent },
  { path: 'animes', component: AnimesListComponent },
  { path: 'season', component: AnimeSeasonListComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
