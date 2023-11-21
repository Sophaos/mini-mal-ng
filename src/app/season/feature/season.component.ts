import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';
import { SeasonsService } from '../data-access/seasons.service';
import { __param } from 'tslib';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.scss'],
})
export class SeasonComponent implements OnInit {
  layout: any = 'list';
  seasons$ = this.seasonService.getSeasonList$();
  animes$ = combineLatest([this.route.paramMap, this.route.queryParamMap]).pipe(
    switchMap(([params, queryParams]) =>
      this.seasonService.getSeason$({
        year: Number(params.get('year')),
        season: params.get('season') ?? this.seasonService.getCurrentSeason(),
        filter: queryParams.get('filter') ?? 'tv',
        page: Number(queryParams.get('page')),
        limit: Number(queryParams.get('limit')),
      })
    )
  );
  // animes$ = this.route.queryParamMap.pipe(
  //   debounceTime(300),
  //   distinctUntilChanged(),
  //   switchMap((params) =>
  //     this.seasonService.getSeason$({
  //       year: Number(params.get('year')),
  //       season: params?.get('season') ?? this.seasonService.getCurrentSeason(),
  //       filter: params?.get('filter') ?? 'tv',
  //       page: Number(params.get('page')),
  //       limit: Number(params.get('limit')),
  //     })
  //   )
  // );

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

  seasons: any = [
    { code: 'winter', name: 'Winter' },
    { code: 'spring', name: 'Spring' },
    { code: 'summer', name: 'Summer' },
    { code: 'fall', name: 'Fall' },
  ];

  years: any = [
    { code: 2015, name: '2015' },
    { code: 2016, name: '2016' },
    { code: 2017, name: '2017' },
    { code: 2018, name: '2018' },
    { code: 2019, name: '2019' },
    { code: 2020, name: '2020' },
    { code: 2021, name: '2021' },
    { code: 2022, name: '2022' },
    { code: 2023, name: '2023' },
    { code: 2024, name: '2024' },
    { code: 2025, name: '2025' },
    { code: 2026, name: '2026' },
    { code: 2027, name: '2027' },
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seasonService: SeasonsService
  ) {}
  ngOnInit(): void {
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
    const currentParams = this.route.snapshot.queryParams;
    const updatedParams = { ...currentParams, [filterParamName]: event.value };

    this.updateRouteQueryParams(updatedParams);
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
}
