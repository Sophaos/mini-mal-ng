import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import { combineLatest, map } from 'rxjs';
import { DropdownData } from 'src/app/shared/data-access/models/dropdownData';
import { DropdownOption } from 'src/app/shared/data-access/models/dropdownOption';
import { RouteQueryParams } from 'src/app/shared/data-access/models/routeQueryParams';
import { Store } from '@ngrx/store';
import {
  selectMediaData,
  selectMediaDataLoading,
  selectMediaList,
  selectSeasonOptions,
  selectSeasonPagination,
  selectYearOptions,
} from '../../data-access/season.selectors';
import { SeasonPageActions } from '../../data-access/season.actions';
import { MEDIAS } from '../../data-access/dropdownOptions';
import { SeasonState } from '../../data-access/season.reducers';

@Component({
  selector: 'app-season-list',
  templateUrl: './season-list.component.html',
  styleUrls: ['./season-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeasonListComponent implements OnInit {
  animes$ = this.store.select(selectMediaList);
  mediaDataLoading$ = this.store.select(selectMediaDataLoading);
  pagination$ = this.store.select(selectSeasonPagination);
  yearsOptions$ = this.store.select(selectYearOptions);
  seasonOptions$ = this.store.select(selectSeasonOptions);

  vm$ = combineLatest([
    this.animes$,
    this.mediaDataLoading$,
    this.pagination$,
    this.yearsOptions$,
    this.seasonOptions$,
  ]).pipe(
    map(
      ([animes, mediaDataLoading, pagination, yearsOptions, seasonOptions]) => {
        return {
          pagination,
          animes: animes,
          mediaDataLoading,
          filters: this.getSeasonFilterData(yearsOptions, seasonOptions ?? []),
        };
      }
    )
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<SeasonState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(SeasonPageActions.loadSeasonData());
    const queryParams = this.route.snapshot.queryParams;
    const defaultQueryParams = {
      page: 1,
      limit: 8,
    };
    const updatedQueryParams = { ...defaultQueryParams, ...queryParams };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: updatedQueryParams,
      queryParamsHandling: 'merge',
    });
  }

  getSeasonFilterData(
    years: DropdownOption[],
    seasons: DropdownOption[]
  ): DropdownData[] {
    return [
      {
        label: 'Year',
        value: Number(this.route.snapshot.params['year']),
        param: 'year',
        options: years,
        change: (event: string | number) => this.yearChange(event),
      },
      {
        label: 'Season',
        param: 'season',
        value: this.route.snapshot.params['season'],
        options: seasons,
        change: (event: string | number) => this.seasonChange(event),
      },
      {
        label: 'Media',
        value: this.route.snapshot.queryParams['filter'],
        param: 'filter',
        options: MEDIAS,
      },
    ];
  }

  yearChange(event: string | number) {
    this.router.navigate(
      ['/season', event, this.route.snapshot.params['season']],
      {
        relativeTo: this.route,
        queryParams: this.getQueryParamstWithDefaultPagination(),
        queryParamsHandling: 'merge',
      }
    );
  }

  seasonChange(event: string | number) {
    this.router.navigate(
      ['/season', this.route.snapshot.params['year'], event],
      {
        relativeTo: this.route,
        queryParams: this.getQueryParamstWithDefaultPagination(),
        queryParamsHandling: 'merge',
      }
    );
  }

  updateRouteQueryParams(updatedParams: RouteQueryParams): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: updatedParams,
      queryParamsHandling: 'merge',
    });
  }

  handlePageChange(event: PaginatorState) {
    const updatedParams: RouteQueryParams = {
      ...this.route.snapshot.queryParams,
      page: (event.page ?? 0) + 1,
      limit: event.rows,
    };
    this.updateRouteQueryParams(updatedParams);
  }

  getQueryParamstWithDefaultPagination() {
    return {
      ...this.route.snapshot.queryParams,
      page: 1,
      limit: 8,
    };
  }
}
