import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { HomeRecommendation } from 'src/app/shared/data-access/models/homeReview';
import { Media } from 'src/app/shared/data-access/models/media';
import { Review } from 'src/app/shared/data-access/models/review';

export const HomePageActions = createActionGroup({
  source: 'Home Page',
  events: {
    'Load Top Airing Animes': emptyProps(),
    'Load Recent Anime Reviews': emptyProps(),
    'Load Recent Anime Recommendations': emptyProps(),
  },
});

export const HomeAPIActions = createActionGroup({
  source: 'Home API',
  events: {
    'Top Airing Animes Loaded Success': props<{
      topAiringAnimes: Media[];
    }>(),
    'Recent Anime Reviews Loaded Success': props<{
      recentAnimeReviews: Review[];
    }>(),
    'Recent Anime Recommendations Loaded Success': props<{
      recentAnimeRecommendations: HomeRecommendation[];
    }>(),
    'Top Airing Animes Loaded Fail': props<{ message: string }>(),
    'Recent Anime Reviews Loaded Fail': props<{ message: string }>(),
    'Recent Anime Recommendations Loaded Fail': props<{ message: string }>(),
  },
});
