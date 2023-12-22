import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton-main-review',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './skeleton-main-review.component.html',
  styleUrls: ['./skeleton-main-review.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonMainReviewComponent {}
