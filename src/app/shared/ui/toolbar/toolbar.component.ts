import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchService } from '../../data-access/search.service';
import { MenubarModule } from 'primeng/menubar';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, MenubarModule, ButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
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
        icon: 'pi pi-fw pi-file',
        url: '/home',
      },
      {
        label: 'Season',
        icon: 'pi pi-fw pi-pencil',
        url: seasonUrl,
      },
      {
        label: 'Manga',
        icon: 'pi pi-fw pi-user',
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
