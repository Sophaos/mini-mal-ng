import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipModule } from 'primeng/chip';
import { ImageModule } from 'primeng/image';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-media-data-card',
  standalone: true,
  imports: [CommonModule, ChipModule, ImageModule, RouterLink],
  templateUrl: './media-data-card.component.html',
  styleUrls: ['./media-data-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaDataCardComponent {
  @Input() media: any;
}
