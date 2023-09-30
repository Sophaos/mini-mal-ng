import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, switchMap, tap } from 'rxjs';
import { JIKAN_API_BASE_URL } from '../apiUrl';

interface AnimeQueryParams {
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

interface AnimeQueryParamsWithId extends AnimeQueryParams {
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

  private animeFullByIdSubject = new Subject<number>();
  private animeByIdSubject = new Subject<number>();
  private animeCharactersSubject = new Subject<number>();
  private animeStaffSubject = new Subject<number>();
  private animeEpisodesSubject = new Subject<AnimeQueryParamsWithId>();
  private animeEpisodeByIdSubject = new Subject<AnimeQueryParamsWithEpisodes>();
  private animeNewsSubject = new Subject<AnimeQueryParamsWithId>();
  private animeForumSubject = new Subject<AnimeQueryParamsWithId>();
  private animeVideosSubject = new Subject<number>();
  private animeVideosEpisodesSubject = new Subject<AnimeQueryParamsWithId>();
  private animePictureSubject = new Subject<number>();
  private animeStatisticsSubject = new Subject<number>();
  private animeMoreInfoSubject = new Subject<number>();
  private animeRecommendationsSubject = new Subject<number>();
  private animeUserUpdatesSubject = new Subject<AnimeQueryParamsWithId>();
  private animeReviewsSubject = new Subject<AnimeQueryParamsWithId>();
  private animeRelationsSubject = new Subject<number>();
  private animeThemesSubject = new Subject<number>();
  private animeExternalSubject = new Subject<number>();
  private animeStreamingSubject = new Subject<number>();
  private animeSearchSubject = new Subject<AnimeQueryParams>();

  animeFullByIdAction$ = this.animeFullByIdSubject.asObservable();
  animeByIdAction$ = this.animeByIdSubject.asObservable();
  animeCharactersAction$ = this.animeCharactersSubject.asObservable();
  animeStaffAction$ = this.animeStaffSubject.asObservable();
  animeEpisodesAction$ = this.animeEpisodesSubject.asObservable();
  animeEpisodeByIdAction$ = this.animeEpisodeByIdSubject.asObservable();
  animeNewsAction$ = this.animeNewsSubject.asObservable();
  animeForumAction$ = this.animeForumSubject.asObservable();
  animeVideosAction$ = this.animeVideosSubject.asObservable();
  animeVideosEpisodesAction$ = this.animeVideosEpisodesSubject.asObservable();
  animePictureAction$ = this.animePictureSubject.asObservable();
  animeStatisticsAction$ = this.animeStatisticsSubject.asObservable();
  animeMoreInfoAction$ = this.animeMoreInfoSubject.asObservable();
  animeRecommendationsAction$ = this.animeRecommendationsSubject.asObservable();
  animeUserUpdatesAction$ = this.animeUserUpdatesSubject.asObservable();
  animeReviewsAction$ = this.animeReviewsSubject.asObservable();
  animeRelationsAction$ = this.animeRelationsSubject.asObservable();
  animeThemesAction$ = this.animeThemesSubject.asObservable();
  animeExternalAction$ = this.animeExternalSubject.asObservable();
  animeStreamingAction$ = this.animeStreamingSubject.asObservable();
  animeSearchAction$ = this.animeSearchSubject.asObservable();

  animeFull$ = this.animeFullByIdAction$.pipe(
    switchMap((data) => this.getAnimeById$(data))
  );
  anime$ = this.animeByIdAction$.pipe(
    switchMap((data) => this.getAnimeById$(data))
  );
  animeCharacters$ = this.animeCharactersAction$.pipe(
    switchMap((data) => this.getAnimeCharacters$(data))
  );
  animeStaff$ = this.animeStaffAction$.pipe(
    switchMap((data) => this.getAnimeStaff$(data))
  );
  animeEpisodes$ = this.animeEpisodesAction$.pipe(
    switchMap((data) => this.getAnimeEpisodes$(data.id, data))
  );
  animeEpisode$ = this.animeEpisodeByIdAction$.pipe(
    switchMap((data) => this.getAnimeEpisodeById$(data.id))
  );
  animeNews$ = this.animeNewsAction$.pipe(
    switchMap((data) => this.getAnimeNews$(data.id, data))
  );
  animeForum$ = this.animeForumAction$.pipe(
    switchMap((data) => this.getAnimeForum$(data.id, data))
  );
  animeVideos$ = this.animeVideosAction$.pipe(
    switchMap((data) => this.getAnimeVideos$(data))
  );
  animeVideosEpisodes$ = this.animeVideosAction$.pipe(
    switchMap((data) => this.getAnimeVideosEpisodes$(data))
  );
  animePicture$ = this.animePictureAction$.pipe(
    switchMap((data) => this.getAnimePicture$(data))
  );
  animeStatistics$ = this.animeStatisticsAction$.pipe(
    switchMap((data) => this.getAnimeStatistics$(data))
  );
  animeMoreInfo$ = this.animeMoreInfoAction$.pipe(
    switchMap((data) => this.getAnimeMoreInfo$(data))
  );
  animeRecommendations$ = this.animeRecommendationsAction$.pipe(
    switchMap((data) => this.getAnimeRecommendations$(data))
  );
  animeUserUpdates$ = this.animeUserUpdatesAction$.pipe(
    switchMap((data) => this.getAnimeUserUpdates$(data.id, data))
  );
  animeReviews$ = this.animeReviewsAction$.pipe(
    switchMap((data) => this.getAnimeReviews$(data.id, data))
  );
  animeRelations$ = this.animeRelationsAction$.pipe(
    switchMap((data) => this.getAnimeRelations$(data))
  );
  animeThemes$ = this.animeThemesAction$.pipe(
    switchMap((data) => this.getAnimeThemes$(data))
  );
  animeExternal$ = this.animeExternalAction$.pipe(
    switchMap((data) => this.getAnimeExternal$(data))
  );
  animeStreaming$ = this.animeStreamingAction$.pipe(
    switchMap((data) => this.getAnimeStreaming$(data))
  );
  animeSearch$ = this.animeSearchAction$.pipe(
    switchMap((data) => this.getAnimeSearch$(data))
  );

