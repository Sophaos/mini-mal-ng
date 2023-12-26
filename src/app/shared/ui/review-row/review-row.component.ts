import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { AvatarModule } from 'primeng/avatar';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { Review } from '../../data-access/models/review';

@Component({
  selector: 'app-review-row',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    AccordionModule,
    AvatarModule,
    ScrollPanelModule,
  ],
  templateUrl: './review-row.component.html',
  styleUrls: ['./review-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewRowComponent {
  @Input() review!: Review;
}
