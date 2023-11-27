import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { startWith, tap, combineLatest } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-animes-filter',
  templateUrl: './animes-filter.component.html',
  styleUrls: ['./animes-filter.component.scss'],
})
export class AnimesFilterComponent {
  defaultQueryParams = {
    page: 1,
    limit: 10,
  };

  // TODO: extract that; used in season too
  medias: any = [
    { value: 'tv', label: 'TV' },
    { value: 'movie', label: 'Movie' },
    { value: 'ova', label: 'OVA' },
    { value: 'special', label: 'Special' },
    { value: 'ona', label: 'ONA' },
    { value: 'music', label: 'Music' },
  ];

  statuses: any = [
    { value: 'airing', label: 'Airing' },
    { value: 'complete', label: 'Complete' },
    { value: 'upcoming', label: 'Upcoming' },
  ];

  mediaFormControl = new FormControl(
    this.route.snapshot.queryParams['type'] ?? ''
  );

  statusFormControl = new FormControl(
    this.route.snapshot.queryParams['status'] ?? ''
  );

  media$ = this.mediaFormControl.valueChanges.pipe(
    startWith(this.route.snapshot.queryParams['type'] ?? ''),
    tap((res) => {
      const updatedQueryParams = {
        ...this.defaultQueryParams,
        ...this.route.snapshot.queryParams,
        type: res,
      };
      this.updateRouteQueryParams(updatedQueryParams);
    })
  );

  // TODO: changed these should put page to 1, but not on init.. to be fixed everywhere
  status$ = this.statusFormControl.valueChanges.pipe(
    startWith(this.route.snapshot.queryParams['status'] ?? ''),
    tap((res) => {
      const updatedQueryParams = {
        ...this.defaultQueryParams,
        ...this.route.snapshot.queryParams,
        status: res,
      };
      this.updateRouteQueryParams(updatedQueryParams);
    })
  );

  vm$ = combineLatest([this.media$, this.status$]).pipe();

  constructor(private route: ActivatedRoute, private router: Router) {}

  updateRouteQueryParams(updatedParams: any): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: updatedParams,
      queryParamsHandling: 'merge',
    });
  }
}
