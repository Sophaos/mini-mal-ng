import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, switchMap, Observable, tap } from 'rxjs';
import { JIKAN_API_BASE_URL } from '../apiUrl';

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

  // watchRecentEpisodes
  private watchRecentEpisodesSubject = new Subject<
    WatchQueryParams | undefined
  >();
  private watchPopularEpisodesSubject = new Subject<
    WatchQueryParams | undefined
  >();
  private watchRecentPromosEpisodesSubject = new Subject<
    WatchQueryParams | undefined
  >();

  watchRecentEpisodesAction$ = this.watchRecentEpisodesSubject.asObservable();
  watchPopularEpisodesAction$ = this.watchPopularEpisodesSubject.asObservable();
  watchRecentPromosEpisodesAction$ =
    this.watchRecentPromosEpisodesSubject.asObservable();

  watchRecentEpisodes$ = this.watchRecentEpisodesAction$.pipe(
    switchMap((data) => this.getWatchRecentEpisodes$(data))
  );
  watchPopularEpisodes$ = this.watchPopularEpisodesAction$.pipe(
    switchMap((data) => this.getWatchPopularEpisodes$(data))
  );
  watchRecentPromosEpisodes$ = this.watchRecentPromosEpisodesAction$.pipe(
    switchMap((data) => this.getWatchRecentPromosEpisodes$(data))
  );

  watchRecentEpisodesChanged(params?: WatchQueryParams): void {
    this.watchRecentEpisodesSubject.next(params);
  }
  watchPopularEpisodesChanged(params?: WatchQueryParams): void {
    this.watchPopularEpisodesSubject.next(params);
  }
  watchRecentPromosEpisodesChanged(params?: WatchQueryParams): void {
    this.watchRecentPromosEpisodesSubject.next(params);
  }

  getWatchRecentEpisodes$(params?: WatchQueryParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${SubCategory.EPISODES}`, { params: httpParams })
      .pipe(tap(console.group));
  }

  getWatchPopularEpisodes$(params?: WatchQueryParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${SubCategory.EPISODES}/${SubCategory.POPULAR}`, {
        params: httpParams,
      })
      .pipe(tap(console.group));
  }

  getWatchRecentPromosEpisodes$(params?: WatchQueryParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${SubCategory.PROMOS}`, { params: httpParams })
      .pipe(tap(console.group));
  }

  private buildParams(params?: any): HttpParams {
    let httpParams = new HttpParams();
    if (params?.limit) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }
    return httpParams;
  }
}
