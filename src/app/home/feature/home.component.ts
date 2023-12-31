import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { getCurrentSeason } from 'src/app/shared/utils/currentSeason';
import { Store } from '@ngrx/store';
import {
  selectPageLoading,
  selectRecentAnimeRecommendations,
  selectRecentAnimeRecommendationsLoading,
  selectRecentAnimeReviews,
  selectRecentAnimeReviewsLoading,
  selectTopAiringAnimes,
  selectTopAiringAnimesLoading,
} from '../data-access/home.selectors';
import { HomePageActions } from '../data-access/home.actions';
import { HomeState } from '../data-access/home.reducers';

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

  topAiringAnimesLoading$ = this.store.select(selectTopAiringAnimesLoading);
  animeReviewsLoading$ = this.store.select(selectRecentAnimeReviewsLoading);
  animeRecommendationsLoading$ = this.store.select(
    selectRecentAnimeRecommendationsLoading
  );

  // isLoading$ = this.store.select(selectPageLoading);

  vm$ = combineLatest([
    this.topAiringAnimes$,
    this.animeReviews$,
    this.animeRecommendations$,
    this.topAiringAnimesLoading$,
    this.animeReviewsLoading$,
    this.animeRecommendationsLoading$,
  ]).pipe(
    map(
      ([
        topAiringAnimes,
        reviews,
        recommendations,
        topAiringAnimesLoading,
        animeReviewsLoading,
        animeRecommendationsLoading,
      ]) => ({
        topAiringAnimes,
        reviews,
        recommendations,
        topAiringAnimesLoading,
        animeReviewsLoading,
        animeRecommendationsLoading,
      })
    )
  );

  constructor(private store: Store<HomeState>) {
    this.currentSeason = getCurrentSeason();
  }
  ngOnInit(): void {
    this.store.dispatch(HomePageActions.loadTopAiringAnimes());
    this.store.dispatch(HomePageActions.loadRecentAnimeReviews());
    this.store.dispatch(HomePageActions.loadRecentAnimeRecommendations());
  }
}
