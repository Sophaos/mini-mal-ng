import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffComponent {
  @Input() staff!: any[];
}
