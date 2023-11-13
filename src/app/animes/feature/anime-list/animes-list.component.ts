import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-animes-list',
  templateUrl: './animes-list.component.html',
  styleUrls: ['./animes-list.component.scss'],
})
export class AnimesListComponent implements OnInit {
  layout: any = 'list';
  value: string | undefined;

  first: number = 0;
  rows: number = 10;
  page: number = 0;

  selectedMedia = null;
  medias: any = [
    { code: 'tv', name: 'TV' },
    { code: 'movie', name: 'Movie' },
    { code: 'ova', name: 'OVA' },
    { code: 'special', name: 'Special' },
    { code: 'ona', name: 'ONA' },
    { code: 'music', name: 'Music' },
  ];

  constructor() {}
  formGroup!: FormGroup;

  ngOnInit() {}

  filterChange() {}
  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
    this.page = event.page ?? 0;
  }
}
