import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';

@Component({
  selector: 'app-data-view',
  standalone: true,
  imports: [CommonModule, DataViewModule],
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss'],
})
export class DataViewComponent {
  @Input({ required: true }) data!: any[];
  layout: any = 'list';
}
