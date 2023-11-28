import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import { AnimeService } from '../../data-access/anime.service';
import { combineLatest, switchMap, map, of } from 'rxjs';
import { getPagination } from 'src/app/shared/data-access/models/Pagination';

@Component({
  selector: 'app-animes-list',
  templateUrl: './animes-list.component.html',
  styleUrls: ['./animes-list.component.scss'],
})
export class AnimesListComponent {
  animes$ = this.route.queryParamMap.pipe(
    switchMap((queryParams) => this.getAnimes(queryParams))
  );

  vm$ = combineLatest([this.animes$, this.route.queryParamMap]).pipe(
    map(([animes, queryParams]) => ({
      pagination: getPagination(queryParams, animes.pagination.items.total),
      animes,
      filters: this.getAnimesFilterData(),
      filterText: this.getFilterBySearchTermData(),
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

  getAnimesFilterData() {
    return [
      {
        label: 'Media',
        value: this.route.snapshot.queryParams['type'],
        param: 'type',
        options: this.medias,
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

  getFilterBySearchTermData() {
    return {
      label: 'Filter',
      value: this.route.snapshot.queryParams['q'],
      param: 'q',
    };
  }

  getAnimes = (queryParams: ParamMap) =>
    this.animeService.getAnimeSearch$({
      type: queryParams.get('type') ?? '',
      status: queryParams.get('status') ?? '',
      rating: queryParams.get('rating') ?? '',
      order_by: queryParams.get('order_by') ?? '',
      q: queryParams.get('q') ?? '',
      sort: queryParams.get('sort') ?? '',
      page: queryParams.get('page') ?? 1,
      limit: queryParams.get('limit') ?? 10,
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
}
