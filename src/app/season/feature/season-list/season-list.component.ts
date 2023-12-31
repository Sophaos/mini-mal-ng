import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import { combineLatest, map } from 'rxjs';
import { DropdownData } from 'src/app/shared/data-access/models/dropdownData';
import { RouteQueryParams } from 'src/app/shared/data-access/models/routeQueryParams';
import { Store } from '@ngrx/store';
import {
  selectMediaDataLoading,
  selectMediaList,
  selectSeasonDropdownData,
  selectSeasonOptions,
  selectSeasonPagination,
  selectYearOptions,
  selectYearsSeasonsDataLoading,
} from '../../data-access/season.selectors';
import { SeasonPageActions } from '../../data-access/season.actions';
import { SeasonState } from '../../data-access/season.reducers';
import { DEFAULT_PAGE_LIMIT } from 'src/app/shared/data-access/models/defaultPageLimit';

@Component({
  selector: 'app-season-list',
  templateUrl: './season-list.component.html',
  styleUrls: ['./season-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeasonListComponent implements OnInit {
  animes$ = this.store.select(selectMediaList);
  pagination$ = this.store.select(selectSeasonPagination);
  yearsOptions$ = this.store.select(selectYearOptions);
  seasonOptions$ = this.store.select(selectSeasonOptions);
  dropdowns$ = this.store.select(selectSeasonDropdownData);
  mediaDataLoading$ = this.store.select(selectMediaDataLoading);
  selectYearsSeasonsDataLoading = this.store.select(
    selectYearsSeasonsDataLoading
  );

  filters$ = combineLatest([
    this.dropdowns$,
    this.selectYearsSeasonsDataLoading,
  ]).pipe(
    map(([dropdowns, isLoading]) => {
      return {
        filters: this.addRouteData(dropdowns),
        isLoading,
      };
    })
  );

  data$ = combineLatest([
    this.animes$,
    this.mediaDataLoading$,
    this.pagination$,
  ]).pipe(
    map(([animes, isLoading, pagination]) => {
      return {
        pagination,
        animes,
        isLoading,
      };
    })
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<SeasonState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(SeasonPageActions.loadSeasonData());
    const queryParams = this.route.snapshot.queryParams;
    const updatedQueryParams = { ...DEFAULT_PAGE_LIMIT, ...queryParams };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: updatedQueryParams,
      queryParamsHandling: 'merge',
    });
  }

  addRouteData(dropdowns: DropdownData[]) {
    return dropdowns.map((d) => {
      if (d.param === 'year') {
        return {
          ...d,
          change: (event: string | number) =>
            this.seasonRouteParamUpdate(
              event,
              this.route.snapshot.params['season']
            ),
        };
      } else if (d.param === 'season') {
        return {
          ...d,
          change: (event: string | number) =>
            this.seasonRouteParamUpdate(
              this.route.snapshot.params['year'],
              event
            ),
        };
      }
      return { ...d, value: this.route.snapshot.queryParams[d.param] };
    });
  }

  seasonRouteParamUpdate(year: string | number, season: string | number) {
    this.router.navigate(['/season', year, season], {
      relativeTo: this.route,
      queryParams: this.getQueryParamstWithDefaultPagination(),
      queryParamsHandling: 'merge',
    });
  }

  handlePageChange(event: PaginatorState) {
    const updatedQueryParams: RouteQueryParams = {
      ...this.route.snapshot.queryParams,
      page: (event.page ?? 0) + 1,
      limit: event.rows,
    };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: updatedQueryParams,
      queryParamsHandling: 'merge',
    });
  }

  getQueryParamstWithDefaultPagination() {
    return {
      ...this.route.snapshot.queryParams,
      ...DEFAULT_PAGE_LIMIT,
    };
  }
}
