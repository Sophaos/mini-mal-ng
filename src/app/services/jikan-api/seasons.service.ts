import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JIKAN_API_BASE_URL } from '../apiUrl';

export interface SeasonQueryParams {
  filter?: string;
  page?: number;
  sfw?: boolean;
  limit?: number;
}

export interface SeasonParams extends SeasonQueryParams {
  year: number;
  season: string;
}

enum SubCategory {
  NOW = 'now',
  UPCOMING = 'upcoming',
}

@Injectable({
  providedIn: 'root',
})
export class SeasonsService {
  constructor(private http: HttpClient) {}
  readonly category = 'seasons';
  readonly apiUrl = `${JIKAN_API_BASE_URL}/${this.category}`;

  getSeason$(params: SeasonParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${params.year}/${params.season}`, {
        params: httpParams,
      })
      .pipe();
  }

  getSeasonNow$(params?: SeasonQueryParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${SubCategory.NOW}`, { params: httpParams })
      .pipe();
  }

  getSeasonList$(): Observable<any> {
    return this.http.get(`${this.apiUrl}`).pipe();
  }

  getSeasonUpcoming$(params?: SeasonQueryParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${SubCategory.UPCOMING}`, { params: httpParams })
      .pipe();
  }

  private buildParams(params?: SeasonQueryParams): HttpParams {
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
}
