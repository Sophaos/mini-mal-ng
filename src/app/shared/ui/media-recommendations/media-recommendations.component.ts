import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Recommendation } from '../../data-access/models/recommendation';

@Component({
  selector: 'app-media-recommendations',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './media-recommendations.component.html',
  styleUrls: ['./media-recommendations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaRecommendationsComponent {
  @Input() recommendations!: Recommendation[];
  @Input() type: 'animes' | 'mangas' = 'animes';
}
