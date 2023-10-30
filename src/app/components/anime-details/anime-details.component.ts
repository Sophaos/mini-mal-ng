import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AnimeBasicInfo } from 'src/app/models/AnimeBasicInfo';
import { AnimesPagesActions } from 'src/app/state/animes.actions';
import { selectAnime, selectRouteParams } from 'src/app/state/animes.selector';

@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.scss'],
})
export class AnimeDetailsComponent implements OnInit {
  anime$: Observable<AnimeBasicInfo> = this.store.select(selectAnime);

  constructor(
    private store: Store<any>,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const animeId = parseInt(this.activatedRoute.snapshot.params['id']);
    this.store.dispatch(AnimesPagesActions.loadAnimeFullById({ id: animeId }));
  }
}
