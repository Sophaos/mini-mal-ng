import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ChipModule } from 'primeng/chip';
import { ImageModule } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-main-preview-content',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ChipModule,
    ImageModule,
    DividerModule,
    CardModule,
  ],
  templateUrl: './main-preview-content.component.html',
  styleUrls: ['./main-preview-content.component.scss'],
})
export class MainPreviewContentComponent {
  @Input() media!: any;
  @Input() isDetailed: boolean = false;
}
