import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Params, RouterLink, RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-items-container',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, CardModule, PanelModule],
  templateUrl: './items-container.component.html',
  styleUrls: ['./items-container.component.scss'],
})
export class ItemsContainerComponent {
  @Input() title: string = '';
  @Input() link?: (string | number)[];
  @Input() queryParams: Params = {};
}
