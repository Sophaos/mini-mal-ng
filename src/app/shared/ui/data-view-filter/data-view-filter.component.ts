import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-data-view-filter',
  standalone: true,
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    ReactiveFormsModule,
    MultiSelectModule,
  ],
  templateUrl: './data-view-filter.component.html',
  styleUrls: ['./data-view-filter.component.scss'],
})
export class DataViewFilterComponent {
  @Input() filterDropdowns: any[] = [];
  @Input() filterInputs: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

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

  changeQueryParamsMulti(event: any, param: string, asas: any) {
    this.defaultChange(event.value.toString(), param);
  }
}
