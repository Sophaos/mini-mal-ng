import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-detailed-review',
  standalone: true,
  imports: [CommonModule, AccordionModule, AvatarModule],
  templateUrl: './detailed-review.component.html',
  styleUrls: ['./detailed-review.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailedReviewComponent {
  @Input() score!: number;
  @Input() text!: string;
  @Input() image!: string;
  @Input() title!: string;
  @Input() user!: any;
  @Input() tags!: string[];
  @Input() hoursDifference!: number;
  @Input() id!: any;
}
