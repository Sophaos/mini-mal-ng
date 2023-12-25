import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { JIKAN_API_BASE_URL } from 'src/app/shared/data-access/apiUrl';
import { Media } from 'src/app/shared/data-access/media';
import { Review } from 'src/app/shared/data-access/review';

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
  page: 1,
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
        response.data.map(
          (item: any) =>
            ({
              id: item.mal_id,
              title: item.title,
              titleEnglish: item.title_english,
              from: item.aired?.from,
              episodes: item.episodes,
              imageSrc: item.images.jpg.image_url,
              synopsis: item.synopsis,
              score: item.score,
              members: item.members,
              genres: item.genres.map((r: any) => r.name),
              imageLargeSrc: item.images.jpg.large_image_url,
            } satisfies Media)
        )
      )
    );

  animeReviews$ = this.http
    .get(`${this.apiUrl}/${REVIEWS}/${ANIME}`, {
      params: this.buildParams(REVIEWS_PARAMS),
    })
    .pipe(
      map((response: any) => {
        const currentDate = new Date();
        const data: Review[] = response.data
          .map((item: any) => {
            const targetDate = new Date(item.date);
            const timeDifferenceMillis =
              currentDate.getTime() - targetDate.getTime();
            const hoursDifference = timeDifferenceMillis / (1000 * 60 * 60);
            return {
              id: item.entry.mal_id,
              score: item.score,
              content: item.review,
              imageSrc: item.entry.images.jpg.image_url,
              title: item.entry.title,
              user: item.user.username,
              tags: [...item.tags],
              hoursDifference: Math.round(hoursDifference),
            } satisfies Review;
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
              likedMediaTitle: item.entry[0].title,
              likedMediaId: item.entry[0].mal_id,
              likedMediaImage: item.entry[0].images.jpg.image_url,
              mightLikeMediatitle: item.entry[1].title,
              mightLikeMediaId: item.entry[1].mal_id,
              mightLikeMediaImage: item.entry[1].images.jpg.image_url,
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
