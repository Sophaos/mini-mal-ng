import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-relations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './relations.component.html',
  styleUrls: ['./relations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelationsComponent {
  @Input() relations!: any[];
}
