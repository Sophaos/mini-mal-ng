import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';
import { MangaState } from '../../data-access/manga.reducers';
import {
  selectMangaDetailsLoading,
  selectMangaPicturesLoading,
  selectMangaCharactersLoading,
  selectMangaReviewsLoading,
  selectMangaRecommendationsLoading,
  selectMangaDetails,
  selectMangaPictures,
  selectMangaCharacters,
  selectMangaReviews,
  selectMangaRecommendations,
} from '../../data-access/manga.selectors';

@Component({
  selector: 'app-manga-details',
  templateUrl: './manga-details.component.html',
  styleUrls: ['./manga-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MangaDetailsComponent {
  isMangaDetailsLoading$ = this.store.select(selectMangaDetailsLoading);
  isMangaPicturesLoading$ = this.store.select(selectMangaPicturesLoading);
  isMangaCharactersLoading$ = this.store.select(selectMangaCharactersLoading);

  isMangaReviewsLoading$ = this.store.select(selectMangaReviewsLoading);
  isMangaRecommendationsLoading$ = this.store.select(
    selectMangaRecommendationsLoading
  );

  manga$ = this.store.select(selectMangaDetails);
  pictures$ = this.store.select(selectMangaPictures);
  characters$ = this.store.select(selectMangaCharacters);

  reviews$ = this.store.select(selectMangaReviews);
  recommendations$ = this.store.select(selectMangaRecommendations);

  vmManga$ = combineLatest([
    this.manga$,
    this.pictures$,
    this.characters$,
    this.isMangaDetailsLoading$,
    this.isMangaPicturesLoading$,
    this.isMangaCharactersLoading$,
  ]).pipe(
    map(
      ([
        manga,
        pictures,
        characters,
        isMangaDetailsLoading,
        isMangaPicturesLoading,
        isMangaCharactersLoading,
      ]) => ({
        manga,
        pictures,
        characters,
        isLoading:
          isMangaDetailsLoading ||
          isMangaPicturesLoading ||
          isMangaCharactersLoading,
      })
    )
  );

  vmExternal$ = combineLatest([
    this.reviews$,
    this.recommendations$,
    this.isMangaReviewsLoading$,
    this.isMangaRecommendationsLoading$,
  ]).pipe(
    map(
      ([
        reviews,
        recommendations,
        isMangaReviewsLoading,
        isMangaRecommendationsLoading,
      ]) => ({
        reviews,
        recommendations,
        isLoading: isMangaReviewsLoading || isMangaRecommendationsLoading,
      })
    )
  );

  constructor(private store: Store<MangaState>) {}
}
