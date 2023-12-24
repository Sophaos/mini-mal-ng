import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { JIKAN_API_BASE_URL } from '../../shared/data-access/apiUrl';
import { Media } from 'src/app/shared/data-access/media';
import { Pagination } from 'src/app/shared/data-access/pagination';
import { DropdownOption } from 'src/app/shared/data-access/DropdownOption';
import { Data } from 'src/app/shared/data-access/data';

export interface AnimeQueryParams {
  filter?: string;
  page?: number | string;
  limit?: number | string;
  q?: string;
  type?: string;
  score?: number;
  min_score?: number | string;
  max_score?: number | string;
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

export interface AnimeQueryParamsWithId extends AnimeQueryParams {
  id: number;
}

interface AnimeQueryParamsWithEpisodes extends AnimeQueryParamsWithId {
  episode: number;
}

@Injectable({
  providedIn: 'root',
})
export class MangaService {
  constructor(private http: HttpClient) {}
  readonly category = 'manga';
  readonly apiUrl = `${JIKAN_API_BASE_URL}/${this.category}`;

  genres$: Observable<DropdownOption[]> = this.http
    .get(`${JIKAN_API_BASE_URL}/genres/manga`)
    .pipe(
      map((response: any) =>
        response.data.map(
          (item: any) =>
            ({
              value: item.mal_id.toString(),
              label: item.name,
            } satisfies DropdownOption)
        )
      )
    );

  search$(params?: AnimeQueryParams): Observable<Data<Media>> {
    const httpParams = this.buildParams(params);
    return this.http.get(`${this.apiUrl}`, { params: httpParams }).pipe(
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
          first: response.pagination.first,
          rows: response.pagination.rows,
          total: response.pagination.items.total,
        };
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
