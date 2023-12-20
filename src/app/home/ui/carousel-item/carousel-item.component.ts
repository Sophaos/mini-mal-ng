import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-carousel-item',
  standalone: true,
  imports: [CommonModule, RouterModule, ImageModule],
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselItemComponent {
  @Input() media!: any;
}
