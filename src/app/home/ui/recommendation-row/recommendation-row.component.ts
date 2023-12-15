import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recommendation-row',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recommendation-row.component.html',
  styleUrls: ['./recommendation-row.component.scss'],
})
export class RecommendationRowComponent {
  @Input() user!: string;
  @Input() hoursDifference!: number;
  @Input() content!: string;
  @Input() likedMedia!: any;
  @Input() mightLikeMedia!: any;
}
