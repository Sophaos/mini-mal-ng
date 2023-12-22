import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton-paginator',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './skeleton-paginator.component.html',
  styleUrls: ['./skeleton-paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonPaginatorComponent {}
