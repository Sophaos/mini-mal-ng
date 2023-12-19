import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ChipModule } from 'primeng/chip';
import { ImageModule } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { GalleriaModule } from 'primeng/galleria';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailedMediaComponent } from 'src/app/shared/ui/detailed-media/detailed-media.component';

@Component({
  selector: 'app-main-preview-content',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ChipModule,
    ImageModule,
    DividerModule,
    CardModule,
    GalleriaModule,
    ReactiveFormsModule,
    DetailedMediaComponent,
  ],
  templateUrl: './main-preview-content.component.html',
  styleUrls: ['./main-preview-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPreviewContentComponent {
  @Input() media!: any;
  @Input() isDetailed: boolean = false;
  @Input() pictures: any[] = [];
}
