import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  finalize,
  map,
  switchMap,
  timer,
} from 'rxjs';
import { JIKAN_API_BASE_URL } from '../../shared/data-access/apiUrl';
import { Recommendation } from 'src/app/shared/data-access/models/recommendation';
import { Media } from 'src/app/shared/data-access/models/media';
import { Pagination } from 'src/app/shared/data-access/models/pagination';
import { BasicDisplayData } from 'src/app/shared/data-access/models/basicDisplayData';
import { DetailedReview } from 'src/app/shared/data-access/models/detailedReview';
import { ImageData } from 'src/app/shared/data-access/models/imageData';
import { Data } from 'src/app/shared/data-access/models/data';
import { DropdownOption } from 'src/app/shared/data-access/models/dropdownOption';
import { GenreResponse } from 'src/app/shared/data-access/response/genreResponse';
import { DataWithPagination } from 'src/app/shared/data-access/models/dataWithPagination';
import { DataWithPaginationResponse } from 'src/app/shared/data-access/response/dataWithPaginationResponse';
import { MediaResponse } from 'src/app/shared/data-access/response/mediaReponse';
import { CharacterDataResponse } from 'src/app/shared/data-access/response/characterResponse';
import { Images } from 'src/app/shared/data-access/response/imageResponse';
import { StaffResponse } from 'src/app/shared/data-access/response/staffResponse';
import { MediaRecommendationResponse } from 'src/app/shared/data-access/response/mediaRecommendationResponse';
import { MediaReviewResponse } from 'src/app/shared/data-access/response/mediaReviewResponse';
import { MediaDetailedDataResponse } from 'src/app/shared/data-access/response/mediaDetailedResponse';
export interface AnimeQueryParams {
  filter?: string;
  page?: number | string;
  limit?: number | string;
  q?: string;
  type?: string;
  score?: number | string;
  min_score?: number | string;
  max_score?: number | string;
  status?: string;
  rating?: string;
  sfw?: boolean;
  genres?: string | string;
  genres_exclude?: string;
  order_by?: string;
  sort?: string;
  letter?: string;
  producers?: string;
  start_date?: string;
  end_date?: string;
  preliminary?: string;
}

export interface AnimeQueryParamsWithId extends AnimeQueryParams {
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  constructor(private http: HttpClient) {}
  readonly category = 'anime';
  readonly apiUrl = `${JIKAN_API_BASE_URL}/${this.category}`;
  private isAnimeDataLoadingSubject = new BehaviorSubject<boolean>(true);
  private isAnimeDetailsLoadingSubject = new BehaviorSubject<boolean>(true);
  private isAnimeCharactersLoadingSubject = new BehaviorSubject<boolean>(true);
  private isAnimePicturesLoadingSubject = new BehaviorSubject<boolean>(true);
  private isAnimeStaffLoadingSubject = new BehaviorSubject<boolean>(true);
  private isAnimeReviewsLoadingSubject = new BehaviorSubject<boolean>(true);
  private isAnimeRecommendationsLoadingSubject = new BehaviorSubject<boolean>(
    true
  );

  isAnimeDataLoading$ = this.isAnimeDataLoadingSubject.asObservable();
  isAnimeDetailsLoading$ = this.isAnimeDetailsLoadingSubject.asObservable();
  isAnimeCharactersLoading$ =
    this.isAnimeCharactersLoadingSubject.asObservable();
  isAnimePicturesLoading$ = this.isAnimePicturesLoadingSubject.asObservable();
  isAnimeStaffLoading$ = this.isAnimeStaffLoadingSubject.asObservable();
  isAnimeReviewsLoading$ = this.isAnimeReviewsLoadingSubject.asObservable();
  isAnimeRecommendationsLoading$ =
    this.isAnimeRecommendationsLoadingSubject.asObservable();

  animeGenres$ = this.http
    .get<Data<GenreResponse>>(`${JIKAN_API_BASE_URL}/genres/anime`)
    .pipe(
      map((response) => {
        const data: DropdownOption[] = response.data.map((item) => ({
          value: item.mal_id.toString(),
          label: item.name,
        }));
        return data;
      })
    );

