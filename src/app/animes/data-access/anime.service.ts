import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { JIKAN_API_BASE_URL } from '../../shared/data-access/apiUrl';
import { Data } from 'src/app/shared/data-access/models/data';
import { GenreResponse } from 'src/app/shared/data-access/response/genreResponse';
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

  getAnimeList(params?: AnimeQueryParams) {
    const httpParams = this.buildParams(params);
    return this.http
      .get<DataWithPaginationResponse<MediaResponse>>(`${this.apiUrl}`, {
        params: httpParams,
      })
      .pipe(catchError(this.handleError));
  }

  getAnimeGenres() {
    return this.http
      .get<Data<GenreResponse>>(`${JIKAN_API_BASE_URL}/genres/anime`)
      .pipe(catchError(this.handleError));
  }

  getAnimeRecommendations(id: string) {
    return this.http
      .get<Data<MediaRecommendationResponse>>(
        `${this.apiUrl}/${id}/recommendations`
      )
      .pipe(catchError(this.handleError));
  }

  getAnimeReviews(id: string) {
    const params: AnimeQueryParams = { preliminary: 'true' };
    const httpParams = this.buildParams(params);
    return this.http
      .get<Data<MediaReviewResponse>>(`${this.apiUrl}/${id}/reviews`, {
        params: httpParams,
      })
      .pipe(catchError(this.handleError));
  }

  getAnimeCharacters(id: string) {
    return this.http
      .get<Data<CharacterDataResponse>>(`${this.apiUrl}/${id}/characters`)
      .pipe(catchError(this.handleError));
  }

  getAnimeStaff(id: string) {
    return this.http
      .get<Data<StaffResponse>>(`${this.apiUrl}/${id}/staff`)
      .pipe(catchError(this.handleError));
  }

  getAnimePictures(id: string) {
    return this.http
      .get<Data<Images>>(`${this.apiUrl}/${id}/pictures`)
      .pipe(catchError(this.handleError));
  }

  getAnimeFullById(id: string) {
    return this.http
      .get<MediaDetailedDataResponse>(`${this.apiUrl}/${id}/full`)
      .pipe(catchError(this.handleError));
  }

  private handleError({ status }: HttpErrorResponse) {
    return throwError(() => `${status}: Something bad happened.`);
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
