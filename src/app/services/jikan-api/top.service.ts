import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { JIKAN_API_BASE_URL } from '../apiUrl';
import { AnimeBasicInfo } from 'src/app/models/AnimeBasicInfo';

export interface TopAnimeMangaParams {
  type?: string;
  filter?: string;
  page?: number;
  limit?: number;
  sfw?: boolean;
}

interface TopPeopleCharactersParams {
  page?: number;
  limit?: number;
}

interface TopReviewsParams {
  page?: number;
}

enum SubCategory {
  ANIME = 'anime',
  MANGA = 'manga',
  PEOPLE = 'people',
  CHARACTERS = 'characters',
  REVIEWS = 'reviews',
}

@Injectable({
  providedIn: 'root',
})
export class TopService {
  constructor(private http: HttpClient) {}
  readonly category = 'top';
  readonly apiUrl = `${JIKAN_API_BASE_URL}/${this.category}`;

  private mangasSubject = new Subject<TopAnimeMangaParams>();
  mangasSelectedAction$ = this.mangasSubject.asObservable();
  mangas$: Observable<AnimeBasicInfo[]> = this.mangasSelectedAction$.pipe(
    switchMap((params) => {
      console.log('allo');
      return this.getMangas$(params);
    })
  );

  getMangas$(params?: TopAnimeMangaParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${SubCategory.MANGA}`, { params: httpParams })
      .pipe(
        map((response: any) => {
          console.log(response);
          const data: AnimeBasicInfo[] = response.data.map((item: any) => ({
            ...item,
            images: item.images.jpg.image_url,
          }));
          return data;
        })
      );
  }

  mangasChanged(params: TopAnimeMangaParams): void {
    this.mangasSubject.next(params);
  }

  getAnime$(params?: TopAnimeMangaParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${SubCategory.ANIME}`, { params: httpParams })
      .pipe();
  }

  // people
  getPeople$(params?: TopPeopleCharactersParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${SubCategory.PEOPLE}`, { params: httpParams })
      .pipe();
  }

  // character
  getCharacters$(params?: TopPeopleCharactersParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${SubCategory.CHARACTERS}`, { params: httpParams })
      .pipe();
  }

  getReviews$(params?: TopPeopleCharactersParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${SubCategory.REVIEWS}`, { params: httpParams })
      .pipe();
  }

  private buildParams(params?: any): HttpParams {
    let httpParams = new HttpParams();
    if (params?.type) {
      httpParams = httpParams.set('type', params.type);
    }
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
