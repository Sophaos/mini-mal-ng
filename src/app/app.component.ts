import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AnimesPagesActions } from './state/animes.actions';
import {
  selectAnimes,
  selectSeasonNow,
  selectTop,
  selectTopAiring,
  selectTopPopularity,
  selectTopUpcoming,
} from './state/animes.selector';
import { AnimeBasicInfo } from './models/AnimeBasicInfo';
import { Observable } from 'rxjs';
import { TopAnimeMangaParams } from './services/jikan-api/top.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  animes$: Observable<AnimeBasicInfo[]> = this.store.select(selectAnimes);
  top$: Observable<AnimeBasicInfo[]> = this.store.select(selectTop);
  topAiring$: Observable<AnimeBasicInfo[]> = this.store.select(selectTopAiring);
  topUpcoming$: Observable<AnimeBasicInfo[]> =
    this.store.select(selectTopUpcoming);
  topPopularity$: Observable<AnimeBasicInfo[]> =
    this.store.select(selectTopPopularity);
  seasonNow$: Observable<AnimeBasicInfo[]> = this.store.select(selectSeasonNow);
  constructor(private store: Store<any>) {}
  ngOnInit(): void {
    this.store.dispatch(
      AnimesPagesActions.loadTopAnimesByAiring({
        params: { filter: 'airing', limit: 5, sfw: true },
      })
    );
    this.store.dispatch(
      AnimesPagesActions.loadTopAnimesByPopularity({
        params: { filter: 'bypopularity', limit: 5, sfw: true },
      })
    );
    this.store.dispatch(
      AnimesPagesActions.loadTopAnimesByUpcoming({
        params: { filter: 'upcoming', limit: 5, sfw: true },
      })
    );
    setTimeout(() => {
      this.store.dispatch(
        AnimesPagesActions.loadSeasonNow({
          params: { limit: 5, sfw: true },
        })
      );
    }, 3000);
  }
  title = 'anime-list-replica';
}
