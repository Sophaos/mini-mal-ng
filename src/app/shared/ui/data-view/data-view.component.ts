import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaDataCardComponent } from '../media-data-card/media-data-card.component';
import { SkeletonDataViewComponent } from '../skeleton-data-view/skeleton-data-view.component';
import { Media } from '../../data-access/models/media';
import { PaginatorComponent } from '../paginator/paginator.component';
import { Pagination } from '../../data-access/models/pagination';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-data-view',
  standalone: true,
  imports: [
    CommonModule,
    MediaDataCardComponent,
    SkeletonDataViewComponent,
    PaginatorComponent,
  ],
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataViewComponent {
  @Input({ required: true }) data: Media[] = [];
  @Input() isLoading: boolean = true;
  @Input({ required: true }) pagination!: Pagination;
  @Output() onPageChange = new EventEmitter<PaginatorState>();

  handlePageChange(event: PaginatorState) {
    this.onPageChange.emit(event);
  }
}
