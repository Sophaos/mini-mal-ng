import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, switchMap, tap } from 'rxjs';
import { JIKAN_API_BASE_URL } from '../apiUrl';

interface PeopleQueryParams {
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
export class PeopleService {
  // TODO: do not rely on this file for now

  constructor(private http: HttpClient) {}
  readonly category = 'people';
  readonly apiUrl = `${JIKAN_API_BASE_URL}/${this.category}`;

  private personFullSubject = new Subject<number>();
  private personAnimeSubject = new Subject<number>();
  private personSubject = new Subject<number>();
  private personMangaSubject = new Subject<number>();
  private personVoicesSubject = new Subject<number>();
  private personPicturesSubject = new Subject<number>();
  private peopleSearchSubject = new Subject<PeopleQueryParams>();

  personFullAction$ = this.personFullSubject.asObservable();
  personAnimeAction$ = this.personAnimeSubject.asObservable();
  personAction$ = this.personSubject.asObservable();
  personMangaAction$ = this.personMangaSubject.asObservable();
  personVoicesAction$ = this.personVoicesSubject.asObservable();
  personPicturesAction$ = this.personPicturesSubject.asObservable();
  peopleSearchAction$ = this.peopleSearchSubject.asObservable();

  personFull$ = this.personFullAction$.pipe(
    switchMap((data) => this.getPersonFullById$(data))
  );

  personAnime$ = this.personAnimeAction$.pipe(
    switchMap((data) => this.getPersonAnime$(data))
  );

  person$ = this.personAction$.pipe(
    switchMap((data) => this.getPersonById$(data))
  );

  personManga$ = this.personMangaAction$.pipe(
    switchMap((data) => this.getPersonManga$(data))
  );

  personVoices$ = this.personVoicesAction$.pipe(
    switchMap((data) => this.getPersonVoices$(data))
  );

  personPictures$ = this.personPicturesAction$.pipe(
    switchMap((data) => this.getPersonPictures$(data))
  );

  peopleSearch$ = this.peopleSearchAction$.pipe(
    switchMap((data) => this.getPeopleSearch$(data))
  );

  getPersonFullById$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/full`).pipe(tap(console.group));
  }

  getPersonById$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(tap(console.group));
  }

  getPersonAnime$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/anime`).pipe(tap(console.group));
  }

  getPersonManga$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/manga`).pipe(tap(console.group));
  }

  getPersonVoices$(id: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/${id}/voices`)
      .pipe(tap(console.group));
  }

  getPersonPictures$(id: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/${id}/pictures`)
      .pipe(tap(console.group));
  }

  getPeopleSearch$(params?: PeopleQueryParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http
      .get(`${this.apiUrl}`, { params: httpParams })
      .pipe(tap(console.group));
  }

  private buildParams(params?: PeopleQueryParams): HttpParams {
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
