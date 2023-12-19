import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, switchMap, map, timer } from 'rxjs';
import { JIKAN_API_BASE_URL } from 'src/app/shared/data-access/models/apiUrl';

const ANIME = 'anime';
const MANGA = 'manga';
const REVIEWS = 'reviews';
const TOP_CATEGORY = 'top';
const WATCH_CATEGORY = 'watch';

const TOP_MANGA_PARAMS = {
  type: 'manga',
  filter: 'bypopularity',
  limit: 12,
  page: 0,
};
const TOP_ANIME_PARAMS = {
  filter: 'airing',
  sfw: true,
  limit: 10,
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
          image_large: item.images.jpg.large_image_url,
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
          image_large: item.images.jpg.large_image_url,
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
          map((response: any) => {
            const currentDate = new Date();
            const data = response.data
              .map((item: any) => {
                const targetDate = new Date(item.date);

                const timeDifferenceMillis =
                  currentDate.getTime() - targetDate.getTime();
                const hoursDifference = timeDifferenceMillis / (1000 * 60 * 60);
                return {
                  ...item.entry,
                  review: item.review,
                  score: item.score,
                  image: item.entry.images.jpg.image_url,
                  user: { ...item.user },
                  tags: [...item.tags],
                  hoursDifference: Math.round(hoursDifference),
                  id: item.entry.mal_id,
                };
              })
              .slice(0, 5);
            return data;
          })
        )
    )
  );

  recentEpisodes$ = this.http
    .get(`${this.apiUrl}/${WATCH_CATEGORY}/episodes`)
    .pipe(
      map((response: any) =>
        response.data.map((item: any) => {
          return {
            ...item.entry,
            image: item.entry.images.jpg.image_url,
          };
        })
      )
    );

  recentAnimeRecommendations$ = this.http
    .get(`${this.apiUrl}/recommendations/anime`)
    .pipe(
      map((response: any) => {
        const currentDate = new Date();

        const data = response.data
          .map((item: any) => {
            const targetDate = new Date(item.date);

            const timeDifferenceMillis =
              currentDate.getTime() - targetDate.getTime();
            const hoursDifference = timeDifferenceMillis / (1000 * 60 * 60);
            return {
              likedMedia: {
                ...item.entry[0],
                id: item.entry[0].mal_id,
                image: item.entry[0].images.jpg.image_url,
              },
              mightLikeMedia: {
                ...item.entry[1],
                id: item.entry[1].mal_id,
                image: item.entry[1].images.jpg.image_url,
              },
              content: item.content,
              user: item.user.username,
              hoursDifference: Math.round(hoursDifference),

              // image: item.entry.images.jpg.image_url,
            };
          })
          .slice(0, 5);
        console.log(data);
        return data;
      })
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
