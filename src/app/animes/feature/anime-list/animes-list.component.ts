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
export class AnimesListComponent implements OnInit {
  animes$ = this.route.queryParamMap.pipe(
    switchMap((queryParams) => this.getAnimes(queryParams))
  );

  vm$ = combineLatest([this.animes$, this.route.queryParamMap]).pipe(
    map(([animes, queryParams]) => ({
      pagination: getPagination(queryParams, animes.pagination.items.total),
      animes,
    }))
  );

  layout: any = 'list';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private animeService: AnimeService
  ) {}

  ngOnInit() {}

  getAnimes = (queryParams: ParamMap) =>
    this.animeService.getAnimeSearch$({
      type: queryParams.get('type') ?? '',
      status: queryParams.get('status') ?? '',
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
