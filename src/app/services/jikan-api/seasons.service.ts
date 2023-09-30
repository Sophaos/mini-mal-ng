import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  map,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { JIKAN_API_BASE_URL } from '../apiUrl';

interface SeasonQueryParams {
  filter?: string;
  page?: number;
}

interface SeasonNowQueryParams {
  page?: number;
}
interface SeasonParams {
  year: number;
  season: string;
  queryParams?: SeasonQueryParams;
}

enum SubCategory {
  NOW = 'now',
  UPCOMING = 'upcoming',
}

@Injectable({
  providedIn: 'root',
})
export class SeasonsService {
  // TODO: this is the right way, base every service call with this file
  constructor(private http: HttpClient) {}
  readonly category = 'seasons';
  readonly apiUrl = `${JIKAN_API_BASE_URL}/${this.category}`;

  private seasonSubject = new Subject<SeasonParams>();
  private seasonNowSubject = new BehaviorSubject<
    SeasonNowQueryParams | undefined
  >(undefined);
  private seasonListSubject = new Subject();
  private seasonUpcomingSubject = new Subject<SeasonQueryParams>();

  seasonAction$ = this.seasonSubject.asObservable();
  seasonNowAction$ = this.seasonNowSubject.asObservable();
  seasonListAction$ = this.seasonListSubject.asObservable();
  seasonUpcomingAction$ = this.seasonUpcomingSubject.asObservable();

  seasons$ = this.seasonAction$.pipe(
    switchMap((data) => this.getSeason$(data))
  );
  seasonNow$ = this.seasonNowAction$.pipe(
    switchMap((data) => this.getSeasonNow$(data))
  );
  seasonList$ = this.seasonListAction$.pipe(
    switchMap(() => this.getSeasonList$())
  );
  seasonUpcoming$ = this.seasonUpcomingAction$.pipe(
    switchMap((data) => this.getSeasonUpcoming$(data))
  );

  seasonChanged(params: SeasonParams): void {
    this.seasonSubject.next(params);
  }
  seasonNowChanged(params?: SeasonNowQueryParams): void {
    this.seasonNowSubject.next(params);
  }
  seasonUpcomingChanged(params: SeasonQueryParams): void {
    this.seasonUpcomingSubject.next(params);
  }
  seasonListChanged(): void {
    this.seasonListSubject.next(null);
  }

  getSeason$(params: SeasonParams): Observable<any> {
    const httpParams = this.buildParams(params.queryParams);
    return this.http
      .get(`${this.apiUrl}/${params.year}/${params.season}`, {
        params: httpParams,
      })
      .pipe(tap(console.group));
  }

  getSeasonNow$(params?: SeasonNowQueryParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${SubCategory.NOW}`, { params: httpParams })
      .pipe(
        catchError((error) => throwError(() => error)),
        map((response: any) => {
          const data = response.data.map((item: any) => ({
            id: item.mal_id,
            images: item.images.jpg.image_url,
            url: item.url,
            name: item.name,
            trailer: item.trailer,
            titleEnglish: item.title_english,
            titleJapanese: item.title_japanese,
            type: item.type,
            duration: item.duration,
            rating: item.rating,
            score: item.score,
            episodes: item.episodes,
            status: item.status,
            airing: item.airing,
            rank: item.rank,
            popularity: item.popularity,
            members: item.members,
            favorites: item.favorites,
            synopsis: item.synopsis,
          }));
          return { data, totalCount: response.pagination.items.total };
        })
      );
  }

  getSeasonList$(): Observable<any> {
    return this.http.get(`${this.apiUrl}`).pipe(tap(console.group));
  }

  getSeasonUpcoming$(params?: SeasonQueryParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${SubCategory.UPCOMING}`, { params: httpParams })
      .pipe(tap(console.group));
  }

  private buildParams(params?: SeasonQueryParams): HttpParams {
    let httpParams = new HttpParams();
    if (params?.filter) {
      httpParams = httpParams.set('filter', params.filter);
    }
    if (params?.page) {
      httpParams = httpParams.set('page', params.page.toString());
    }
    return httpParams;
  }
}
