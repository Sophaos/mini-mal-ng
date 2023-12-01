import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { MediaDataCardComponent } from '../media-data-card/media-data-card.component';

@Component({
  selector: 'app-data-view',
  standalone: true,
  imports: [CommonModule, DataViewModule, MediaDataCardComponent],
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss'],
})
export class DataViewComponent {
  @Input({ required: true }) data!: any[];
  layout: any = 'list';
}
