import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, SidebarModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  public sideBarVisible: boolean = false;
}
