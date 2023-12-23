import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton-panel-header',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './skeleton-panel-header.component.html',
  styleUrls: ['./skeleton-panel-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonPanelHeaderComponent {}
