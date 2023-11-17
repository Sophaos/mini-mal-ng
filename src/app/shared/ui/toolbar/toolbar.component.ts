import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../data-access/search.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  test = this.searchService.getAnimesFromSearch();
  constructor(private searchService: SearchService) {}
  ngOnInit(): void {}
}
