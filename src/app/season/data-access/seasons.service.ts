import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { JIKAN_API_BASE_URL } from '../../shared/data-access/apiUrl';
import { AnimeBasicInfo } from 'src/app/shared/data-access/AnimeBasicInfo';

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
      .pipe(
        map((response: any) =>
          response.data.map((item: any) => ({
            ...item,
            // id: item.mal_id,
            images: item.images.jpg.image_url,
            // url: item.url,
            // title: item.name,
          }))
        )
      );
  }

  getSeasonNow$(params?: SeasonQueryParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${SubCategory.NOW}`, { params: httpParams })
      .pipe();
  }

  seasons$ = this.http.get(`${this.apiUrl}`).pipe(
    map((res: any) =>
      res.data.map((item: any) => ({
        ...item,
        labels: item.seasons.map((s: string) => ({
          label: s,
        })),
      }))
    )
  );

  years$ = this.seasons$.pipe(
    map((seasons) => {
      return seasons.map((s: any) => ({ code: s.year, name: s.year }));
    })
  );

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

  getCurrentSeason(): string {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Month is zero-indexed, so we add 1

    if (currentMonth >= 3 && currentMonth <= 5) {
      return 'spring';
    } else if (currentMonth >= 6 && currentMonth <= 8) {
      return 'summer';
    } else if (currentMonth >= 9 && currentMonth <= 11) {
      return 'fall';
    } else {
      return 'winter';
    }
  }
}
