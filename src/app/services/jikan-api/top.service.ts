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

interface TopAnimeMangaParams {
  type?: string;
  filter?: string;
  page?: number;
  limit?: number;
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

  private mangaSubject = new Subject<TopAnimeMangaParams | undefined>();
  private animeSubject = new BehaviorSubject<TopAnimeMangaParams | undefined>(
    undefined
  );
  private peopleSubject = new Subject<TopPeopleCharactersParams | undefined>();
  private charactersSubject = new Subject<
    TopPeopleCharactersParams | undefined
  >();
  private reviewsSubject = new Subject<TopReviewsParams | undefined>();

  mangaAction$ = this.mangaSubject.asObservable();
  animeAction$ = this.animeSubject.asObservable();
  peopleAction$ = this.peopleSubject.asObservable();
  charactersAction$ = this.charactersSubject.asObservable();
  reviewsAction$ = this.reviewsSubject.asObservable();

  mangas$ = this.mangaAction$.pipe(switchMap((data) => this.getManga$(data)));
  topAnimes$ = this.animeAction$.pipe(
    switchMap((data) => this.getAnime$(data))
  );
  peoples$ = this.peopleAction$.pipe(
    switchMap((data) => this.getPeople$(data))
  );
  characters$ = this.charactersAction$.pipe(
    switchMap((data) => this.getCharacters$(data))
  );
  reviews$ = this.reviewsAction$.pipe(
    switchMap((data) => this.getReviews$(data))
  );

  reviewsChanged(params?: TopReviewsParams): void {
    this.reviewsSubject.next(params);
  }
  charactersChanged(params?: TopPeopleCharactersParams): void {
    this.peopleSubject.next(params);
  }
  animesChanged(params?: TopAnimeMangaParams): void {
    this.animeSubject.next(params);
  }
  peopleChanged(params?: TopPeopleCharactersParams): void {
    this.peopleSubject.next(params);
  }
  mangaChanged(params?: TopAnimeMangaParams): void {
    this.mangaSubject.next(params);
  }

  getAnime$(params?: TopAnimeMangaParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${SubCategory.ANIME}`, { params: httpParams })
      .pipe(
        tap(console.group),
        map((response: any) => {
          const data = response.data.map((item: any) => ({
            id: item.mal_id,
            images: item.images.jpg.image_url,
            url: item.url,
            name: item.name,
            trailer: item.trailer,
            titleEnglish: item.title_english,
            titleJapanese: item.title_japanese,
            type: item.type,
            duration: item.duration,
            rating: item.rating,
            score: item.score,
            episodes: item.episodes,
            status: item.status,
            airing: item.airing,
            rank: item.rank,
            popularity: item.popularity,
            members: item.members,
            favorites: item.favorites,
            synopsis: item.synopsis,
          }));
          return { data, totalCount: response.pagination.items.total };
        })
      );
  }

  getManga$(params?: TopAnimeMangaParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${SubCategory.MANGA}`, { params: httpParams })
      .pipe(tap(console.group));
  }

  // people
  getPeople$(params?: TopPeopleCharactersParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${SubCategory.PEOPLE}`, { params: httpParams })
      .pipe(tap(console.group));
  }

  // character
  getCharacters$(params?: TopPeopleCharactersParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${SubCategory.CHARACTERS}`, { params: httpParams })
      .pipe(tap(console.group));
  }

  getReviews$(params?: TopPeopleCharactersParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}/${SubCategory.REVIEWS}`, { params: httpParams })
      .pipe(tap(console.group));
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
