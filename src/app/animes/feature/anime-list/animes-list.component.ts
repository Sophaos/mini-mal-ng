import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import {
  combineLatest,
  map,
  BehaviorSubject,
  distinctUntilChanged,
  debounceTime,
  tap,
} from 'rxjs';
import { DropdownOption } from 'src/app/shared/data-access/models/dropdownOption';
import { DropdownData } from 'src/app/shared/data-access/models/dropdownData';
import { ParamData } from 'src/app/shared/data-access/models/paramData';
import { RouteQueryParams } from 'src/app/shared/data-access/models/routeQueryParams';
import {
  MEDIAS,
  ORDERS,
  RATINGS,
  SORTS,
  STATUSES,
} from '../../data-access/dropdownOptions';
import { Store } from '@ngrx/store';
import { AnimeState } from '../../data-access/anime.reducers';
import {
  selectAnimeGenres,
  selectAnimeList,
  selectAnimeListDataLoading,
  selectAnimeListPagination,
} from '../../data-access/anime.selectors';
import { AnimeListPageActions } from '../../data-access/anime.actions';

@Component({
  selector: 'app-animes-list',
  templateUrl: './animes-list.component.html',
  styleUrls: ['./animes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimesListComponent implements OnInit {
  private inputsSubject = new BehaviorSubject<ParamData>({
    value: '',
    param: '',
  });
  inputsChange = this.inputsSubject.asObservable();
  inputs$ = this.inputsChange.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    tap((res) => {
      this.defaultChange(res);
    })
  );

  animes$ = this.store.select(selectAnimeList);
  genres$ = this.store.select(selectAnimeGenres);
  animeListDataLoading$ = this.store.select(selectAnimeListDataLoading);
  pagination$ = this.store.select(selectAnimeListPagination);

  vm$ = combineLatest([
    this.animes$,
    this.pagination$,
    this.genres$,
    this.animeListDataLoading$,
    this.inputs$,
  ]).pipe(
    map(([animes, pagination, genres, animeListDataLoading]) => ({
      pagination,
      animes,
      genres,
      animeListDataLoading,
      filterDropdowns: this.getFilterDropdowns(genres),
      filterInputs: this.getFilterInputs(),
    }))
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AnimeState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(AnimeListPageActions.loadAnimeGenresData());
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

  getFilterDropdowns(genres: DropdownOption[]): DropdownData[] {
    return [
      {
        label: 'Media',
        value: this.route.snapshot.queryParams['type'],
        param: 'type',
        options: MEDIAS,
      },
      {
        label: 'Genre(s)',
        value: this.route.snapshot.queryParams['genres']
          ? this.route.snapshot.queryParams['genres'].split(',')
          : '',
        param: 'genres',
        options: genres,
        multi: true,
      },
      {
        label: 'Status',
        value: this.route.snapshot.queryParams['status'],
        param: 'status',
        options: STATUSES,
      },
      {
        label: 'Rating',
        value: this.route.snapshot.queryParams['rating'],
        param: 'rating',
        options: RATINGS,
      },
      {
        label: 'Order By',
        value: this.route.snapshot.queryParams['order_by'],
        param: 'order_by',
        options: ORDERS,
      },
      {
        label: 'Sort',
        value: this.route.snapshot.queryParams['sort'],
        param: 'sort',
        options: SORTS,
      },
    ];
  }

  getFilterInputs(): DropdownData[] {
    return [
      {
        label: 'Filter',
        value: this.route.snapshot.queryParams['q'],
        param: 'q',
        type: 'string',
        change: (event: string | number, param: string) =>
          this.inputsSubject.next({ value: event, param }),
      },
      {
        label: 'Min Score',
        value: this.route.snapshot.queryParams['min_score'],
        param: 'min_score',
        type: 'number',
        change: (event: string | number, param: string) =>
          this.inputsSubject.next({ value: event, param }),
      },
      {
        label: 'Max Score',
        value: this.route.snapshot.queryParams['max_score'],
        param: 'max_score',
        type: 'number',
        change: (event: string | number, param: string) =>
          this.inputsSubject.next({ value: event, param }),
      },
    ];
  }

  updateRouteQueryParams(updatedParams: RouteQueryParams): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: updatedParams,
      queryParamsHandling: 'merge',
    });
  }

  handlePageChange(event: PaginatorState) {
    const currentParams = this.route.snapshot.queryParams;
    const updatedParams: RouteQueryParams = {
      ...currentParams,
      page: (event.page ?? 0) + 1,
      limit: event.rows,
    };
    this.updateRouteQueryParams(updatedParams);
  }

  defaultChange(paramData: ParamData) {
    if (paramData.param === '') return;
    let updatedQueryParams = {
      page: 1,
      limit: 16,
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
