import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { RouterLink } from '@angular/router';
import { LabelListComponent } from '../label-list/label-list.component';
import { LabelInfoComponent } from '../label-info/label-info.component';
import { Media } from '../../data-access/models/media';

@Component({
  selector: 'app-detailed-media',
  standalone: true,
  imports: [
    CommonModule,
    DividerModule,
    RouterLink,
    LabelListComponent,
    LabelInfoComponent,
  ],
  templateUrl: './detailed-media.component.html',
  styleUrls: ['./detailed-media.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailedMediaComponent {
  @Input() media!: Media;
}
