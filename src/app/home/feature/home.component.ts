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
export class HomeComponent implements OnInit {
  currentSeason = '';
  currentYear = new Date().getFullYear();
  animeReviews$ = this.homeService.animeReviews$;
  currentSeason$ = this.homeService.topAnimes$;
  recentEpisodes$ = this.homeService.recentEpisodes$;
  mangas$ = this.homeService.topMangas$;
  animeRecommendations = this.homeService.recentAnimeRecommendations$;

  // responsiveOptions: any[] | undefined;

  // api rate limited to 3 requests per second so it is splitted in different vms
  vmCarousels$ = combineLatest([
    this.currentSeason$,
    this.mangas$,
    this.recentEpisodes$,
  ]).pipe(
    map(([currentSeason, mangas, recentEpisodes]) => ({
      currentSeason,
      mangas,
      recentEpisodes,
    }))
  );

  vm$ = combineLatest([this.animeReviews$, this.animeRecommendations]).pipe(
    map(([animeReviews, animeRecommendations]) => ({
      animeReviews,
      animeRecommendations,
    }))
  );

  constructor(
    private homeService: HomeService,
    private seasonService: SeasonsService
  ) {
    this.currentSeason = this.seasonService.getCurrentSeason();
  }
  ngOnInit(): void {
    //   this.responsiveOptions = [
    //     {
    //       breakpoint: '1400px',
    //       numVisible: 7,
    //       numScroll: 3,
    //     },
    //     {
    //       breakpoint: '1220px',
    //       numVisible: 5,
    //       numScroll: 2,
    //     },
    //     {
    //       breakpoint: '1100px',
    //       numVisible: 4,
    //       numScroll: 1,
    //     },
    //   ];
  }
}
