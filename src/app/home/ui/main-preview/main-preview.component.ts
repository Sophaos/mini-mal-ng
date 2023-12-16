import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { ChipModule } from 'primeng/chip';
import { ImageModule } from 'primeng/image';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { MainPreviewContentComponent } from '../main-preview-content/main-preview-content.component';

@Component({
  selector: 'app-main-preview',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CarouselModule,
    ChipModule,
    ImageModule,
    ButtonModule,
    TabViewModule,
    CardModule,
    MainPreviewContentComponent,
  ],
  templateUrl: './main-preview.component.html',
  styleUrls: ['./main-preview.component.scss'],
})
export class MainPreviewComponent {
  @Input() currentSeason!: any[];
  @Input() mangas!: any[];
  @Input() seasonTitle!: string;
  @Input() mangaTitle!: string;
}
