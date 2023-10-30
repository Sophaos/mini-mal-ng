import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PaginatorState } from 'primeng/paginator';
import { Observable, map, tap } from 'rxjs';
import { AnimeBasicInfo } from 'src/app/models/AnimeBasicInfo';
import { AnimesPagesActions } from 'src/app/state/animes.actions';
import { selectAnimes, selectSeason } from 'src/app/state/animes.selector';

@Component({
  selector: 'app-animes-list',
  templateUrl: './animes-list.component.html',
  styleUrls: ['./animes-list.component.scss'],
})
export class AnimesListComponent implements OnInit {
  layout: any = 'list';
  value: string | undefined;
  animes$: Observable<AnimeBasicInfo[]> = this.store.select(selectAnimes);

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

  constructor(private store: Store<any>) {}
  formGroup!: FormGroup;

  ngOnInit() {
    this.formGroup = new FormGroup({
      media: new FormControl<string | null>('tv'),
    });
    this.formGroup.valueChanges
      .pipe(
        tap(() => {
          console.log('allo');
        })
      )
      .subscribe();
    this.store.dispatch(AnimesPagesActions.loadAnimeSearch({}));
  }

  filterChange() {
    this.store.dispatch(
      AnimesPagesActions.loadAnimeSearch({
        params: {
          type: this.formGroup.value['media'],
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
      AnimesPagesActions.loadAnimeSearch({
        params: {
          type: this.formGroup.value['media'],
          limit: event.rows,
          sfw: true,
          page: event.page ? event.page + 1 : 1,
        },
      })
    );
  }
}
