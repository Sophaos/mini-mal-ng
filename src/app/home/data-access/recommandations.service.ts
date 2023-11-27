import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JIKAN_API_BASE_URL } from '../../shared/data-access/models/apiUrl';

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
export class RecommandationsService {
  constructor(private http: HttpClient) {}
  readonly category = 'recommandations/anime';
  readonly apiUrl = `${JIKAN_API_BASE_URL}/${this.category}`;

  getRecentAnimeRecommendations$(page: number): Observable<any> {
    let httpParams = new HttpParams();
    if (page) {
      httpParams = httpParams.set('page', page);
    }
    return this.http
      .get(`${this.apiUrl}`, {
        params: httpParams,
      })
      .pipe();
  }
}
