import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-sorting',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './sorting.component.html',
  styleUrl: './sorting.component.scss'
})
export class SortingComponent {
  sortBy: string = 'price-asc';
  @Output() sortChange = new EventEmitter<string>();

  onSortChange(event: any): void {
    this.sortChange.emit(event.value);
  }
}
