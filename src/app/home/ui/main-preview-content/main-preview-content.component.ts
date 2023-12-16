import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ChipModule } from 'primeng/chip';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-main-preview-content',
  standalone: true,
  imports: [CommonModule, RouterLink, ChipModule, ImageModule],
  templateUrl: './main-preview-content.component.html',
  styleUrls: ['./main-preview-content.component.scss'],
})
export class MainPreviewContentComponent {
  @Input() media!: any;
  @Input() isDetailed: boolean = false;
}
