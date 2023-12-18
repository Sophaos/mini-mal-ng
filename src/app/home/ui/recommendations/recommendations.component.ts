import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendationRowComponent } from '../recommendation-row/recommendation-row.component';
import { DataViewModule } from 'primeng/dataview';
import { ItemsContainerComponent } from '../items-container/items-container.component';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [
    CommonModule,
    ItemsContainerComponent,
    RecommendationRowComponent,
    DataViewModule,
  ],
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendationsComponent {
  @Input() title!: string;
  @Input() data!: any[];
}