  animeFullByIdChanged(params: number): void {
    this.animeFullByIdSubject.next(params);
  }
  animeByIdChanged(params: number): void {
    this.animeByIdSubject.next(params);
  }
  animeCharactersChanged(params: number): void {
    this.animeCharactersSubject.next(params);
  }
  animeStaffChanged(params: number): void {
    this.animeStaffSubject.next(params);
  }
  animeEpisodesChanged(params: AnimeQueryParamsWithId): void {
    this.animeEpisodesSubject.next(params);
  }
  animeEpisodeByIdChanged(params: AnimeQueryParamsWithEpisodes): void {
    this.animeEpisodeByIdSubject.next(params);
  }
  animeNewsChanged(params: AnimeQueryParamsWithId): void {
    this.animeNewsSubject.next(params);
  }
  animeForumChanged(params: AnimeQueryParamsWithId): void {
    this.animeForumSubject.next(params);
  }
  animeVideosChanged(params: number): void {
    this.animeVideosSubject.next(params);
  }
  animeVideosEpisodesChanged(params: AnimeQueryParamsWithId): void {
    this.animeVideosEpisodesSubject.next(params);
  }
  animePictureChanged(params: number): void {
    this.animePictureSubject.next(params);
  }
  animeStatisticsChanged(params: number): void {
    this.animeStatisticsSubject.next(params);
  }
  animeMoreInfoChanged(params: number): void {
    this.animeMoreInfoSubject.next(params);
  }
  animeRecommendationsChanged(params: number): void {
    this.animeRecommendationsSubject.next(params);
  }
  animeUserUpdatesChanged(params: AnimeQueryParamsWithId): void {
    this.animeUserUpdatesSubject.next(params);
  }
  animeReviewsChanged(params: AnimeQueryParamsWithId): void {
    this.animeReviewsSubject.next(params);
  }
  animeRelationsChanged(params: number): void {
    this.animeRelationsSubject.next(params);
  }
  animeThemesChanged(params: number): void {
    this.animeThemesSubject.next(params);
  }
  animeExternalChanged(params: number): void {
    this.animeExternalSubject.next(params);
  }
  animeStreamingChanged(params: number): void {
    this.animeStreamingSubject.next(params);
  }
  animeSearchChanged(params: AnimeQueryParams): void {
    this.animeSearchSubject.next(params);
  }

  getAnimeFullById$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/full`).pipe(tap(console.group));
  }

  getAnimeById$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(tap(console.group));
  }

  getAnimeCharacters$(id: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/${id}/characters`)
      .pipe(tap(console.group));
  }

  getAnimeStaff$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/staff`).pipe(tap(console.group));
  }

  getAnimeEpisodes$(id: number, params?: AnimeQueryParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${id}/episodes`, { params: httpParams })
      .pipe(tap(console.group));
  }

  getAnimeEpisodeById$(id: number, episode?: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/${id}/episodes/${episode}`)
      .pipe(tap(console.group));
  }

  getAnimeNews$(id: number, params?: AnimeQueryParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${id}/news`, { params: httpParams })
      .pipe(tap(console.group));
  }

  getAnimeForum$(id: number, params?: AnimeQueryParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${id}/forum`, { params: httpParams })
      .pipe(tap(console.group));
  }

  getAnimeVideos$(id: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/${id}/videos`)
      .pipe(tap(console.group));
  }

  getAnimeVideosEpisodes$(
    id: number,
    params?: AnimeQueryParams
  ): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${id}/videos/episodes`, { params: httpParams })
      .pipe(tap(console.group));
  }

  getAnimePicture$(id: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/${id}/pictures`)
      .pipe(tap(console.group));
  }

  getAnimeStatistics$(id: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/${id}/statistics`)
      .pipe(tap(console.group));
  }

  getAnimeMoreInfo$(id: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/${id}/moreinfo`)
      .pipe(tap(console.group));
  }

  getAnimeRecommendations$(id: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/${id}/recommendations`)
      .pipe(tap(console.group));
  }

  getAnimeUserUpdates$(id: number, params?: AnimeQueryParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${id}/userupdates`, { params: httpParams })
      .pipe(tap(console.group));
  }

  getAnimeReviews$(id: number, params?: AnimeQueryParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${id}/reviews`, { params: httpParams })
      .pipe(tap(console.group));
  }

  getAnimeRelations$(id: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/${id}/relations`)
      .pipe(tap(console.group));
  }

  getAnimeThemes$(id: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/${id}/themes`)
      .pipe(tap(console.group));
  }

  getAnimeExternal$(id: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/${id}/external`)
      .pipe(tap(console.group));
  }

  getAnimeStreaming$(id: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/${id}/streaming`)
      .pipe(tap(console.group));
  }

  getAnimeSearch$(params?: AnimeQueryParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}`, { params: httpParams })
      .pipe(tap(console.group));
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
