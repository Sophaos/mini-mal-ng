import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchService } from '../../../shared/data-access/search.service';
import { MenubarModule } from 'primeng/menubar';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MenubarModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
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
      {
        label: 'Mangas',
        routerLink: '/mangas',
      },
    ];
  }

  toggleSideNav() {
    this.toggleSideNavEvent.emit();
  }

  searchTerm(event: AutoCompleteCompleteEvent) {
    console.log(event);
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
