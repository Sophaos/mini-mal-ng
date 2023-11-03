import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, switchMap, Observable, tap } from 'rxjs';
import { JIKAN_API_BASE_URL } from './apiUrl';

interface WatchQueryParams {
  limit?: number;
}

enum SubCategory {
  EPISODES = 'episodes',
  POPULAR = 'popular',
  PROMOS = 'promos',
}

@Injectable({
  providedIn: 'root',
})
export class WatchService {
  constructor(private http: HttpClient) {}
  readonly category = 'watch';
  readonly apiUrl = `${JIKAN_API_BASE_URL}/${this.category}`;

  getWatchRecentEpisodes$(params?: WatchQueryParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${SubCategory.EPISODES}`, { params: httpParams })
      .pipe();
  }

  getWatchPopularEpisodes$(params?: WatchQueryParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${SubCategory.EPISODES}/${SubCategory.POPULAR}`, {
        params: httpParams,
      })
      .pipe();
  }

  getWatchRecentPromosEpisodes$(params?: WatchQueryParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${SubCategory.PROMOS}`, { params: httpParams })
      .pipe();
  }

  private buildParams(params?: any): HttpParams {
    let httpParams = new HttpParams();
    if (params?.limit) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }
    return httpParams;
  }
}
