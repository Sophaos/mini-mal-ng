import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-review-row',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './review-row.component.html',
  styleUrls: ['./review-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewRowComponent {
  @Input() score!: number;
  @Input() text!: string;
  @Input() image!: string;
  @Input() title!: string;
  @Input() user!: string;
  @Input() tags!: string[];
  @Input() hoursDifference!: number;
  @Input() id!: any;
}
