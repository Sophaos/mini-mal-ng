import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
  combineLatest,
  map,
} from 'rxjs';
import { getPagination } from 'src/app/shared/data-access/models/Pagination';
import { MangaService } from '../../data-access/manga.service';

@Component({
  selector: 'app-manga-list',
  templateUrl: './manga-list.component.html',
  styleUrls: ['./manga-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MangaListComponent {
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
    switchMap((queryParams) => this.getMangas(queryParams))
  );
  genres$ = this.mangaService.genres$;

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
    { value: 'manga', label: 'Manga' },
    { value: 'novel', label: 'Novel' },
    { value: 'lightnovel', label: 'Lightnovel' },
    { value: 'oneshot', label: 'Oneshot' },
    { value: 'doujin', label: 'Doujin' },
    { value: 'manhwa', label: 'Manhwa' },
    { value: 'manhua', label: 'Manhua' },
  ];

  statuses: any = [
    { value: '', label: 'None' },
    { value: 'publishing', label: 'Publishing' },
    { value: 'complete', label: 'Complete' },
    { value: 'hiatus', label: 'Hiatus' },
    { value: 'discontinued', label: 'Discontinued' },
    { value: 'upcoming', label: 'Upcoming' },
  ];

  orders: any = [
    { value: '', label: 'None' },
    { value: 'title', label: 'Title' },
    { value: 'start_date', label: 'Start Date' },
    { value: 'end_date', label: 'End Date' },
    { value: 'chapters', label: 'Chapters' },
    { value: 'volumes', label: 'Volumes' },
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
    private mangaService: MangaService
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

  getMangas = (queryParams: ParamMap) =>
    this.mangaService.search$({
      type: queryParams.get('type') ?? '',
      status: queryParams.get('status') ?? '',
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
