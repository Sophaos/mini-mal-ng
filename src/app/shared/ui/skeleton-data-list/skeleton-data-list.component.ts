import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonDataViewComponent } from '../skeleton-data-view/skeleton-data-view.component';
import { SkeletonPaginatorComponent } from '../skeleton-paginator/skeleton-paginator.component';

@Component({
  selector: 'app-skeleton-data-list',
  standalone: true,
  imports: [
    CommonModule,
    SkeletonDataViewComponent,
    SkeletonPaginatorComponent,
  ],
  templateUrl: './skeleton-data-list.component.html',
  styleUrls: ['./skeleton-data-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonDataListComponent {}
