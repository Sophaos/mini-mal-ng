import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-row.component.html',
  styleUrls: ['./review-row.component.scss'],
})
export class ReviewRowComponent {
  @Input() score!: number;
  @Input() text!: string;
  @Input() image!: string;
  @Input() title!: string;
  @Input() user!: string;
  @Input() tags!: string[];
}
