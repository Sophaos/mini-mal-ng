import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { HomeAPIActions, HomePageActions } from './home.actions';
import { HomeService } from './home.service';
import { Media } from 'src/app/shared/data-access/models/media';
import { Review } from 'src/app/shared/data-access/models/review';
import { HomeRecommendation } from 'src/app/shared/data-access/models/homeReview';

@Injectable()
export class HomeEffects {
  loadTopAnimes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomePageActions.loadTopAiringAnimes),
      exhaustMap(() =>
        this.homeService.getTopAiringAnimes().pipe(
          map((response) => {
            const topAiringAnimes: Media[] = response.data.map(
              (item) =>
                ({
                  id: item.mal_id,
                  title: item.title,
                  titleEnglish: item.title_english,
                  from: item.aired?.from,
                  episodes: item.episodes,
                  imageSrc: item.images.jpg.image_url,
                  synopsis: item.synopsis,
                  score: item.score,
                  members: item.members,
                  genres: item.genres.map((r) => r.name),
                  imageLargeSrc: item.images.jpg.large_image_url,
                } satisfies Media)
            );
            return HomeAPIActions.topAiringAnimesLoadedSuccess({
              topAiringAnimes,
            });
          }),
          catchError((error) =>
            of(HomeAPIActions.topAiringAnimesLoadedFail({ message: error }))
          )
        )
      )
    )
  );

  loadRecentReviews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomePageActions.loadRecentAnimeReviews),
      exhaustMap(() =>
        this.homeService.getRecentAnimeReviews().pipe(
          map((response) => {
            const currentDate = new Date();
            const recentAnimeReviews: Review[] = response.data
              .map((item) => {
                const targetDate = new Date(item.date);
                const timeDifferenceMillis =
                  currentDate.getTime() - targetDate.getTime();
                const hoursDifference = timeDifferenceMillis / (1000 * 60 * 60);
                return {
                  id: item.entry.mal_id,
                  score: item.score,
                  content: item.review,
                  imageSrc: item.entry.images.jpg.image_url,
                  title: item.entry.title,
                  user: item.user.username,
                  tags: [...item.tags],
                  hoursDifference: Math.round(hoursDifference),
                } satisfies Review;
              })
              .slice(0, 10);
            return HomeAPIActions.recentAnimeReviewsLoadedSuccess({
              recentAnimeReviews,
            });
          }),
          catchError((error) =>
            of(HomeAPIActions.recentAnimeReviewsLoadedFail({ message: error }))
          )
        )
      )
    )
  );

  loadRecentRecommendations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomePageActions.loadRecentAnimeRecommendations),
      exhaustMap(() =>
        this.homeService.getRecentAnimeRecommendations().pipe(
          map((response) => {
            const currentDate = new Date();
            const recentAnimeRecommendations: HomeRecommendation[] =
              response.data
                .map((item) => {
                  const targetDate = new Date(item.date);
                  const timeDifferenceMillis =
                    currentDate.getTime() - targetDate.getTime();
                  const hoursDifference =
                    timeDifferenceMillis / (1000 * 60 * 60);
                  return {
                    likedMediaTitle: item.entry[0].title,
                    likedMediaId: item.entry[0].mal_id,
                    likedMediaImage: item.entry[0].images.jpg.image_url,
                    mightLikeMediatitle: item.entry[1].title,
                    mightLikeMediaId: item.entry[1].mal_id,
                    mightLikeMediaImage: item.entry[1].images.jpg.image_url,
                    content: item.content,
                    user: item.user.username,
                    hoursDifference: Math.round(hoursDifference),
                  } satisfies HomeRecommendation;
                })
                .slice(0, 10);
            return HomeAPIActions.recentAnimeRecommendationsLoadedSuccess({
              recentAnimeRecommendations,
            });
          }),
          catchError((error) =>
            of(
              HomeAPIActions.recentAnimeRecommendationsLoadedFail({
                message: error,
              })
            )
          )
        )
      )
    )
  );

  constructor(private homeService: HomeService, private actions$: Actions) {}
}
