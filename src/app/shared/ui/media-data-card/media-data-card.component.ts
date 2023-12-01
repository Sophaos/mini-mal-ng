import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-media-data-card',
  standalone: true,
  imports: [CommonModule, ChipModule],
  templateUrl: './media-data-card.component.html',
  styleUrls: ['./media-data-card.component.scss'],
})
export class MediaDataCardComponent {
  @Input() media: any;
}
