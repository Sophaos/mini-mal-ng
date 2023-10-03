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

  getPersonFullById$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/full`).pipe();
  }

  getPersonById$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe();
  }

  getPersonAnime$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/anime`).pipe();
  }

  getPersonManga$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/manga`).pipe();
  }

  getPersonVoices$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/voices`).pipe();
  }

  getPersonPictures$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/pictures`).pipe();
  }

  getPeopleSearch$(params?: PeopleQueryParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http.get(`${this.apiUrl}`, { params: httpParams }).pipe();
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
