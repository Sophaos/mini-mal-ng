import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: 'animes/:id', component: AnimeDetailsComponent },
  // // { path: 'mangas-home', component: MangasHomeComponent },
  // { path: 'animes', component: AnimesListComponent },
  // { path: 'season', component: AnimeSeasonListComponent },
  // { path: '', component: HomeComponent },
  // { path: '**', component: HomeComponent },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/feature/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'season',
    loadChildren: () =>
      import('./season/feature/season.module').then((m) => m.SeasonModule),
  },
  {
    path: 'animes',
    loadChildren: () =>
      import('./animes/feature/animes-shell/animes.module').then(
        (m) => m.AnimeModule
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
