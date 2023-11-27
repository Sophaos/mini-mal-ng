import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, switchMap } from 'rxjs';
import { AnimeQueryParams } from 'src/app/animes/data-access/anime.service';
import { JIKAN_API_BASE_URL } from './models/apiUrl';
import { injectInfiniteQuery } from '@ngneat/query';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  readonly category = 'anime';
  readonly apiUrl = `${JIKAN_API_BASE_URL}/${this.category}`;

  constructor(private http: HttpClient) {}

  #query = injectInfiniteQuery();

  getAnimesFromSearch(searchTerm: string = '') {
    return this.#query({
      queryKey: ['animes'],
      queryFn: ({ pageParam }) => {
        return this.getAnimeSearch$({ page: pageParam, q: searchTerm });
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.pagination.has_next_page
          ? lastPage.pagination.current_page + 1
          : undefined,
    });
  }

  getAnimeSearch$(params?: AnimeQueryParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http.get(`${this.apiUrl}`, { params: httpParams }).pipe(
      map((response: any) => {
        const data = response.data.map((item: any) => ({
          ...item,
          images: item.images.jpg.image_url,
        }));
        const pagination = { ...response.pagination };
        return { data, pagination };
      })
    );
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

    return httpParams;
  }
}
