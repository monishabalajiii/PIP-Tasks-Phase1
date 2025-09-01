import { Component } from '@angular/core';
import { DropdownComponent, DropdownOption } from '../dropdown.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown-visible',
  standalone: true,
  imports: [DropdownComponent, CommonModule],
  templateUrl: './dropdown-visible.component.html',
  styleUrls: ['./dropdown-visible.component.scss'],
})
export class DropdownVisibleComponent {
  selectedFruit = '';

  fruitOptions: DropdownOption[] = [
    { value: 1, label: 'Apple' },
    { value: 2, label: 'Banana' },
    { value: 3, label: 'Orange' },
    { value: 4, label: 'Grape' },
    { value: 5, label: 'Mango' },
  ];

  onFruitSelection(option: DropdownOption) {
    this.selectedFruit = option.label;
  }
}
