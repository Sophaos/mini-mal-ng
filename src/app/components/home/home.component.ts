import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AnimeBasicInfo } from 'src/app/models/AnimeBasicInfo';
import { AnimesPagesActions } from 'src/app/state/animes.actions';
import {
  selectAnimes,
  selectTop,
  selectTopAiring,
  selectTopUpcoming,
  selectTopPopularity,
  selectSeasonNow,
} from 'src/app/state/animes.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
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
        params: { filter: 'airing', limit: 12, sfw: true },
      })
    );
    this.store.dispatch(
      AnimesPagesActions.loadTopAnimesByPopularity({
        params: { filter: 'bypopularity', limit: 12, sfw: true },
      })
    );
    this.store.dispatch(
      AnimesPagesActions.loadTopAnimesByUpcoming({
        params: { filter: 'upcoming', limit: 12, sfw: true },
      })
    );
  }
}
