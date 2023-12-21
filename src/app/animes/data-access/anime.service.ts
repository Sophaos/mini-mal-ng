import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, switchMap, tap, timer } from 'rxjs';
import { JIKAN_API_BASE_URL } from '../../shared/data-access/models/apiUrl';
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

interface AnimeQueryParamsWithEpisodes extends AnimeQueryParamsWithId {
  episode: number;
}

@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  constructor(private http: HttpClient) {}
  readonly category = 'anime';
  readonly apiUrl = `${JIKAN_API_BASE_URL}/${this.category}`;

  animeGenres$ = this.http.get(`${JIKAN_API_BASE_URL}/genres/anime`).pipe(
    map((response: any) =>
      response.data.map((item: any) => ({
        value: item.mal_id.toString(),
        label: item.name,
      }))
    )
  );

  getAnimeSearch$(params?: AnimeQueryParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http.get(`${this.apiUrl}`, { params: httpParams }).pipe(
      map((response: any) => ({
        data: response.data.map((item: any) => ({
          ...item,
          images: item.images.jpg.image_url,
        })),
        pagination: { ...response.pagination },
      }))
    );
  }

  getAnimeFullById$(id: number | string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/full`).pipe(
      map((response: any) => ({
        ...response.data,
        images: response.data.images.jpg.image_url,
        image_large: response.data.images.jpg.large_image_url,
      }))
    );
  }

  getAnimeCharacters$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/characters`).pipe(
      map((response: any) =>
        response.data.map((item: any) => ({
          ...item,
        }))
      )
    );
  }

  getAnimePictures$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/pictures`).pipe(
      map((response: any) =>
        response.data.map((item: any) => ({
          ...item,
        }))
      )
    );
  }

  getAnimeStaff$(id: number): Observable<any> {
    return timer(3500).pipe(
      switchMap(() =>
        this.http.get(`${this.apiUrl}/${id}/staff`).pipe(
          map((response: any) =>
            response.data.map((item: any) => ({
              ...item,
            }))
          )
        )
      )
    );
  }

  getAnimeRecommendations$(id: number): Observable<any> {
    return timer(3500).pipe(
      switchMap(() =>
        this.http.get(`${this.apiUrl}/${id}/recommendations`).pipe(
          map((response: any) =>
            response.data.map((item: any) => ({
              ...item,
              image: item.entry.images.jpg.image_url,
            }))
          )
        )
      )
    );
  }

  getAnimeReviews$(id: number): Observable<any> {
    const params: AnimeQueryParams = { preliminary: 'true' };
    const httpParams = this.buildParams(params);
    return timer(3500).pipe(
      switchMap(() =>
        this.http
          .get(`${this.apiUrl}/${id}/reviews`, { params: httpParams })
          .pipe(
            map((response: any) => {
              const currentDate = new Date();
              const data = response.data.map((item: any) => {
                const targetDate = new Date(item.date);

                const timeDifferenceMillis =
                  currentDate.getTime() - targetDate.getTime();
                const hoursDifference = timeDifferenceMillis / (1000 * 60 * 60);
                return {
                  ...item.entry,
                  review: item.review,
                  score: item.score,
                  user: { ...item.user },
                  tags: [...item.tags],
                  hoursDifference: Math.round(hoursDifference),
                };
              });
              return data;
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
