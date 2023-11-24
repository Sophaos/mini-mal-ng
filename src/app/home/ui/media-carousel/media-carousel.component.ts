import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { MediaCardComponent } from '../media-card/media-card.component';
import { Params, RouterLink } from '@angular/router';
import { ItemsContainerComponent } from '../items-container/items-container.component';

@Component({
  selector: 'app-media-carousel',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    MediaCardComponent,
    RouterLink,
    ItemsContainerComponent,
  ],
  templateUrl: './media-carousel.component.html',
  styleUrls: ['./media-carousel.component.scss'],
})
export class MediaCarouselComponent {
  @Input({ required: true }) data!: any[];
  @Input() title: string = '';
  @Input() link?: (string | number)[];
  @Input() queryParams: Params = {};
}
