import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownData } from '../../data-access/models/dropdownData';
import { DEFAULT_PAGE_LIMIT } from '../../data-access/models/defaultPageLimit';
import { ParamData } from '../../data-access/models/paramData';
import { BehaviorSubject, debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { SkeletonDataViewFilterComponent } from '../skeleton-data-view-filter/skeleton-data-view-filter.component';

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
    SkeletonDataViewFilterComponent,
  ],
  templateUrl: './data-view-filter.component.html',
  styleUrls: ['./data-view-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataViewFilterComponent {
  @Input() filterDropdowns: DropdownData[] = [];
  @Input() filterInputs: DropdownData[] = [];
  @Input() isLoading: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

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

  changeQueryParams(event: string | number, param: string) {
    this.defaultChange({ value: event, param });
  }

  inputChange(event: string, param: string) {
    this.inputsSubject.next({ value: event, param });
  }
}
