import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-view-filter',
  standalone: true,
  imports: [CommonModule, DropdownModule, FormsModule],
  templateUrl: './data-view-filter.component.html',
  styleUrls: ['./data-view-filter.component.scss'],
})
export class DataViewFilterComponent {
  @Input() filterData!: any[];

  constructor(private route: ActivatedRoute, private router: Router) {}

  defaultChange(event: any, param: string) {
    let updatedQueryParams = {
      page: 1,
      limit: 10,
      [param]: event.value,
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
