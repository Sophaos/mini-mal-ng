import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaDataCardComponent } from '../media-data-card/media-data-card.component';
import { SkeletonDataViewComponent } from '../skeleton-data-view/skeleton-data-view.component';
import { Media } from '../../data-access/models/media';

@Component({
  selector: 'app-data-view',
  standalone: true,
  imports: [CommonModule, MediaDataCardComponent, SkeletonDataViewComponent],
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataViewComponent {
  @Input({ required: true }) data!: Media[];
  @Input() isLoading: boolean = true;
}
