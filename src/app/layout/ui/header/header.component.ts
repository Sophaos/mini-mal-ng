import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { getCurrentSeason } from 'src/app/shared/utils/currentSeason';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MenubarModule, AvatarModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideNavEvent = new EventEmitter();
  items: MenuItem[] | undefined;
  currentSeason = '';
  currentYear = new Date().getFullYear();
  constructor() {}
  ngOnInit(): void {
    this.currentSeason = getCurrentSeason();
    const seasonUrl = `/season/${this.currentYear}/${this.currentSeason}`;
    this.items = [
      {
        label: 'Home',
        routerLink: '/home',
        queryParams: {},
      },
      {
        label: 'Animes',
        routerLink: '/animes',
        queryParams: { page: 1, limit: 16 },
        replaceUrl: true,
      },
      {
        label: 'Mangas',
        routerLink: '/mangas',
        queryParams: { page: 1, limit: 16 },
      },
      {
        label: 'Season',
        routerLink: seasonUrl,
        queryParams: { page: 1, limit: 16 },
      },
    ];
  }
}
