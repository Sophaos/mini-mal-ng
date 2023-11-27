import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import { combineLatest, map, switchMap } from 'rxjs';
import { SeasonsService } from '../../data-access/seasons.service';
import { getPagination } from 'src/app/shared/data-access/models/Pagination';

@Component({
  selector: 'app-season-list',
  templateUrl: './season-list.component.html',
  styleUrls: ['./season-list.component.scss'],
})
export class SeasonListComponent {
  seasons$ = this.seasonService.seasons$;
  animes$ = combineLatest([this.route.paramMap, this.route.queryParamMap]).pipe(
    switchMap(([params, queryParams]) =>
      this.getSeasonAnimes(params, queryParams)
    )
  );

  vm$ = combineLatest([
    this.seasons$,
    this.animes$,
    this.route.paramMap,
    this.route.queryParamMap,
  ]).pipe(
    map(([seasons, animes, params, queryParams]) => ({
      seasons,
      seasonLabels: this.getSeasonData(seasons, params),
      pagination: getPagination(queryParams, animes.pagination.items.total),
      animes,
    }))
  );

  layout: any = 'list';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seasonService: SeasonsService
  ) {}

  getSeasonData(seasons: any, params: ParamMap) {
    const labels = seasons.labels.find(
      (s: any) => s.year === Number(params.get('year'))
    ).labels;
    return {
      labels,
      season: labels.find((l: any) => l.label === params.get('season')),
    };
  }

  getSeasonAnimes = (params: ParamMap, queryParams: ParamMap) =>
    this.seasonService.getSeason$({
      year: params.get('year') ?? new Date().getFullYear(),
      season: params.get('season') ?? this.getCurrentSeason(),
      filter: queryParams.get('filter') ?? 'tv',
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

  getCurrentSeason(): string {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Month is zero-indexed, so we add 1

    if (currentMonth >= 3 && currentMonth <= 5) {
      return 'spring';
    } else if (currentMonth >= 6 && currentMonth <= 8) {
      return 'summer';
    } else if (currentMonth >= 9 && currentMonth <= 11) {
      return 'fall';
    } else {
      return 'winter';
    }
  }
}
