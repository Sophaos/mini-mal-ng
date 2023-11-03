import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PaginatorState } from 'primeng/paginator';
import { Observable } from 'rxjs';
import { AnimeBasicInfo } from 'src/app/shared/data-access/AnimeBasicInfo';
import { AnimesPagesActions } from 'src/app/state/animes.actions';
import { selectSeason } from 'src/app/state/animes.selector';

@Component({
  selector: 'app-anime-season-list',
  templateUrl: './anime-season-list.component.html',
  styleUrls: ['./anime-season-list.component.scss'],
})
export class AnimeSeasonListComponent implements OnInit {
  layout: any = 'list';
  animes$: Observable<AnimeBasicInfo[]> = this.store.select(selectSeason);

  first: number = 0;
  rows: number = 10;
  page: number = 0;

  selectedMedia = null;
  selectedSeason = 'winter';
  medias: any = [
    { code: 'tv', name: 'TV' },
    { code: 'movie', name: 'Movie' },
    { code: 'ova', name: 'OVA' },
    { code: 'special', name: 'Special' },
    { code: 'ona', name: 'ONA' },
    { code: 'music', name: 'Music' },
  ];

  seasons: any = [
    { code: 'winter', name: 'Winter' },
    { code: 'spring', name: 'Spring' },
    { code: 'summer', name: 'Summer' },
    { code: 'fall', name: 'Fall' },
  ];

  years: any = [
    { code: 2021, name: '2021' },
    { code: 2022, name: '2022' },
    { code: 2023, name: '2023' },
    { code: 2024, name: '2024' },
    { code: 2025, name: '2025' },
    { code: 2026, name: '2026' },
    { code: 2027, name: '2027' },
  ];

  constructor(private store: Store<any>) {}
  formGroup!: FormGroup;

  ngOnInit() {
    this.formGroup = new FormGroup({
      media: new FormControl<string | null>('tv'),
      season: new FormControl<string | null>('fall'),
      year: new FormControl<number | null>(2023),
    });
    this.store.dispatch(
      AnimesPagesActions.loadSeason({
        params: {
          filter: this.formGroup.value['media'],
          year: this.formGroup.value['year'],
          season: this.formGroup.value['season'],
          limit: 10,
          sfw: true,
          page: 1,
        },
      })
    );
  }

  test() {}

  filterChange() {
    this.store.dispatch(
      AnimesPagesActions.loadSeason({
        params: {
          filter: this.formGroup.value['media'],
          year: this.formGroup.value['year'],
          season: this.formGroup.value['season'],
          limit: this.rows,
          sfw: true,
          page: this.page,
        },
      })
    );
  }
  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
    this.page = event.page ?? 0;
    console.log(event, this.first, this.rows);
    this.store.dispatch(
      AnimesPagesActions.loadSeason({
        params: {
          filter: this.formGroup.value['media'],
          year: this.formGroup.value['year'],
          season: this.formGroup.value['season'],
          limit: event.rows,
          sfw: true,
          page: event.page ? event.page + 1 : 1,
        },
      })
    );
  }
}
