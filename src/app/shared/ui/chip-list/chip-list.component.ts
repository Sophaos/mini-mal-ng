import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-chip-list',
  standalone: true,
  imports: [CommonModule, ChipModule],
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipListComponent {
  @Input() data!: any[];
}
