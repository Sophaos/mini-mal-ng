import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  finalize,
  map,
  tap,
} from 'rxjs';
import { JIKAN_API_BASE_URL } from '../../shared/data-access/apiUrl';
import { Media } from 'src/app/shared/data-access/media';
import { Pagination } from 'src/app/shared/data-access/pagination';

export interface SeasonQueryParams {
  filter?: string;
  page?: number | string;
  sfw?: boolean | string;
  limit?: number | string;
}

export interface SeasonParams extends SeasonQueryParams {
  year: number | string;
  season: string | string;
}

@Injectable({
  providedIn: 'root',
})
export class SeasonsService {
  constructor(private http: HttpClient) {}
  readonly category = 'seasons';
  readonly apiUrl = `${JIKAN_API_BASE_URL}/${this.category}`;

  private isSeasonDataLoadingSubject = new BehaviorSubject<boolean>(true);
  isSeasonDataLoading$ = this.isSeasonDataLoadingSubject.asObservable();

  getSeasonData$(params: SeasonParams): Observable<any> {
    const httpParams = this.buildParams(params);
    this.isSeasonDataLoadingSubject.next(true);
    return this.http
      .get(`${this.apiUrl}/${params.year}/${params.season}`, {
        params: httpParams,
      })
      .pipe(
        map((response: any) => {
          const data: Media[] = response.data.map((item: any) => ({
            id: item.mal_id,
            title: item.title,
            titleEnglish: item.title_english,
            from: item.aired?.from,
            episodes: item.episodes,
            genres: item.genres,
            imageSrc: item.images.jpg.image_url,
            synopsis: item.synopsis,
            score: item.score,
            members: item.members,
          }));
          const pagination: Pagination = {
            ...response.pagination,
          };
          return { data, pagination };
        }),
        catchError((error) => {
          console.error('Error fetching data:', error);
          return [];
        }),
        finalize(() => {
          this.isSeasonDataLoadingSubject.next(false);
        })
      );
  }

  seasons$ = this.http.get(`${this.apiUrl}`).pipe(
    map((res: any) => {
      const labels = res.data.map((item: any) => ({
        ...item,
        labels: item.seasons.map((s: string) => ({
          label: s.charAt(0).toUpperCase() + s.slice(1),
          value: s,
        })),
      }));
      const years = labels.map((s: any) => ({ label: s.year, value: s.year }));
      return { labels, years };
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
