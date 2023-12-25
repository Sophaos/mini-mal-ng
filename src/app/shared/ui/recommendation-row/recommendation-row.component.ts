import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HomeRecommendation } from '../../data-access/homeReview';

@Component({
  selector: 'app-recommendation-row',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recommendation-row.component.html',
  styleUrls: ['./recommendation-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendationRowComponent {
  @Input() recommendation!: HomeRecommendation;
}
