import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, switchMap, map, timer } from 'rxjs';
import { JIKAN_API_BASE_URL } from 'src/app/shared/data-access/models/apiUrl';

const ANIME = 'anime';
const MANGA = 'manga';
const REVIEWS = 'reviews';
const TOP_CATEGORY = 'top';
const WATCH_CATEGORY = 'watch';
const SEASON_CATEGORY = 'seasons';
const SEASON_NOW_SUBCATEGORY = 'now';

const TOP_MANGA_PARAMS = {
  type: 'manga',
  filter: 'bypopularity',
  limit: 12,
  page: 0,
};
const TOP_ANIME_PARAMS = {
  type: 'tv',
  filter: 'airing',
  sfw: true,
  limit: 12,
  page: 0,
};

const SEASON_PARAMS = {
  filter: 'tv',
  sfw: true,
  limit: 12,
  page: 1,
};

const REVIEWS_PARAMS = {
  page: 0,
};

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}
  readonly apiUrl = `${JIKAN_API_BASE_URL}`;

  topMangas$ = this.http
    .get(`${this.apiUrl}/${TOP_CATEGORY}/${MANGA}`, {
      params: this.buildParams(TOP_MANGA_PARAMS),
    })
    .pipe(
      map((response: any) =>
        response.data.map((item: any) => ({
          ...item,
          image: item.images.jpg.image_url,
        }))
      )
    );

  topAnimes$ = this.http
    .get(`${this.apiUrl}/${TOP_CATEGORY}/${ANIME}`, {
      params: this.buildParams(TOP_ANIME_PARAMS),
    })
    .pipe(
      map((response: any) =>
        response.data.map((item: any) => ({
          ...item,
          image: item.images.jpg.image_url,
        }))
      )
    );

  currentSeason$ = this.http
    .get(`${this.apiUrl}/${SEASON_CATEGORY}/${SEASON_NOW_SUBCATEGORY}`, {
      params: SEASON_PARAMS,
    })
    .pipe(
      map((response: any) =>
        response.data.map((item: any) => ({
          ...item,
          image: item.images.jpg.image_url,
        }))
      )
    );

  animeReviews$ = timer(1750).pipe(
    switchMap(() =>
      this.http
        .get(`${this.apiUrl}/${REVIEWS}/${ANIME}`, {
          params: this.buildParams(REVIEWS_PARAMS),
        })
        .pipe(
          map((response: any) =>
            response.data
              .map((item: any) => ({
                ...item.entry,
                review: item.review,
                score: item.score,
                image: item.entry.images.jpg.image_url,
                user: item.user.username,
                tags: [...item.tags],
              }))
              .slice(0, 5)
          )
        )
    )
  );

  recentEpisodes$ = this.http
    .get(`${this.apiUrl}/${WATCH_CATEGORY}/episodes`)
    .pipe(
      map((response: any) =>
        response.data.map((item: any) => ({
          ...item.entry,
          image: item.entry.images.jpg.image_url,
        }))
      )
    );

  private buildParams(params?: any): HttpParams {
    let httpParams = new HttpParams();
    if (params?.type) {
      httpParams = httpParams.set('type', params.type);
    }
    if (params?.filter) {
      httpParams = httpParams.set('filter', params.filter);
    }
    if (params?.page) {
      httpParams = httpParams.set('page', params.page.toString());
    }
    if (params?.limit) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }
    return httpParams;
  }

  // private mangasSubject = new Subject<TopAnimeMangaParams>();
  // mangasSelectedAction$ = this.mangasSubject.asObservable();
  // mangas$: Observable<AnimeBasicInfo[]> = this.mangasSelectedAction$.pipe(
  //   switchMap((params) => {
  //     return this.getMangas$(params);
  //   })
  // );

  // getMangas$(params?: TopAnimeMangaParams): Observable<any> {
  //   const httpParams = this.buildParams(params);
  //   return this.http
  //     .get(`${this.apiUrl}/${MANGA}`, { params: httpParams })
  //     .pipe(
  //       map((response: any) => {
  //         console.log(response);
  //         const data: AnimeBasicInfo[] = response.data.map((item: any) => ({
  //           ...item,
  //           images: item.images.jpg.image_url,
  //         }));
  //         return data;
  //       })
  //     );
  // }

  // mangasChanged(params: TopAnimeMangaParams): void {
  //   this.mangasSubject.next(params);
  // }

  // mangasHomeChange(): void {
  //   this.mangasSubject.next({
  //     type: 'manga',
  //     filter: 'publishing',
  //     limit: 12,
  //     page: 0,
  //   });
  // }
}
