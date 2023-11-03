import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JIKAN_API_BASE_URL } from '../../shared/data-access/apiUrl';

export interface ReviewsQueryParams {
  page?: number;
  preliminary?: boolean;
  spoiler?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  constructor(private http: HttpClient) {}
  readonly category = 'reviews/anime';
  readonly apiUrl = `${JIKAN_API_BASE_URL}/${this.category}`;

  getRecentAnimeRecommendations$(params: ReviewsQueryParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}`, {
        params: httpParams,
      })
      .pipe();
  }

  private buildParams(params?: ReviewsQueryParams): HttpParams {
    let httpParams = new HttpParams();
    if (params?.page) {
      httpParams = httpParams.set('filter', params.page);
    }
    if (params?.preliminary) {
      httpParams = httpParams.set('preliminary', params.preliminary);
    }
    if (params?.spoiler) {
      httpParams = httpParams.set('spoiler', params.spoiler);
    }
    return httpParams;
  }
}
