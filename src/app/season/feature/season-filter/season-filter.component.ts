import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, startWith, tap } from 'rxjs';

@Component({
  selector: 'app-season-filter',
  templateUrl: './season-filter.component.html',
  styleUrls: ['./season-filter.component.scss'],
})
export class SeasonFilterComponent {
  @Input() years!: any[];
  @Input() labels!: any[];

  defaultQueryParams = {
    page: 1,
    limit: 10,
    filter: 'tv',
  };

  medias: any = [
    { value: 'tv', label: 'TV' },
    { value: 'movie', label: 'Movie' },
    { value: 'ova', label: 'OVA' },
    { value: 'special', label: 'Special' },
    { value: 'ona', label: 'ONA' },
    { value: 'music', label: 'Music' },
  ];

  yearFormControl = new FormControl(Number(this.route.snapshot.params['year']));
  seasonFormControl = new FormControl(this.route.snapshot.params['season']);
  mediaFormControl = new FormControl(
    this.route.snapshot.queryParams['filter'] ?? this.defaultQueryParams.filter
  );

  year$ = this.yearFormControl.valueChanges.pipe(
    startWith(Number(this.route.snapshot.params['year'])),
    tap((res) =>
      this.router.navigate(
        ['/season', res, this.route.snapshot.params['season']],
        {
          relativeTo: this.route,
          queryParams: this.defaultQueryParams,
          queryParamsHandling: 'merge',
        }
      )
    )
  );

  season$ = this.seasonFormControl.valueChanges.pipe(
    startWith(this.route.snapshot.params['season']),
    tap((res) => {
      this.router.navigate(
        ['/season', this.route.snapshot.params['year'], res],
        {
          relativeTo: this.route,
          queryParams: {
            ...this.defaultQueryParams,
            ...this.route.snapshot.queryParams,
          },
          queryParamsHandling: 'merge',
        }
      );
    })
  );

  media$ = this.mediaFormControl.valueChanges.pipe(
    startWith(
      this.route.snapshot.queryParams['filter'] ??
        this.defaultQueryParams.filter
    ),
    tap((res) => {
      let updatedQueryParams = {
        page: 1,
        limit: 10,
        filter: res,
      };

      updatedQueryParams = {
        ...this.defaultQueryParams,
        ...updatedQueryParams,
      };
      this.updateRouteQueryParams(updatedQueryParams);
    })
  );

  vm$ = combineLatest([this.year$, this.media$, this.season$]).pipe();

  constructor(private route: ActivatedRoute, private router: Router) {}

  updateRouteQueryParams(updatedParams: any): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: updatedParams,
      queryParamsHandling: 'merge',
    });
  }
}
