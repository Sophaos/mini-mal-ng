import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { JIKAN_API_BASE_URL } from 'src/app/shared/data-access/apiUrl';
import { Data } from 'src/app/shared/data-access/models/data';
import { GeneralRecommendationResponse } from 'src/app/shared/data-access/response/generalRecommendationResponse';
import { GeneralReviewResponse } from 'src/app/shared/data-access/response/generalReviewResponse';
import { MediaResponse } from 'src/app/shared/data-access/response/mediaReponse';

const ANIME = 'anime';
const REVIEWS = 'reviews';
const TOP_CATEGORY = 'top';

const TOP_ANIME_PARAMS: TopAnimeQuery = {
  filter: 'airing',
  sfw: true,
  limit: 10,
  page: 1,
};

interface TopAnimeQuery {
  filter: string;
  sfw: boolean;
  limit: number;
  page: number;
}

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}
  readonly apiUrl = `${JIKAN_API_BASE_URL}`;

  getTopAiringAnimes() {
    return this.http
      .get<Data<MediaResponse>>(`${this.apiUrl}/${TOP_CATEGORY}/${ANIME}`, {
        params: this.buildParams(TOP_ANIME_PARAMS),
      })
      .pipe(catchError(this.handleError));
  }

  getRecentAnimeReviews() {
    return this.http
      .get<Data<GeneralReviewResponse>>(`${this.apiUrl}/${REVIEWS}/${ANIME}`, {
        params: this.buildTopReviewsParams(),
      })
      .pipe(catchError(this.handleError));
  }

  getRecentAnimeRecommendations() {
    return this.http
      .get<Data<GeneralRecommendationResponse>>(
        `${this.apiUrl}/recommendations/anime`
      )
      .pipe(catchError(this.handleError));
  }

  private handleError({ status }: HttpErrorResponse) {
    return throwError(() => `${status}: Something bad happened.`);
  }

  private buildParams(params?: TopAnimeQuery): HttpParams {
    let httpParams = new HttpParams();
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

  private buildTopReviewsParams(): HttpParams {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('page', 1);
    return httpParams;
  }
}
