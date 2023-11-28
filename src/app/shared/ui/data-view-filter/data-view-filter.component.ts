import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Subscription, debounceTime, distinctUntilChanged, tap } from 'rxjs';

@Component({
  selector: 'app-data-view-filter',
  standalone: true,
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './data-view-filter.component.html',
  styleUrls: ['./data-view-filter.component.scss'],
})
export class DataViewFilterComponent implements OnInit, OnDestroy {
  @Input() filterDropdowns!: any[];
  @Input() filterText: any;
  searchSubscription: Subscription | undefined;
  searchControl = new FormControl(this.route.snapshot.queryParams['q']);

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.searchSubscription = this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((searchResult: any) => {
        this.defaultChange(searchResult, this.filterText.param);
      });
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  defaultChange(value: string | number, param: string) {
    let updatedQueryParams = {
      page: 1,
      limit: 10,
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
