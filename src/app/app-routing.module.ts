import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/feature/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'season',
    loadChildren: () =>
      import('./season/feature/season-shell/season.module').then(
        (m) => m.SeasonModule
      ),
  },
  {
    path: 'animes',
    loadChildren: () =>
      import('./animes/feature/animes-shell/animes.module').then(
        (m) => m.AnimeModule
      ),
  },
  {
    path: 'mangas',
    loadChildren: () =>
      import('./manga/feature/manga-shell/manga.module').then(
        (m) => m.MangaModule
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
