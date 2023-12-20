import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { AvatarModule } from 'primeng/avatar';
import { ScrollPanelModule } from 'primeng/scrollpanel';

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
  @Input() score!: number;
  @Input() text!: string;
  @Input() image!: string;
  @Input() title!: string;
  @Input() user!: any;
  @Input() tags!: string[];
  @Input() hoursDifference!: number;
  @Input() id!: any;
}
