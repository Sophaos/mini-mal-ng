import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
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
  seasons$ = this.seasonService.seasons$;
  years$ = this.seasonService.years$;

  seasonLabels$ = combineLatest([this.seasons$, this.route.paramMap]).pipe(
    map(([seasons, params]) => {
      const labels = seasons.find(
        (s: any) => s.year === Number(params.get('year'))
      ).labels;
      return {
        labels,
        season: labels.find((l: MenuItem) => l.label === params.get('season')),
      };
    })
  );

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

  totalCount$ = this.animes$.pipe();

  first: number = 0;
  rows: number = 10; // limit
  page: number = 1;
  layout: any = 'list';
  activeItem: MenuItem | undefined;
  year = new Date().getFullYear();
  media = { value: 'tv', label: 'TV' };
  medias: any = [
    { value: 'tv', label: 'TV' },
    { value: 'movie', label: 'Movie' },
    { value: 'ova', label: 'OVA' },
    { value: 'special', label: 'Special' },
    { value: 'ona', label: 'ONA' },
    { value: 'music', label: 'Music' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seasonService: SeasonsService
  ) {}
  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;
    const params = this.route.snapshot.params;

    this.year = Number(params['year']);
    this.media = queryParams['filter'];
    // Define default query parameters
    const defaultQueryParams = {
      page: 1,
      limit: 10,
      filter: 'tv',
    };
    const updatedQueryParams = { ...defaultQueryParams, ...queryParams };
    // Navigate to the same route with default query parameters
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: updatedQueryParams,
      queryParamsHandling: 'merge',
    });
  }

  filterChange(event: any, filterParamName: string) {
    console.log('ALLOOO');
    const currentParams = this.route.snapshot.queryParams;
    const updatedParams = {
      ...currentParams,
      [filterParamName]: event.option.value,
    };

    this.updateRouteQueryParams(updatedParams);
  }

  yearChange(event: any) {
    this.router.navigate(['/season', event.value, 'winter']);
  }

  updateRouteQueryParams(updatedParams: any): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: updatedParams,
      queryParamsHandling: 'merge',
    });
  }

  onPageChange(event: PaginatorState) {
    console.log(event);
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
    this.page = (event.page ?? 0) + 1;
    const currentParams = this.route.snapshot.queryParams;
    const updatedParams = {
      ...currentParams,
      page: this.page,
      limit: this.rows,
    };
    this.updateRouteQueryParams(updatedParams);
  }

  onActiveItemChange(event: MenuItem) {
    const year = this.route.snapshot.params['year'];
    this.router.navigate(['/season', year, event.label]);
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
