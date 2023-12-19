import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-label-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './label-info.component.html',
  styleUrls: ['./label-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelInfoComponent {
  @Input() label!: string;
  @Input() value: string | number | undefined;
}
