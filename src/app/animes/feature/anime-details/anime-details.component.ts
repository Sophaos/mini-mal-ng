import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { AnimeService } from '../../data-access/anime.service';

@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.scss'],
})
export class AnimeDetailsComponent implements OnInit {
  anime$ = this.route.paramMap.pipe(
    switchMap((params) =>
      this.animeService.getAnimeFullById$(Number(params.get('id') || 0))
    )
  );

  constructor(
    private route: ActivatedRoute,
    private animeService: AnimeService
  ) {}
  ngOnInit(): void {}
}
