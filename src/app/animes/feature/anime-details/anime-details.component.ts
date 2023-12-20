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

  characters$ = timer(2250).pipe(
    switchMap(() =>
      this.route.paramMap.pipe(
        switchMap((params) =>
          this.animeService.getAnimeCharacters$(Number(params.get('id') || 0))
        )
      )
    )
  );

  reviews$ = timer(2250).pipe(
    switchMap(() =>
      this.route.paramMap.pipe(
        switchMap((params) =>
          this.animeService.getAnimeReviews$(Number(params.get('id') || 0))
        )
      )
    )
  );

  staff$ = timer(2250).pipe(
    switchMap(() =>
      this.route.paramMap.pipe(
        switchMap((params) =>
          this.animeService.getAnimeStaff$(Number(params.get('id') || 0))
        )
      )
    )
  );

  recommendations$ = timer(1250).pipe(
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

  vmAnime$ = combineLatest([this.anime$, this.pictures$]).pipe(
    map(([anime, pictures]) => ({
      anime,
      pictures,
    }))
  );

  vmExternal$ = combineLatest([
    this.staff$,
    this.reviews$,
    this.characters$,
  ]).pipe(
    map(([staff, reviews, characters]) => ({
      staff,
      reviews,
      characters,
    }))
  );

  vmOthers$ = combineLatest([this.recommendations$]).pipe(
    map(([recommendations]) => ({
      recommendations,
    }))
  );

  constructor(
    private route: ActivatedRoute,
    private animeService: AnimeService
  ) {}
  ngOnInit(): void {}
}
