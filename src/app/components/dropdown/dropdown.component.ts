import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

export interface DropdownOption {
  value: any;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
    @Input() options: DropdownOption[] = [];
  @Input() placeholder: string = 'Select an option';
  @Input() disabled: boolean = false;

  @Output() selectionChange = new EventEmitter<DropdownOption>();

  isOpen = false;
  selectedOption: DropdownOption | null = null;

  constructor(private elementRef: ElementRef) {}

  toggle(): void {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
      console.log('Dropdown toggled:', this.isOpen); // Debug log
    }
  }

  selectOption(option: DropdownOption): void {
    if (!option.disabled) {
      this.selectedOption = option;
      this.isOpen = false;
      this.selectionChange.emit(option);
      console.log('Option selected:', option); // Debug log
    }
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  // Handle keyboard navigation
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.isOpen = false;
    }
  }


}
