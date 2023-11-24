import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsContainerComponent } from '../items-container/items-container.component';
import { ReviewRowComponent } from '../review-row/review-row.component';
import { DataViewModule } from 'primeng/dataview';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    CommonModule,
    ItemsContainerComponent,
    ReviewRowComponent,
    DataViewModule,
  ],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent {
  @Input() title!: string;
  @Input() data!: any[];
}
