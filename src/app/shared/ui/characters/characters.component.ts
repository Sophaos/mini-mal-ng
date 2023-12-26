import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { BasicDisplayData } from '../../data-access/models/basicDisplayData';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, ImageModule],
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersComponent {
  @Input() characters!: BasicDisplayData[];
}
