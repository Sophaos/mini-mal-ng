import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  EMPTY,
  catchError,
  concat,
  delay,
  exhaustMap,
  map,
  of,
  retry,
  switchMap,
} from 'rxjs';
import { Media } from 'src/app/shared/data-access/models/media';
import { DropdownOption } from 'src/app/shared/data-access/models/dropdownOption';
import { Pagination } from 'src/app/shared/data-access/models/pagination';
import { AnimeState } from './anime.reducers';
import { Store } from '@ngrx/store';
import {
  selectRouteParams,
  selectQueryParams,
  selectUrlFirstSegment,
} from './anime.selectors';
import {
  AnimeDetailsAPIActions,
  AnimeDetailsPageActions,
  AnimeListAPIActions,
  AnimeListPageActions,
} from './anime.actions';
import { AnimeService } from './anime.service';
import { isObjectEmpty } from 'src/app/shared/utils/routeUtils';
import { ImageData } from 'src/app/shared/data-access/models/imageData';
import { BasicDisplayData } from 'src/app/shared/data-access/models/basicDisplayData';
import { DetailedReview } from 'src/app/shared/data-access/models/detailedReview';
import { Recommendation } from 'src/app/shared/data-access/models/recommendation';
import { AnimeQueryParams } from 'src/app/shared/data-access/models/animeQueryParams';

@Injectable()
export class AnimeEffects {
  loadAnimeListDataFromRouter$ = createEffect(() =>
    this.store.select(selectQueryParams).pipe(
      switchMap((queryParams) => {
        if (queryParams === undefined || isObjectEmpty(queryParams))
          return EMPTY;
        return this.store.select(selectUrlFirstSegment).pipe(
          switchMap((segment) => {
            if (segment != 'animes') return EMPTY;
            const animeParams: AnimeQueryParams = {
              type: queryParams['type'] ?? '',
              status: queryParams['status'] ?? '',
              rating: queryParams['rating'] ?? '',
              order_by: queryParams['order_by'] ?? '',
              q: queryParams['q'] ?? '',
              min_score: queryParams['min_score'] ?? '',
              max_score: queryParams['max_score'] ?? '',
              genres: queryParams['genres'] ?? '',
              sort: queryParams['sort'] ?? '',
              page: queryParams['page'] ?? '',
              limit: queryParams['limit'] ?? '',
            };
            return of(
              AnimeListPageActions.loadAnimeListData({ params: animeParams })
            );
          })
        );
      })
    )
  );

  loadAnimeDataFromRouter$ = createEffect(() =>
    this.store.select(selectRouteParams).pipe(
      switchMap((routeParams) => {
        if (routeParams === undefined || routeParams['id'] === undefined)
          return EMPTY;
        const id = routeParams['id'];
        return concat(
          of(
            AnimeDetailsPageActions.loadAnimeDetails({ id }),
            AnimeDetailsPageActions.loadAnimePictures({ id }),
            AnimeDetailsPageActions.loadAnimeCharacters({ id })
          ),
          of(
            AnimeDetailsPageActions.loadAnimeStaff({ id }),
            AnimeDetailsPageActions.loadAnimeReviews({ id }),
            AnimeDetailsPageActions.loadAnimeRecommendations({ id })
          ).pipe(delay(3000))
        );
      })
    )
  );

