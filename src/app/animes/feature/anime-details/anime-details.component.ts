import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { AnimeState } from '../../data-access/anime.reducers';
import { Store } from '@ngrx/store';
import {
  selectAnimeCharacters,
  selectAnimeCharactersLoading,
  selectAnimeDetails,
  selectAnimeDetailsLoading,
  selectAnimePictures,
  selectAnimePicturesLoading,
  selectAnimeRecommendations,
  selectAnimeRecommendationsLoading,
  selectAnimeReviews,
  selectAnimeReviewsLoading,
  selectAnimeStaff,
  selectAnimeStaffLoading,
} from '../../data-access/anime.selectors';

@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailsComponent {
  isAnimeDetailsLoading$ = this.store.select(selectAnimeDetailsLoading);
  isAnimePicturesLoading$ = this.store.select(selectAnimePicturesLoading);
  isAnimeCharactersLoading$ = this.store.select(selectAnimeCharactersLoading);

  isAnimeStaffLoading$ = this.store.select(selectAnimeStaffLoading);
  isAnimeReviewsLoading$ = this.store.select(selectAnimeReviewsLoading);
  isAnimeRecommendationsLoading$ = this.store.select(
    selectAnimeRecommendationsLoading
  );

  anime$ = this.store.select(selectAnimeDetails);
  pictures$ = this.store.select(selectAnimePictures);
  characters$ = this.store.select(selectAnimeCharacters);

  staff$ = this.store.select(selectAnimeStaff);
  reviews$ = this.store.select(selectAnimeReviews);
  recommendations$ = this.store.select(selectAnimeRecommendations);

  vmAnime$ = combineLatest([
    this.anime$,
    this.pictures$,
    this.characters$,
    this.isAnimeDetailsLoading$,
    this.isAnimePicturesLoading$,
    this.isAnimeCharactersLoading$,
  ]).pipe(
    map(
      ([
        anime,
        pictures,
        characters,
        isAnimeDetailsLoading,
        isAnimePicturesLoading,
        isAnimeCharactersLoading,
      ]) => ({
        anime,
        pictures,
        characters,
        isLoading:
          isAnimeDetailsLoading ||
          isAnimePicturesLoading ||
          isAnimeCharactersLoading,
      })
    )
  );

  vmExternal$ = combineLatest([
    this.staff$,
    this.reviews$,
    this.recommendations$,
    this.isAnimeStaffLoading$,
    this.isAnimeReviewsLoading$,
    this.isAnimeRecommendationsLoading$,
  ]).pipe(
    map(
      ([
        staff,
        reviews,
        recommendations,
        isAnimeStaffLoading,
        isAnimeReviewsLoading,
        isAnimeRecommendationsLoading,
      ]) => ({
        staff,
        reviews,
        recommendations,
        isLoading:
          isAnimeStaffLoading ||
          isAnimeReviewsLoading ||
          isAnimeRecommendationsLoading,
      })
    )
  );

  constructor(private store: Store<AnimeState>) {}
}
