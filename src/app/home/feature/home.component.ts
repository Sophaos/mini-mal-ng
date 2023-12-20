import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HomeService } from '../data-access/home.service';
import { combineLatest, map } from 'rxjs';
import { SeasonsService } from 'src/app/season/data-access/seasons.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  currentSeason = '';
  currentYear = new Date().getFullYear();
  animeReviews$ = this.homeService.animeReviews$;
  currentSeason$ = this.homeService.topAnimes$;
  animeRecommendations = this.homeService.recentAnimeRecommendations$;

  vmMain$ = combineLatest([
    this.currentSeason$,
    this.animeReviews$,
    this.animeRecommendations,
  ]).pipe(
    map(([currentSeason, reviews, recommendations]) => ({
      currentSeason,
      reviews,
      recommendations,
    }))
  );

  constructor(
    private homeService: HomeService,
    private seasonService: SeasonsService
  ) {
    this.currentSeason = this.seasonService.getCurrentSeason();
  }
}
