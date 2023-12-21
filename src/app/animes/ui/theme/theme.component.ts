import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsContainerComponent } from 'src/app/shared/ui/items-container/items-container.component';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [CommonModule, ItemsContainerComponent],
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeComponent {
  @Input() data!: any[];
  @Input() isCollapsed: boolean = false;
  @Input() title!: string;
}
