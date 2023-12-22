import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton-main-preview',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './skeleton-main-preview.component.html',
  styleUrls: ['./skeleton-main-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonMainPreviewComponent {}
