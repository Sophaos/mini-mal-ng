import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchService } from '../../data-access/search.service';
import { MenubarModule } from 'primeng/menubar';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, MenubarModule, ButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Output() toggleSideNavEvent = new EventEmitter();
  constructor() {}

  toggleSideNav() {
    this.toggleSideNavEvent.emit();
  }

  searchTerm(event: AutoCompleteCompleteEvent) {
    console.log(event);
  }
}
