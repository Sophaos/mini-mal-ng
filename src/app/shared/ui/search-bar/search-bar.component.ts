import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { SearchService } from '../../data-access/search.service';
import { MediaCardComponent } from 'src/app/home/ui/media-card/media-card.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    SidebarModule,
    MediaCardComponent,
    ButtonModule,
    InputTextModule,
    FormsModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  // searchTerm: string = '';
  // animes = this.searchService.getAnimesFromSearch();
  // constructor(private searchService: SearchService) {}
  public sideBarVisible: boolean = false;
  // search() {
  //   this.animes = this.searchService.getAnimesFromSearch(this.searchTerm);
  // }
}
