import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton-data-view-filter',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './skeleton-data-view-filter.component.html',
  styleUrls: ['./skeleton-data-view-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonDataViewFilterComponent {}
