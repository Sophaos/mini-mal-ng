import { Component, OnInit } from '@angular/core';
import { HomeService } from '../data-access/home.service';
import { combineLatest, map } from 'rxjs';
import { SeasonsService } from 'src/app/season/data-access/seasons.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentSeason = '';
  currentYear = new Date().getFullYear();
  animeReviews$ = this.homeService.animeReviews$;
  currentSeason$ = this.homeService.currentSeason$;
  recentEpisodes$ = this.homeService.recentEpisodes$;

  // responsiveOptions: any[] | undefined;

  vm$ = combineLatest([
    this.animeReviews$,
    this.currentSeason$,
    this.recentEpisodes$,
  ]).pipe(
    map(([animeReviews, currentSeason, recentEpisodes]) => ({
      animeReviews,
      currentSeason,
      recentEpisodes,
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