  loadAnimeListData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimeListPageActions.loadAnimeListData),
      exhaustMap((action) =>
        this.animeService.getAnimeList(action.params).pipe(
          retry({ count: 3, delay: 1500 }),
          map((response) => {
            const data: Media[] = response.data.map(
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
                } satisfies Media)
            );
            const pagination: Pagination = {
              first: response.pagination.current_page,
              rows: response.pagination.items.per_page,
              total: response.pagination.items.total,
            };
            return AnimeListAPIActions.animeListDataLoadedSuccess({
              animeListData: { data, pagination },
            });
          }),
          catchError((error) =>
            of(AnimeListAPIActions.animeListDataLoadedFail({ message: error }))
          )
        )
      )
    )
  );

  loadGenres$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimeListPageActions.loadAnimeGenresData),
      exhaustMap(() =>
        this.animeService.getAnimeGenres().pipe(
          retry({ count: 3, delay: 1500 }),
          map((response) => {
            const genres: DropdownOption[] = response.data.map((item) => ({
              value: item.mal_id.toString(),
              label: item.name,
            }));
            return AnimeListAPIActions.animeGenresDataLoadedSuccess({
              genres,
            });
          }),
          catchError((error) =>
            of(
              AnimeListAPIActions.animeGenresDataLoadedFail({ message: error })
            )
          )
        )
      )
    )
  );

  loadAnimeDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimeDetailsPageActions.loadAnimeDetails),
      exhaustMap((action) =>
        this.animeService.getAnimeFullById(action.id).pipe(
          retry({ count: 3, delay: 1500 }),
          map((response) => {
            const mediaData = {
              id: response.data.mal_id,
              title: response.data.title,
              titleEnglish: response.data.title_english,
              from: response.data.aired?.string,
              episodes: response.data.episodes,
              imageSrc: response.data.images.jpg.image_url,
              synopsis: response.data.synopsis,
              score: response.data.score,
              members: response.data.members,
              rank: response.data.rank,
              popularity: response.data.popularity,
              favorites: response.data.favorites,
              source: response.data.source,
              type: response.data.type,
              rating: response.data.rating,
              status: response.data.status,
              duration: response.data.duration,
              season: response.data.season,
              year: response.data.year,
              background: response.data.background,
              imageLargeSrc: response.data.images.jpg.large_image_url,
              relations: response.data.relations.map((r) => ({
                title: r.relation,
                informations: r.entry.map((e) => e.name),
              })),
              genres: response.data.genres.map((r) => r.name),
              themes: response.data.themes.map((r) => r.name),
              demographics: response.data.demographics.map((r) => r.name),
              studios: response.data.studios.map((r) => r.name),
              producers: response.data.producers.map((r) => r.name),
              streaming: response.data.streaming.map((r) => r.name),
              licensors: response.data.licensors.map((r) => r.name),
              openings: response.data.theme.openings.map((r) => r),
              endings: response.data.theme.endings.map((r) => r),
            } satisfies Media;
            return AnimeDetailsAPIActions.animeDetailsLoadedSuccess({
              mediaData,
            });
          }),
          catchError((error) =>
            of(
              AnimeDetailsAPIActions.animeDetailsLoadedFail({ message: error })
            )
          )
        )
      )
    )
  );

  loadAnimePictures$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimeDetailsPageActions.loadAnimePictures),
      exhaustMap((action) =>
        this.animeService.getAnimePictures(action.id).pipe(
          retry({ count: 3, delay: 1500 }),
          map((response) => {
            const images: ImageData[] = response.data.map(
              (item) =>
                ({
                  imageLarge: item.jpg.large_image_url,
                  imageSmall: item.jpg.small_image_url,
                } satisfies ImageData)
            );
            return AnimeDetailsAPIActions.animePicturesLoadedSuccess({
              images,
            });
          }),
          catchError((error) =>
            of(
              AnimeDetailsAPIActions.animePicturesLoadedFail({ message: error })
            )
          )
        )
      )
    )
  );

  loadAnimeCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimeDetailsPageActions.loadAnimeCharacters),
      exhaustMap((action) =>
        this.animeService.getAnimeCharacters(action.id).pipe(
          retry({ count: 3, delay: 1500 }),
          map((response) => {
            const characters: BasicDisplayData[] = response.data.map(
              (item) =>
                ({
                  imageSrc: item.character.images.jpg.image_url,
                  title: `${item.character.name} (${item.role})`,
                  informations: item.voice_actors.map(
                    (v) => `${v.person.name} ${v.language}`
                  ),
                } satisfies BasicDisplayData)
            );
            return AnimeDetailsAPIActions.animeCharactersLoadedSuccess({
              characters,
            });
          }),
          catchError((error) =>
            of(
              AnimeDetailsAPIActions.animeCharactersLoadedFail({
                message: error,
              })
            )
          )
        )
      )
    )
  );

  loadAnimeStaff$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimeDetailsPageActions.loadAnimeStaff),
      exhaustMap((action) =>
        this.animeService.getAnimeStaff(action.id).pipe(
          retry({ count: 3, delay: 1500 }),
          map((response) => {
            const staff: BasicDisplayData[] = response.data.map(
              (item) =>
                ({
                  imageSrc: item.person.images.jpg.image_url,
                  title: `${item.person.name}`,
                  informations: item.positions.map((v: string) => `${v}`),
                } satisfies BasicDisplayData)
            );
            return AnimeDetailsAPIActions.animeStaffLoadedSuccess({
              staff,
            });
          }),
          catchError((error) =>
            of(AnimeDetailsAPIActions.animeStaffLoadedFail({ message: error }))
          )
        )
      )
    )
  );

  loadAnimeReviews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimeDetailsPageActions.loadAnimeReviews),
      exhaustMap((action) =>
        this.animeService.getAnimeReviews(action.id).pipe(
          retry({ count: 3, delay: 1500 }),
          map((response) => {
            const reviews: DetailedReview[] = response.data.map((item) => {
              return {
                content: item.review,
                score: item.score,
                user: item.user.username,
                imageSrc: item.user.images.jpg.image_url,
                tags: [...item.tags],
                date: item.date,
              } satisfies DetailedReview;
            });
            return AnimeDetailsAPIActions.animeReviewsLoadedSuccess({
              reviews,
            });
          }),
          catchError((error) =>
            of(
              AnimeDetailsAPIActions.animeReviewsLoadedFail({ message: error })
            )
          )
        )
      )
    )
  );

  loadAnimeRecommendations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimeDetailsPageActions.loadAnimeRecommendations),
      exhaustMap((action) =>
        this.animeService.getAnimeRecommendations(action.id).pipe(
          retry({ count: 3, delay: 1500 }),
          map((response) => {
            const recommendations = response.data.map(
              (item) =>
                ({
                  id: item.entry.mal_id,
                  title: item.entry.title,
                  votes: item.votes,
                  imageSrc: item.entry.images.jpg.image_url,
                } satisfies Recommendation)
            );
            return AnimeDetailsAPIActions.animeRecommendationsLoadedSuccess({
              recommendations,
            });
          }),
          catchError((error) =>
            of(
              AnimeDetailsAPIActions.animeRecommendationsLoadedFail({
                message: error,
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private animeService: AnimeService,
    private actions$: Actions,
    private store: Store<AnimeState>
  ) {}
}
