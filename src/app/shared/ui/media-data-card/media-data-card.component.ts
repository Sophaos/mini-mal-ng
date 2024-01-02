import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { RouterLink } from '@angular/router';
import { ChipListComponent } from '../chip-list/chip-list.component';
import { Media } from '../../data-access/models/media';

@Component({
  selector: 'app-media-data-card',
  standalone: true,
  imports: [CommonModule, ImageModule, RouterLink, ChipListComponent],
  templateUrl: './media-data-card.component.html',
  styleUrls: ['./media-data-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaDataCardComponent {
  @Input() media!: Media;
  @Input() type: 'animes' | 'mangas' = 'animes';
}
