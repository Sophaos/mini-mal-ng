import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { CardModule } from 'primeng/card';
import { DropdownData } from '../../data-access/dropdownData';

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
    CardModule,
  ],
  templateUrl: './data-view-filter.component.html',
  styleUrls: ['./data-view-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataViewFilterComponent {
  @Input() filterDropdowns: DropdownData[] = [];
  @Input() filterInputs: DropdownData[] = [];

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

  changeQueryParams(event: string, param: string) {
    this.defaultChange(event, param);
  }

  changeQueryParamsMulti(event: string | number, param: string) {
    this.defaultChange(event.toString(), param);
  }
}
