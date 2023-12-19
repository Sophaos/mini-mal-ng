import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-label-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './label-list.component.html',
  styleUrls: ['./label-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelListComponent {
  @Input() data!: any[];
  @Input() label!: string;
}
