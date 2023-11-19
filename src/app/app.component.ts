import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchBarComponent } from './shared/ui/search-bar/search-bar.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(SearchBarComponent) searchBar!: SearchBarComponent;
  sidebarVisible: boolean = false;
  handleSideNavEvent() {
    this.searchBar.sideBarVisible = true;
  }
}
