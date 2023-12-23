import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { JIKAN_API_BASE_URL } from 'src/app/shared/data-access/apiUrl';

const ANIME = 'anime';
const REVIEWS = 'reviews';
const TOP_CATEGORY = 'top';

const TOP_ANIME_PARAMS = {
  filter: 'airing',
  sfw: true,
  limit: 10,
  page: 1,
};

const REVIEWS_PARAMS = {
  page: 0,
};

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}
  readonly apiUrl = `${JIKAN_API_BASE_URL}`;

  topAnimes$ = this.http
    .get(`${this.apiUrl}/${TOP_CATEGORY}/${ANIME}`, {
      params: this.buildParams(TOP_ANIME_PARAMS),
    })
    .pipe(
      map((response: any) =>
        response.data.map((item: any) => ({
          ...item,
          image: item.images.jpg.image_url,
          image_large: item.images.jpg.large_image_url,
        }))
      )
    );

  animeReviews$ = this.http
    .get(`${this.apiUrl}/${REVIEWS}/${ANIME}`, {
      params: this.buildParams(REVIEWS_PARAMS),
    })
    .pipe(
      map((response: any) => {
        const currentDate = new Date();
        const data = response.data
          .map((item: any) => {
            const targetDate = new Date(item.date);

            const timeDifferenceMillis =
              currentDate.getTime() - targetDate.getTime();
            const hoursDifference = timeDifferenceMillis / (1000 * 60 * 60);
            return {
              review: item.review,
              score: item.score,
              image: item.entry.images.jpg.image_url,
              user: { ...item.user },
              tags: [...item.tags],
              hoursDifference: Math.round(hoursDifference),
              id: item.entry.mal_id,
            };
          })
          .slice(0, 10);
        return data;
      })
    );

  recentAnimeRecommendations$ = this.http
    .get(`${this.apiUrl}/recommendations/anime`)
    .pipe(
      map((response: any) => {
        const currentDate = new Date();

        const data = response.data
          .map((item: any) => {
            const targetDate = new Date(item.date);
            const timeDifferenceMillis =
              currentDate.getTime() - targetDate.getTime();
            const hoursDifference = timeDifferenceMillis / (1000 * 60 * 60);
            return {
              likedMedia: {
                ...item.entry[0],
                id: item.entry[0].mal_id,
                image: item.entry[0].images.jpg.image_url,
              },
              mightLikeMedia: {
                ...item.entry[1],
                id: item.entry[1].mal_id,
                image: item.entry[1].images.jpg.image_url,
              },
              content: item.content,
              user: item.user.username,
              hoursDifference: Math.round(hoursDifference),
            };
          })
          .slice(0, 10);
        return data;
      })
    );

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
