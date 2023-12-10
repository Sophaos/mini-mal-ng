import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import { AnimeService } from '../../data-access/anime.service';
import {
  combineLatest,
  switchMap,
  map,
  BehaviorSubject,
  distinctUntilChanged,
  debounceTime,
  tap,
} from 'rxjs';
import { getPagination } from 'src/app/shared/data-access/models/Pagination';

@Component({
  selector: 'app-animes-list',
  templateUrl: './animes-list.component.html',
  styleUrls: ['./animes-list.component.scss'],
})
export class AnimesListComponent {
  private inputsSubject = new BehaviorSubject<any>(null);
  inputsChange = this.inputsSubject.asObservable();
  inputs$ = this.inputsChange.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    tap((res) => {
      if (res) this.defaultChange(res.event, res.param);
    })
  );

  animes$ = this.route.queryParamMap.pipe(
    switchMap((queryParams) => this.getAnimes(queryParams))
  );
  genres$ = this.animeService.animeGenres$;

  vm$ = combineLatest([
    this.animes$,
    this.genres$,
    this.route.queryParamMap,
    this.inputs$,
  ]).pipe(
    map(([animes, genres, queryParams]) => ({
      pagination: getPagination(queryParams, animes.pagination.items.total),
      animes,
      genres,
      filterDropdowns: this.getFilterDropdowns(genres),
      filterInputs: this.getFilterInputs(),
    }))
  );

  layout: any = 'list';
  medias: any = [
    { value: '', label: 'None' },
    { value: 'tv', label: 'TV' },
    { value: 'movie', label: 'Movie' },
    { value: 'ova', label: 'OVA' },
    { value: 'special', label: 'Special' },
    { value: 'ona', label: 'ONA' },
    { value: 'music', label: 'Music' },
  ];

  statuses: any = [
    { value: '', label: 'None' },
    { value: 'airing', label: 'Airing' },
    { value: 'complete', label: 'Complete' },
    { value: 'upcoming', label: 'Upcoming' },
  ];

  ratings: any = [
    { value: '', label: 'None' },
    { value: 'g', label: 'G - All Ages' },
    { value: 'pg', label: 'PG - Children' },
    { value: 'pg13', label: 'PG-13 - Teens 13 or older' },
    { value: 'r17', label: 'R - 17+ (violence & profanity)' },
    { value: 'r', label: 'R+ - Mild Nudity' },
  ];

  orders: any = [
    { value: '', label: 'None' },
    { value: 'title', label: 'Title' },
    { value: 'start_date', label: 'Start Date' },
    { value: 'end_date', label: 'End Date' },
    { value: 'episodes', label: 'Episodes' },
    { value: 'score', label: 'Score' },
    { value: 'rank', label: 'Rank' },
    { value: 'popularity', label: 'Popularity' },
    { value: 'favorites', label: 'Favorites' },
  ];

  sorts: any = [
    { value: '', label: 'None' },
    { value: 'desc', label: 'Descending' },
    { value: 'asc', label: 'Ascending' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private animeService: AnimeService
  ) {}

  getFilterDropdowns(genres: any[]) {
    return [
      {
        label: 'Media',
        value: this.route.snapshot.queryParams['type'],
        param: 'type',
        options: this.medias,
      },
      {
        label: 'Genre(s)',
        value: this.route.snapshot.queryParams['genres']
          ? this.route.snapshot.queryParams['genres'].split(',')
          : '',
        param: 'genres',
        options: genres,
      },
      {
        label: 'Status',
        value: this.route.snapshot.queryParams['status'],
        param: 'status',
        options: this.statuses,
      },
      {
        label: 'Rating',
        value: this.route.snapshot.queryParams['rating'],
        param: 'rating',
        options: this.ratings,
      },
      {
        label: 'Order By',
        value: this.route.snapshot.queryParams['order_by'],
        param: 'order_by',
        options: this.orders,
      },
      {
        label: 'Sort',
        value: this.route.snapshot.queryParams['sort'],
        param: 'sort',
        options: this.sorts,
      },
    ];
  }

  getFilterInputs() {
    return [
      {
        label: 'Filter',
        value: this.route.snapshot.queryParams['q'],
        param: 'q',
        type: 'string',
        change: (event: any, param: any) =>
          this.inputsSubject.next({ event, param }),
      },
      {
        label: 'Min Score',
        value: this.route.snapshot.queryParams['min_score'],
        param: 'min_score',
        type: 'number',
        change: (event: any, param: any) =>
          this.inputsSubject.next({ event, param }),
      },
      {
        label: 'Max Score',
        value: this.route.snapshot.queryParams['max_score'],
        param: 'max_score',
        type: 'number',
        change: (event: any, param: any) =>
          this.inputsSubject.next({ event, param }),
      },
    ];
  }

  getAnimes = (queryParams: ParamMap) =>
    this.animeService.getAnimeSearch$({
      type: queryParams.get('type') ?? '',
      status: queryParams.get('status') ?? '',
      rating: queryParams.get('rating') ?? '',
      order_by: queryParams.get('order_by') ?? '',
      q: queryParams.get('q') ?? '',
      min_score: queryParams.get('min_score') ?? '',
      max_score: queryParams.get('max_score') ?? '',
      genres: queryParams.get('genres') ?? '',
      sort: queryParams.get('sort') ?? '',
      page: queryParams.get('page') ?? 1,
      limit: queryParams.get('limit') ?? 16,
    });

  updateRouteQueryParams(updatedParams: any): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: updatedParams,
      queryParamsHandling: 'merge',
    });
  }

  handlePageChange(event: PaginatorState) {
    const currentParams = this.route.snapshot.queryParams;
    const updatedParams = {
      ...currentParams,
      page: (event.page ?? 0) + 1,
      limit: event.rows,
    };
    this.updateRouteQueryParams(updatedParams);
  }

  defaultChange(value: string | number, param: string) {
    let updatedQueryParams = {
      page: 1,
      limit: 16,
      [param]: value,
    };
    updatedQueryParams = {
      ...this.route.snapshot.queryParams,
      ...updatedQueryParams,
    };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: updatedQueryParams,
      queryParamsHandling: 'merge',
    });
  }

  changeQueryParams(event: any, param: string) {
    this.defaultChange(event.value, param);
  }
}
