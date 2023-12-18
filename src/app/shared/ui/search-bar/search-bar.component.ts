import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { MediaCardComponent } from 'src/app/home/ui/media-card/media-card.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    SidebarModule,
    MediaCardComponent,
    ButtonModule,
    InputTextModule,
    FormsModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  public sideBarVisible: boolean = false;
}
