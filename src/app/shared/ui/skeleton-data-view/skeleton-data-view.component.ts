import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton-data-view',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './skeleton-data-view.component.html',
  styleUrls: ['./skeleton-data-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonDataViewComponent {}
