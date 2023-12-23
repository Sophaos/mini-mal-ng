import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, switchMap, timer } from 'rxjs';
import { AnimeService } from '../../data-access/anime.service';

@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailsComponent implements OnInit {
  isAnimeDetailsLoading$ = this.animeService.isAnimeDetailsLoading$;
  isAnimePicturesLoading$ = this.animeService.isAnimePicturesLoading$;
  isAnimeCharactersLoading$ = this.animeService.isAnimeCharactersLoading$;

  isAnimeStaffLoading$ = this.animeService.isAnimeStaffLoading$;
  isAnimeReviewsLoading$ = this.animeService.isAnimeReviewsLoading$;
  isAnimeRecommendationsLoading$ =
    this.animeService.isAnimeRecommendationsLoading$;

  anime$ = this.route.paramMap.pipe(
    switchMap((params) =>
      this.animeService.getAnimeFullById$(Number(params.get('id') || 0))
    )
  );

  pictures$ = this.route.paramMap.pipe(
    switchMap((params) =>
      this.animeService.getAnimePictures$(Number(params.get('id') || 0))
    )
  );

  characters$ = this.route.paramMap.pipe(
    switchMap((params) =>
      this.animeService.getAnimeCharacters$(Number(params.get('id') || 0))
    )
  );

  reviews$ = this.route.paramMap.pipe(
    switchMap((params) =>
      this.animeService.getAnimeReviews$(Number(params.get('id') || 0))
    )
  );

  staff$ = this.route.paramMap.pipe(
    switchMap((params) =>
      this.animeService.getAnimeStaff$(Number(params.get('id') || 0))
    )
  );

  recommendations$ = this.route.paramMap.pipe(
    switchMap((params) =>
      this.animeService.getAnimeRecommendations$(Number(params.get('id') || 0))
    )
  );

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

  constructor(
    private route: ActivatedRoute,
    private animeService: AnimeService
  ) {}
  ngOnInit(): void {}
}
