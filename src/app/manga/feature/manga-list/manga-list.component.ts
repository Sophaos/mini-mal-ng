import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import {
  combineLatest,
  map,
} from 'rxjs';
import { DropdownData } from 'src/app/shared/data-access/models/dropdownData';
import { ParamData } from 'src/app/shared/data-access/models/paramData';
import { RouteQueryParams } from 'src/app/shared/data-access/models/routeQueryParams';
import { DEFAULT_PAGE_LIMIT } from 'src/app/shared/data-access/models/defaultPageLimit';
import { MangaState } from '../../data-access/manga.reducers';
import { Store } from '@ngrx/store';
import {
  selectMangaDropdownData,
  selectMangaGenresLoading,
  selectMangaList,
  selectMangaListDataLoading,
  selectMangaListPagination,
} from '../../data-access/manga.selectors';
import { MangaListPageActions } from '../../data-access/manga.actions';

@Component({
  selector: 'app-manga-list',
  templateUrl: './manga-list.component.html',
  styleUrls: ['./manga-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MangaListComponent implements OnInit {
  mangas$ = this.store.select(selectMangaList);
  dropdowns$ = this.store.select(selectMangaDropdownData);
  mangaListDataLoading$ = this.store.select(selectMangaListDataLoading);
  pagination$ = this.store.select(selectMangaListPagination);
  genresLoading$ = this.store.select(selectMangaGenresLoading);

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
    this.mangas$,
    this.pagination$,
    this.mangaListDataLoading$,
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
    private store: Store<MangaState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(MangaListPageActions.loadMangaGenresData());
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
