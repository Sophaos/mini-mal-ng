import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton-main-recommendation',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './skeleton-main-recommendation.component.html',
  styleUrls: ['./skeleton-main-recommendation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonMainRecommendationComponent {}
