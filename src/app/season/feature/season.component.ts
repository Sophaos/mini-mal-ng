import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs';
import { SeasonsService } from '../data-access/seasons.service';
import { __param } from 'tslib';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.scss'],
})
export class SeasonComponent implements OnInit {
  layout: any = 'list';
  activeItem: MenuItem | undefined;
  seasons$ = this.seasonService.seasons$;
  years$ = this.seasonService.years$;

  year = new Date().getFullYear();
  // currentSeason =

  animes$ = combineLatest([this.route.paramMap, this.route.queryParamMap]).pipe(
    switchMap(([params, queryParams]) =>
      this.seasonService.getSeason$({
        year: Number(params.get('year')),
        season: params.get('season') ?? this.getCurrentSeason(),
        filter: queryParams.get('filter') ?? 'tv',
        page: Number(queryParams.get('page')),
        limit: Number(queryParams.get('limit')),
      })
    )
  );

  first: number = 0;
  rows: number = 10;
  page: number = 0;

  medias: any = [
    { code: 'tv', name: 'TV' },
    { code: 'movie', name: 'Movie' },
    { code: 'ova', name: 'OVA' },
    { code: 'special', name: 'Special' },
    { code: 'ona', name: 'ONA' },
    { code: 'music', name: 'Music' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seasonService: SeasonsService
  ) {}
  ngOnInit(): void {
    this.year = Number(this.route.snapshot.params['year']);
    // console.log('ALLO');
    // const queryParams = this.route.snapshot.queryParams;
    // console.log(queryParams, 'coco');
    // // Define default query parameters
    // const defaultQueryParams = {
    //   page: 1,
    //   limit: 10,
    // };
    // const updatedQueryParams = { ...defaultQueryParams, ...queryParams };
    // // Navigate to the same route with default query parameters
    // this.router.navigate([], {
    //   relativeTo: this.route,
    //   queryParams: updatedQueryParams,
    //   queryParamsHandling: 'merge',
    // });
  }

  filterChange(event: any, filterParamName: string) {
    console.log('ALLOOO');
    const currentParams = this.route.snapshot.queryParams;
    const updatedParams = { ...currentParams, [filterParamName]: event.value };

    this.updateRouteQueryParams(updatedParams);
  }

  yearChange(event: any) {
    const currentParams = this.route.snapshot.queryParams;
    this.router.navigate(['/season', this.year, 'fall']);
  }

  updateRouteQueryParams(updatedParams: any): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: updatedParams,
      queryParamsHandling: 'merge',
    });
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
    this.page = event.page ?? 0;
    const currentParams = this.route.snapshot.queryParams;
    const updatedParams = {
      ...currentParams,
      page: event.page,
      limit: event.rows,
    };
    this.updateRouteQueryParams(updatedParams);
  }

  onActiveItemChange(event: MenuItem) {
    console.log(event);
    this.activeItem = event;
  }

  getCurrentSeason(): string {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Month is zero-indexed, so we add 1

    if (currentMonth >= 3 && currentMonth <= 5) {
      return 'spring';
    } else if (currentMonth >= 6 && currentMonth <= 8) {
      return 'summer';
    } else if (currentMonth >= 9 && currentMonth <= 11) {
      return 'fall';
    } else {
      return 'winter';
    }
  }
}
