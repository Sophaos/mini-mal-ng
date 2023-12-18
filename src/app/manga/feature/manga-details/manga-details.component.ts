import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-manga-details',
  templateUrl: './manga-details.component.html',
  styleUrls: ['./manga-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MangaDetailsComponent {}
