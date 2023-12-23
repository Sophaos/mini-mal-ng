import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicDisplayData } from 'src/app/shared/data-access/basicDisplayData';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffComponent {
  @Input() staff!: BasicDisplayData[];
}
