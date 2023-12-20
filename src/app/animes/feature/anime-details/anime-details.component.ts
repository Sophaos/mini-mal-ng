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

  reviews$ = timer(2000).pipe(
    switchMap(() =>
      this.route.paramMap.pipe(
        switchMap((params) =>
          this.animeService.getAnimeReviews$(Number(params.get('id') || 0))
        )
      )
    )
  );

  staff$ = timer(2000).pipe(
    switchMap(() =>
      this.route.paramMap.pipe(
        switchMap((params) =>
          this.animeService.getAnimeStaff$(Number(params.get('id') || 0))
        )
      )
    )
  );

  recommendations$ = timer(2000).pipe(
    switchMap(() =>
      this.route.paramMap.pipe(
        switchMap((params) =>
          this.animeService.getAnimeRecommendations$(
            Number(params.get('id') || 0)
          )
        )
      )
    )
  );

  vmAnime$ = combineLatest([
    this.anime$,
    this.pictures$,
    this.characters$,
  ]).pipe(
    map(([anime, pictures, characters]) => ({
      anime,
      pictures,
      characters,
    }))
  );

  vmExternal$ = combineLatest([
    this.staff$,
    this.reviews$,
    this.recommendations$,
  ]).pipe(
    map(([staff, reviews, recommendations]) => ({
      staff,
      reviews,
      recommendations,
    }))
  );

  constructor(
    private route: ActivatedRoute,
    private animeService: AnimeService
  ) {}
  ngOnInit(): void {}
}
