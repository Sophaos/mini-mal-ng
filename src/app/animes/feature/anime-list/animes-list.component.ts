import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import { combineLatest, map } from 'rxjs';
import { DropdownData } from 'src/app/shared/data-access/models/dropdownData';
import { ParamData } from 'src/app/shared/data-access/models/paramData';
import { RouteQueryParams } from 'src/app/shared/data-access/models/routeQueryParams';
import { Store } from '@ngrx/store';
import { AnimeState } from '../../data-access/anime.reducers';
import {
  selectAnimeDropdownData,
  selectAnimeGenresLoading,
  selectAnimeList,
  selectAnimeListDataLoading,
  selectAnimeListPagination,
} from '../../data-access/anime.selectors';
import { AnimeListPageActions } from '../../data-access/anime.actions';
import { DEFAULT_PAGE_LIMIT } from 'src/app/shared/data-access/models/defaultPageLimit';

@Component({
  selector: 'app-animes-list',
  templateUrl: './animes-list.component.html',
  styleUrls: ['./animes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimesListComponent implements OnInit {
  animes$ = this.store.select(selectAnimeList);
  dropdowns$ = this.store.select(selectAnimeDropdownData);
  animeListDataLoading$ = this.store.select(selectAnimeListDataLoading);
  pagination$ = this.store.select(selectAnimeListPagination);
  genresLoading$ = this.store.select(selectAnimeGenresLoading);

  filters$ = combineLatest([this.dropdowns$, this.genresLoading$]).pipe(
    map(([dropdowns, isLoading]) => {
      return {
        filterDropdowns: this.addRouteData(dropdowns),
        filterInputs: this.addRouteData(this.filterInputs),
        isLoading,
      };
    })
  );

  data$ = combineLatest([
    this.animes$,
    this.pagination$,
    this.animeListDataLoading$,
  ]).pipe(
    map(([animes, pagination, isLoading]) => ({
      pagination,
      animes,
      isLoading,
    }))
  );

  filterInputs: DropdownData[] = [
    {
      label: 'Filter',
      param: 'q',
      type: 'string',
    },
    {
      label: 'Min Score',
      param: 'min_score',
      type: 'number',
    },
    {
      label: 'Max Score',
      param: 'max_score',
      type: 'number',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AnimeState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(AnimeListPageActions.loadAnimeGenresData());
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
      return { ...d, value: this.route.snapshot.queryParams[d.param] };
    });
  }

  handlePageChange(event: PaginatorState) {
    const currentParams = this.route.snapshot.queryParams;
    const updatedQueryParams: RouteQueryParams = {
      ...currentParams,
      page: (event.page ?? 0) + 1,
      limit: event.rows,
    };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: updatedQueryParams,
      queryParamsHandling: 'merge',
    });
  }

  defaultChange(paramData: ParamData) {
    if (paramData.param === '') return;
    let updatedQueryParams = {
      ...DEFAULT_PAGE_LIMIT,
      [paramData.param]: paramData.value,
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
}
