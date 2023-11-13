import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, switchMap } from 'rxjs';
import { AnimeBasicInfo } from 'src/app/shared/data-access/AnimeBasicInfo';
import { AnimesPagesActions } from 'src/app/state/animes.actions';
import { selectAnime, selectRouteParams } from 'src/app/state/animes.selector';
import { AnimeService } from '../../data-access/anime.service';

@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.scss'],
})
export class AnimeDetailsComponent implements OnInit {
  // anime$: Observable<AnimeBasicInfo> = this.store.select(selectAnime);
  anime$ = this.route.paramMap.pipe(
    switchMap((params) =>
      this.animeService.getAnimeFullById$(Number(params.get('id') || 0))
    )
  );

  constructor(
    private store: Store<any>,
    private route: ActivatedRoute,
    private animeService: AnimeService
  ) {}
  ngOnInit(): void {
    // const animeId = parseInt(this.activatedRoute.snapshot.params['id']);
    // this.store.dispatch(AnimesPagesActions.loadAnimeFullById({ id: animeId }));
  }
}
