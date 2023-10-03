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
  constructor(private http: HttpClient) {}
  readonly category = 'characters';
  readonly apiUrl = `${JIKAN_API_BASE_URL}/${this.category}`;

  getCharacterFullById$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/full`).pipe();
  }

  getCharacterById$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe();
  }

  getCharacterAnime$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/anime`).pipe();
  }

  getCharacterManga$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/manga`).pipe();
  }

  getCharacterVoices$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/voices`).pipe();
  }

  getCharacterPictures$(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/pictures`).pipe();
  }

  getCharactersSearch$(params?: CharacterQueryParams): Observable<any> {
    const httpParams = this.buildParams(params);
    return this.http.get(`${this.apiUrl}`, { params: httpParams }).pipe();
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
