import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { getCurrentSeason } from 'src/app/shared/utils/currentSeason';
import { Store } from '@ngrx/store';
import {
  selectPageLoading,
  selectRecentAnimeRecommendations,
  selectRecentAnimeReviews,
  selectTopAiringAnimes,
} from '../data-access/home.selectors';
import { HomePageActions } from '../data-access/home.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  currentSeason = '';
  currentYear = new Date().getFullYear();
  topAiringAnimes$ = this.store.select(selectTopAiringAnimes);
  animeReviews$ = this.store.select(selectRecentAnimeReviews);
  animeRecommendations$ = this.store.select(selectRecentAnimeRecommendations);
  isLoading$ = this.store.select(selectPageLoading);

  vmMain$ = combineLatest([
    this.topAiringAnimes$,
    this.animeReviews$,
    this.animeRecommendations$,
    this.isLoading$,
  ]).pipe(
    map(([topAiringAnimes, reviews, recommendations, isLoading]) => ({
      topAiringAnimes,
      reviews,
      recommendations,
      isLoading,
    }))
  );

  constructor(private store: Store) {
    this.currentSeason = getCurrentSeason();
  }
  ngOnInit(): void {
    this.store.dispatch(HomePageActions.loadTopAiringAnimes());
    this.store.dispatch(HomePageActions.loadRecentAnimeReviews());
    this.store.dispatch(HomePageActions.loadRecentAnimeRecommendations());
  }
}