  getAnimeSearch$(
    params?: AnimeQueryParams
  ): Observable<DataWithPagination<Media>> {
    const httpParams = this.buildParams(params);
    this.isAnimeDataLoadingSubject.next(true);
    return this.http
      .get<DataWithPaginationResponse<MediaResponse>>(`${this.apiUrl}`, {
        params: httpParams,
      })
      .pipe(
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
          return { data, pagination };
        }),
        catchError((error) => {
          console.error('Error fetching data:', error);
          return [];
        }),
        finalize(() => {
          this.isAnimeDataLoadingSubject.next(false);
        })
      );
  }

  getAnimeFullById$(id: number | string): Observable<Media> {
    this.isAnimeDetailsLoadingSubject.next(true);
    return this.http
      .get<MediaDetailedDataResponse>(`${this.apiUrl}/${id}/full`)
      .pipe(
        map(
          (response) =>
            ({
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
              rating: Number(response.data.rating),
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
            } satisfies Media)
        ),
        catchError((error) => {
          console.error('Error fetching data:', error);
          return [];
        }),
        finalize(() => {
          this.isAnimeDetailsLoadingSubject.next(false);
        })
      );
  }

  getAnimeCharacters$(id: number): Observable<BasicDisplayData[]> {
    this.isAnimeCharactersLoadingSubject.next(true);
    return this.http
      .get<Data<CharacterDataResponse>>(`${this.apiUrl}/${id}/characters`)
      .pipe(
        map((response) => {
          const data: BasicDisplayData[] = response.data.map(
            (item) =>
              ({
                imageSrc: item.character.images.jpg.image_url,
                title: `${item.character.name} (${item.role})`,
                informations: item.voice_actors.map(
                  (v) => `${v.person.name} ${v.language}`
                ),
              } satisfies BasicDisplayData)
          );
          return data;
        }),
        catchError((error) => {
          console.error('Error fetching data:', error);
          return [];
        }),
        finalize(() => {
          this.isAnimeCharactersLoadingSubject.next(false);
        })
      );
  }

  getAnimePictures$(id: number): Observable<ImageData[]> {
    this.isAnimePicturesLoadingSubject.next(true);

    return this.http.get<Data<Images>>(`${this.apiUrl}/${id}/pictures`).pipe(
      map((response) => {
        const data: ImageData[] = response.data.map(
          (item) =>
            ({
              imageLarge: item.jpg.large_image_url,
              imageSmall: item.jpg.small_image_url,
            } satisfies ImageData)
        );
        return data;
      }),
      catchError((error) => {
        console.error('Error fetching data:', error);
        return [];
      }),
      finalize(() => {
        this.isAnimePicturesLoadingSubject.next(false);
      })
    );
  }

  getAnimeStaff$(id: number): Observable<BasicDisplayData[]> {
    this.isAnimeStaffLoadingSubject.next(true);

    return timer(3500).pipe(
      switchMap(() =>
        this.http.get<Data<StaffResponse>>(`${this.apiUrl}/${id}/staff`).pipe(
          map((response) => {
            const data: BasicDisplayData[] = response.data.map(
              (item) =>
                ({
                  imageSrc: item.person.images.jpg.image_url,
                  title: `${item.person.name}`,
                  informations: item.positions.map((v: string) => `${v}`),
                } satisfies BasicDisplayData)
            );
            return data;
          }),
          catchError((error) => {
            console.error('Error fetching data:', error);
            return [];
          }),
          finalize(() => {
            this.isAnimeStaffLoadingSubject.next(false);
          })
        )
      )
    );
  }

  getAnimeReviews$(id: number): Observable<DetailedReview[]> {
    const params: AnimeQueryParams = { preliminary: 'true' };
    const httpParams = this.buildParams(params);
    this.isAnimeReviewsLoadingSubject.next(true);

    return timer(3500).pipe(
      switchMap(() =>
        this.http
          .get<Data<MediaReviewResponse>>(`${this.apiUrl}/${id}/reviews`, {
            params: httpParams,
          })
          .pipe(
            map((response) => {
              const data: DetailedReview[] = response.data.map((item) => {
                return {
                  content: item.review,
                  score: item.score,
                  user: item.user.username,
                  imageSrc: item.user.images.jpg.image_url,
                  tags: [...item.tags],
                  date: item.date,
                } satisfies DetailedReview;
              });
              return data;
            }),
            catchError((error) => {
              console.error('Error fetching data:', error);
              return [];
            }),
            finalize(() => {
              this.isAnimeReviewsLoadingSubject.next(false);
            })
          )
      )
    );
  }

  getAnimeRecommendations$(id: number): Observable<Recommendation[]> {
    this.isAnimeRecommendationsLoadingSubject.next(false);

    return timer(3500).pipe(
      switchMap(() =>
        this.http
          .get<Data<MediaRecommendationResponse>>(
            `${this.apiUrl}/${id}/recommendations`
          )
          .pipe(
            map((response) =>
              response.data.map(
                (item) =>
                  ({
                    id: item.entry.mal_id,
                    title: item.entry.title,
                    votes: item.votes,
                    imageSrc: item.entry.images.jpg.image_url,
                  } satisfies Recommendation)
              )
            ),
            catchError((error) => {
              console.error('Error fetching data:', error);
              return [];
            }),
            finalize(() => {
              this.isAnimeRecommendationsLoadingSubject.next(false);
            })
          )
      )
    );
  }

  private buildParams(params?: AnimeQueryParams): HttpParams {
    let httpParams = new HttpParams();
    if (params?.q) {
      httpParams = httpParams.set('q', params.q);
    }
    if (params?.page) {
      httpParams = httpParams.set('page', params.page.toString());
    }
    if (params?.limit) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }
    if (params?.type) {
      httpParams = httpParams.set('type', params.type);
    }
    if (params?.score) {
      httpParams = httpParams.set('score', params.score.toString());
    }
    if (params?.min_score) {
      httpParams = httpParams.set('min_score', params.min_score.toString());
    }
    if (params?.max_score) {
      httpParams = httpParams.set('max_score', params.max_score.toString());
    }
    if (params?.status) {
      httpParams = httpParams.set('status', params.status);
    }
    if (params?.rating) {
      httpParams = httpParams.set('rating', params.rating);
    }
    if (params?.sfw) {
      httpParams = httpParams.set('sfw', params.sfw);
    }
    if (params?.genres) {
      httpParams = httpParams.set('genres', params.genres);
    }
    if (params?.genres_exclude) {
      httpParams = httpParams.set('genres_exclude', params.genres_exclude);
    }
    if (params?.order_by) {
      httpParams = httpParams.set('order_by', params.order_by);
    }
    if (params?.sort) {
      httpParams = httpParams.set('sort', params.sort);
    }
    if (params?.letter) {
      httpParams = httpParams.set('letter', params.letter);
    }
    if (params?.producers) {
      httpParams = httpParams.set('producers', params.producers);
    }
    if (params?.start_date) {
      httpParams = httpParams.set('start_date', params.start_date);
    }
    if (params?.end_date) {
      httpParams = httpParams.set('end_date', params.end_date);
    }
    if (params?.preliminary) {
      httpParams = httpParams.set('preliminary', params.preliminary);
    }

    return httpParams;
  }
}
