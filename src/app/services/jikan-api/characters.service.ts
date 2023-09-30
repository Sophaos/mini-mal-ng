import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, switchMap, tap } from 'rxjs';
import { JIKAN_API_BASE_URL } from '../apiUrl';

interface CharacterQueryParams {
  page?: number;
  limit?: number;
  q?: string;
  order_by?: string;
  sort?: string;
  letter?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  // TODO: do not rely on this file for now

  constructor(private http: HttpClient) {}
  readonly category = 'characters';
  readonly apiUrl = `${JIKAN_API_BASE_URL}/${this.category}`;

  private characterFullSubject = new Subject<number>();
  private characterSubject = new Subject<number>();
  private characterAnimeSubject = new Subject<number>();
  private characterMangaSubject = new Subject<number>();
  private characterVoicesSubject = new Subject<number>();
  private characterPicturesSubject = new Subject<number>();
  private characterSearchSubject = new Subject<CharacterQueryParams>();

  characterFullAction$ = this.characterFullSubject.asObservable();
  characterAction$ = this.characterSubject.asObservable();
  characterAnimeAction$ = this.characterAnimeSubject.asObservable();
  characterMangaAction$ = this.characterMangaSubject.asObservable();
  characterVoicesAction$ = this.characterVoicesSubject.asObservable();
  characterPicturesAction$ = this.characterPicturesSubject.asObservable();
  characterSearchAction$ = this.characterSearchSubject.asObservable();

  characterFull$ = this.characterFullAction$.pipe(
    switchMap((data) => this.getCharacterFullById$(data))
  );
  character$ = this.characterAction$.pipe(
    switchMap((data) => this.getCharacterById$(data))
  );
  characterAnime$ = this.characterAnimeAction$.pipe(
    switchMap((data) => this.getCharacterAnime$(data))
  );
  characterManga$ = this.characterMangaAction$.pipe(
    switchMap((data) => this.getCharacterManga$(data))
  );
  characterVoices$ = this.characterVoicesAction$.pipe(
    switchMap((data) => this.getCharacterVoices$(data))
  );
  characterPictures$ = this.characterPicturesAction$.pipe(
    switchMap((data) => this.getCharacterPictures$(data))
  );
  characterSearch$ = this.characterSearchAction$.pipe(
    switchMap((data) => this.getCharactersSearch$(data))
  );

  getCharacterFullById$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/full`).pipe(tap(console.group));
  }

  getCharacterById$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(tap(console.group));
  }

  getCharacterAnime$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/anime`).pipe(tap(console.group));
  }

  getCharacterManga$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/manga`).pipe(tap(console.group));
  }

  getCharacterVoices$(id: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/${id}/voices`)
      .pipe(tap(console.group));
  }

  getCharacterPictures$(id: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/${id}/pictures`)
      .pipe(tap(console.group));
  }

  getCharactersSearch$(params?: CharacterQueryParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}`, { params: httpParams })
      .pipe(tap(console.group));
  }

  private buildParams(params?: CharacterQueryParams): HttpParams {
    let httpParams = new HttpParams();
    if (params?.q) {
      httpParams = httpParams.set('type', params.q);
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
    if (params?.page) {
      httpParams = httpParams.set('page', params.page.toString());
    }
    if (params?.limit) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }

    return httpParams;
  }
}
