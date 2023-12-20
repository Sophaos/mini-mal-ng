import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipModule } from 'primeng/chip';
import { ImageModule } from 'primeng/image';
import { RouterLink } from '@angular/router';
import { ChipListComponent } from '../chip-list/chip-list.component';

@Component({
  selector: 'app-media-data-card',
  standalone: true,
  imports: [CommonModule, ImageModule, RouterLink, ChipListComponent],
  templateUrl: './media-data-card.component.html',
  styleUrls: ['./media-data-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaDataCardComponent {
  @Input() media: any;
}
