import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, switchMap, tap } from 'rxjs';
import { JIKAN_API_BASE_URL } from '../apiUrl';

export interface AnimeQueryParams {
  filter?: string;
  page?: number;
  limit?: number;
  q?: string;
  type?: string;
  score?: number;
  min_score?: number;
  max_score?: number;
  status?: string;
  rating?: string;
  sfw?: boolean;
  genres?: string;
  genres_exclude?: string;
  order_by?: string;
  sort?: string;
  letter?: string;
  producers?: string;
  start_date?: string;
  end_date?: string;
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

  getAnimeFullById$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/full`).pipe();
  }

  getAnimeById$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe();
  }

  getAnimeCharacters$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/characters`).pipe();
  }

  getAnimeStaff$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/staff`).pipe();
  }

  getAnimeEpisodes$(id: number, params?: AnimeQueryParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${id}/episodes`, { params: httpParams })
      .pipe();
  }

  getAnimeEpisodeById$(id: number, episode?: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/episodes/${episode}`).pipe();
  }

  getAnimeNews$(id: number, params?: AnimeQueryParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${id}/news`, { params: httpParams })
      .pipe();
  }

  getAnimeForum$(id: number, params?: AnimeQueryParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${id}/forum`, { params: httpParams })
      .pipe();
  }

  getAnimeVideos$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/videos`).pipe();
  }

  getAnimeVideosEpisodes$(
    id: number,
    params?: AnimeQueryParams
  ): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${id}/videos/episodes`, { params: httpParams })
      .pipe();
  }

  getAnimePicture$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/pictures`).pipe();
  }

  getAnimeStatistics$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/statistics`).pipe();
  }

  getAnimeMoreInfo$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/moreinfo`).pipe();
  }

  getAnimeRecommendations$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/recommendations`).pipe();
  }

  getAnimeUserUpdates$(id: number, params?: AnimeQueryParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${id}/userupdates`, { params: httpParams })
      .pipe();
  }

  getAnimeReviews$(id: number, params?: AnimeQueryParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${id}/reviews`, { params: httpParams })
      .pipe();
  }

  getAnimeRelations$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/relations`).pipe();
  }

  getAnimeThemes$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/themes`).pipe();
  }

  getAnimeExternal$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/external`).pipe();
  }

  getAnimeStreaming$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/streaming`).pipe();
  }

  getAnimeSearch$(params?: AnimeQueryParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http.get(`${this.apiUrl}`, { params: httpParams }).pipe();
  }

  private buildParams(params?: AnimeQueryParams): HttpParams {
    let httpParams = new HttpParams();
    if (params?.q) {
      httpParams = httpParams.set('filter', params.q);
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

    return httpParams;
  }
}
