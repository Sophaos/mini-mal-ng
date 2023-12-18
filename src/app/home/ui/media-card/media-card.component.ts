import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-media-card',
  standalone: true,
  imports: [CommonModule, RouterModule, ImageModule],
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaCardComponent {
  @Input() anime!: any;
}
