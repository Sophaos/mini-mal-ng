import { Component } from '@angular/core';
import { HomeService } from '../data-access/home.service';
import { combineLatest, map } from 'rxjs';
import { SeasonsService } from 'src/app/season/data-access/seasons.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  currentSeason = '';
  currentYear = new Date().getFullYear();
  animeReviews$ = this.homeService.animeReviews$;
  currentSeason$ = this.homeService.currentSeason$;
  // recentEpisodes$ = this.homeService.recentEpisodes$;
  vm$ = combineLatest([
    this.animeReviews$,
    this.currentSeason$,
    // this.recentEpisodes$,
  ]).pipe(
    map(([animeReviews, currentSeason]) => ({
      animeReviews,
      currentSeason,
      // recentEpisodes,
    }))
  );

  constructor(
    private homeService: HomeService,
    private seasonService: SeasonsService
  ) {
    this.currentSeason = this.seasonService.getCurrentSeason();
  }
}
