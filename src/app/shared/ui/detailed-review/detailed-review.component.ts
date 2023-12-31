import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { AvatarModule } from 'primeng/avatar';
import { DetailedReview } from '../../data-access/models/detailedReview';

@Component({
  selector: 'app-detailed-review',
  standalone: true,
  imports: [CommonModule, AccordionModule, AvatarModule],
  templateUrl: './detailed-review.component.html',
  styleUrls: ['./detailed-review.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailedReviewComponent {
  @Input() review!: DetailedReview;
}
