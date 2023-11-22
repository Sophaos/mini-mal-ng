import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Pagination } from '../../data-access/Pagination';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule, PaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  @Input() rowsPerPageOptions = [10, 20, 25];
  @Input({ required: true }) pagination!: Pagination;
  @Output() onPageChange = new EventEmitter<PaginatorState>();

  pageChange(event: PaginatorState) {
    this.onPageChange.emit(event);
  }
}
