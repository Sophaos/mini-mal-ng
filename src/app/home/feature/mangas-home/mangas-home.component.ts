import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TopService } from 'src/app/shared/data-access/top.service';

@Component({
  selector: 'app-mangas-home',
  templateUrl: './mangas-home.component.html',
  styleUrls: ['./mangas-home.component.scss'],
})
export class MangasHomeComponent implements AfterViewInit {
  topAiring$ = this.topService.mangas$;
  constructor(private topService: TopService) {}
  ngAfterViewInit(): void {
    this.topService.mangasChanged({
      type: 'manga',
      filter: 'publishing',
      limit: 12,
      page: 0,
    });
  }
}
