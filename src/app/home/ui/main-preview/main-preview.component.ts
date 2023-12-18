import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Params, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { ChipModule } from 'primeng/chip';
import { ImageModule } from 'primeng/image';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { MainPreviewContentComponent } from '../main-preview-content/main-preview-content.component';
import { PanelModule } from 'primeng/panel';
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
    PanelModule,
  ],
  templateUrl: './main-preview.component.html',
  styleUrls: ['./main-preview.component.scss'],
})
export class MainPreviewComponent {
  @Input() data!: any[];
  @Input() header!: string;
  @Input() link?: (string | number)[];
  @Input() queryParams: Params = {};
}
