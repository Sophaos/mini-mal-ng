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
  switchMap,
} from 'rxjs';
import { Media } from 'src/app/shared/data-access/models/media';
import { DropdownOption } from 'src/app/shared/data-access/models/dropdownOption';
import { Pagination } from 'src/app/shared/data-access/models/pagination';
import { MangaState } from './manga.reducers';
import { Store } from '@ngrx/store';
import { selectRouteParams, selectQueryParams } from './manga.selectors';
import {
  MangaDetailsAPIActions,
  MangaDetailsPageActions,
  MangaListAPIActions,
  MangaListPageActions,
} from './manga.actions';
import { MangaQueryParams, MangaService } from './manga.service';
import { isObjectEmpty } from 'src/app/shared/utils/routeUtils';
import { ImageData } from 'src/app/shared/data-access/models/imageData';
import { BasicDisplayData } from 'src/app/shared/data-access/models/basicDisplayData';
import { DetailedReview } from 'src/app/shared/data-access/models/detailedReview';
import { Recommendation } from 'src/app/shared/data-access/models/recommendation';

@Injectable()
export class MangaEffects {
  loadMangaListDataFromRouter$ = createEffect(() =>
    this.store.select(selectQueryParams).pipe(
      switchMap((queryParams) => {
        if (queryParams === undefined || isObjectEmpty(queryParams))
          return EMPTY;
        const mangaParams: MangaQueryParams = {
          type: queryParams['type'] ?? '',
          status: queryParams['status'] ?? '',
          order_by: queryParams['order_by'] ?? '',
          q: queryParams['q'] ?? '',
          min_score: queryParams['min_score'] ?? '',
          max_score: queryParams['max_score'] ?? '',
          genres: queryParams['genres'] ?? '',
          sort: queryParams['sort'] ?? '',
          page: queryParams['page'] ?? 1,
          limit: queryParams['limit'] ?? 16,
        };
        return of(
          MangaListPageActions.loadMangaListData({ params: mangaParams })
        );
      })
    )
  );

  loadMangaDataFromRouter$ = createEffect(() =>
    this.store.select(selectRouteParams).pipe(
      switchMap((routeParams) => {
        if (routeParams === undefined || routeParams['id'] === undefined)
          return EMPTY;
        const id = routeParams['id'];
        return concat(
          of(
            MangaDetailsPageActions.loadMangaDetails({ id }),
            MangaDetailsPageActions.loadMangaPictures({ id }),
            MangaDetailsPageActions.loadMangaCharacters({ id })
          ),
          of(
            MangaDetailsPageActions.loadMangaReviews({ id }),
            MangaDetailsPageActions.loadMangaRecommendations({ id })
          ).pipe(delay(3000))
        );
      })
    )
  );

  loadMangaListData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MangaListPageActions.loadMangaListData),
      exhaustMap((action) =>
        this.mangaService.getMangaList(action.params).pipe(
          map((response) => {
            const data: Media[] = response.data.map(
              (item) =>
                ({
                  id: item.mal_id,
                  title: item.title,
                  titleEnglish: item.title_english,
                  from: item.aired?.from,
                  episodes: item.episodes,
                  genres: item.genres.map((r) => r.name),
                  imageSrc: item.images.jpg.image_url,
                  synopsis: item.synopsis,
                  score: item.score,
                  members: item.members,
                } satisfies Media)
            );
            const pagination: Pagination = {
              first: response.pagination.current_page,
              rows: response.pagination.items.per_page,
              total: response.pagination.items.total,
            };
            return MangaListAPIActions.mangaListDataLoadedSuccess({
              mangaListData: { data, pagination },
            });
          }),
          catchError((error) =>
            of(MangaListAPIActions.mangaListDataLoadedFail({ message: error }))
          )
        )
      )
    )
  );

  loadGenres$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MangaListPageActions.loadMangaGenresData),
      exhaustMap(() =>
        this.mangaService.getMangaGenres().pipe(
          map((response) => {
            const genres: DropdownOption[] = response.data.map((item) => ({
              value: item.mal_id.toString(),
              label: item.name,
            }));
            return MangaListAPIActions.mangaGenresDataLoadedSuccess({
              genres,
            });
          }),
          catchError((error) =>
            of(
              MangaListAPIActions.mangaGenresDataLoadedFail({ message: error })
            )
          )
        )
      )
    )
  );

  loadMangaDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MangaDetailsPageActions.loadMangaDetails),
      exhaustMap((action) =>
        this.mangaService.getMangaFullById(action.id).pipe(
          map((response) => {
            const mediaData = {
              id: response.data.mal_id,
              title: response.data.title,
              titleEnglish: response.data.title_english,
              // from: response.data.aired?.string,
              // episodes: response.data.episodes,
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
              demographics: response.data.demographics.map((r) => r.name),
            } satisfies Media;
            return MangaDetailsAPIActions.mangaDetailsLoadedSuccess({
              mediaData,
            });
          }),
          catchError((error) =>
            of(
              MangaDetailsAPIActions.mangaDetailsLoadedFail({ message: error })
            )
          )
        )
      )
    )
  );

  loadMangaPictures$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MangaDetailsPageActions.loadMangaPictures),
      exhaustMap((action) =>
        this.mangaService.getMangaPictures(action.id).pipe(
          map((response) => {
            const images: ImageData[] = response.data.map(
              (item) =>
                ({
                  imageLarge: item.jpg.large_image_url,
                  imageSmall: item.jpg.small_image_url,
                } satisfies ImageData)
            );
            return MangaDetailsAPIActions.mangaPicturesLoadedSuccess({
              images,
            });
          }),
          catchError((error) =>
            of(
              MangaDetailsAPIActions.mangaPicturesLoadedFail({ message: error })
            )
          )
        )
      )
    )
  );

  loadMangaCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MangaDetailsPageActions.loadMangaCharacters),
      exhaustMap((action) =>
        this.mangaService.getMangaCharacters(action.id).pipe(
          map((response) => {
            const characters: BasicDisplayData[] = response.data.map(
              (item) =>
                ({
                  imageSrc: item.character.images.jpg.image_url,
                  title: `${item.character.name} (${item.role})`,
                } satisfies BasicDisplayData)
            );
            return MangaDetailsAPIActions.mangaCharactersLoadedSuccess({
              characters,
            });
          }),
          catchError((error) =>
            of(
              MangaDetailsAPIActions.mangaCharactersLoadedFail({
                message: error,
              })
            )
          )
        )
      )
    )
  );

  loadMangaReviews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MangaDetailsPageActions.loadMangaReviews),
      exhaustMap((action) =>
        this.mangaService.getMangaReviews(action.id).pipe(
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
            return MangaDetailsAPIActions.mangaReviewsLoadedSuccess({
              reviews,
            });
          }),
          catchError((error) =>
            of(
              MangaDetailsAPIActions.mangaReviewsLoadedFail({ message: error })
            )
          )
        )
      )
    )
  );

  loadMangaRecommendations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MangaDetailsPageActions.loadMangaRecommendations),
      exhaustMap((action) =>
        this.mangaService.getMangaRecommendations(action.id).pipe(
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
            return MangaDetailsAPIActions.mangaRecommendationsLoadedSuccess({
              recommendations,
            });
          }),
          catchError((error) =>
            of(
              MangaDetailsAPIActions.mangaRecommendationsLoadedFail({
                message: error,
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private mangaService: MangaService,
    private actions$: Actions,
    private store: Store<MangaState>
  ) {}
}
