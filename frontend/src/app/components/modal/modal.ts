import { Component, input, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BootstrapColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  title = input.required<string>();
  textColor = input<string>('white');
  icon = input<string | null>(null);
  content = input.required<string>();
  colorClass = input.required<BootstrapColor>();
  confirmButtonColor = input<BootstrapColor>('primary');
  showCancelButton = input<boolean>(true);
  cancelButtonText = input<string>('Cancelar');
  confirmButtonText = input<string>('Confirmar');

  onCancel = output<void>();
  onConfirm = output<void>();

  isVisible = signal(false);

  show() {
    this.isVisible.set(true);
  }

  hide() {
    this.isVisible.set(false);
  }

  handleCancel() {
    this.onCancel.emit();
    this.hide();
  }

  handleConfirm() {
    this.onConfirm.emit();
    this.hide();
  }

  getHeaderClass(): string {
    return `bg-${this.colorClass()} text-${this.textColor()}`;
  }

  getConfirmButtonClass(): string {
    return `btn btn-${this.confirmButtonColor()}`;
  }
}
