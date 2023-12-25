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
    this.currentSeason = this.getCurrentSeason();
    const seasonUrl = `/season/${this.currentYear}/${this.currentSeason}`;
    this.items = [
      {
        label: 'Home',
        routerLink: '/home',
      },
      {
        label: 'Animes',
        routerLink: '/animes',
      },
      {
        label: 'Season',
        routerLink: seasonUrl,
      },
    ];
  }

  getCurrentSeason(): string {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Month is zero-indexed, so we add 1

    if (currentMonth >= 3 && currentMonth <= 5) {
      return 'spring';
    } else if (currentMonth >= 6 && currentMonth <= 8) {
      return 'summer';
    } else if (currentMonth >= 9 && currentMonth <= 11) {
      return 'fall';
    } else {
      return 'winter';
    }
  }
}
