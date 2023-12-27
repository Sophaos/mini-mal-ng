import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  finalize,
  map,
  throwError,
} from 'rxjs';
import { JIKAN_API_BASE_URL } from '../../shared/data-access/apiUrl';
import { Media } from 'src/app/shared/data-access/models/media';
import { Pagination } from 'src/app/shared/data-access/models/pagination';
import { Data } from 'src/app/shared/data-access/models/data';
import { MediaResponse } from 'src/app/shared/data-access/response/mediaReponse';
import { DataWithPagination } from 'src/app/shared/data-access/models/dataWithPagination';
import { DataWithPaginationResponse } from 'src/app/shared/data-access/response/dataWithPaginationResponse';
import { SeasonResponse } from 'src/app/shared/data-access/response/seasonResponse';
import { SeasonParams } from 'src/app/shared/data-access/models/seasonParams';
import { SeasonQueryParams } from 'src/app/shared/data-access/models/seasonQueryParams';

@Injectable({
  providedIn: 'root',
})
export class SeasonsService {
  constructor(private http: HttpClient) {}
  readonly category = 'seasons';
  readonly apiUrl = `${JIKAN_API_BASE_URL}/${this.category}`;

  private isSeasonDataLoadingSubject = new BehaviorSubject<boolean>(true);
  isSeasonDataLoading$ = this.isSeasonDataLoadingSubject.asObservable();

  getSeasonData$(params: SeasonParams): Observable<DataWithPagination<Media>> {
    const httpParams = this.buildParams(params);
    this.isSeasonDataLoadingSubject.next(true);
    return this.http
      .get<DataWithPaginationResponse<MediaResponse>>(
        `${this.apiUrl}/${params.year}/${params.season}`,
        {
          params: httpParams,
        }
      )
      .pipe(
        map((response) => {
          const data: Media[] = response.data.map((item) => ({
            id: item.mal_id,
            title: item.title,
            titleEnglish: item.title_english,
            from: item.aired?.from,
            episodes: item.episodes,
            genres: item.genres.map((r) => r.name),
            imageSrc: item.images.jpg.image_url,
            synopsis: item.synopsis,
            score: item.score,
            members: item.members,
          }));
          const pagination: Pagination = {
            first: response.pagination.current_page,
            rows: response.pagination.items.per_page,
            total: response.pagination.items.total,
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

  getMediaData(params: SeasonParams) {
    const httpParams = this.buildParams(params);
    return this.http
      .get<DataWithPaginationResponse<MediaResponse>>(
        `${this.apiUrl}/${params.year}/${params.season}`,
        {
          params: httpParams,
        }
      )
      .pipe(catchError(this.handleError));
  }

  getSeasonData() {
    return this.http
      .get<Data<SeasonResponse>>(`${this.apiUrl}`)
      .pipe(catchError(this.handleError));
  }

  private handleError({ status }: HttpErrorResponse) {
    return throwError(() => `${status}: Something bad happened.`);
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
