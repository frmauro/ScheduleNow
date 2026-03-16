import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  template: `
    <div class="space-y-1.5">
      <label *ngIf="label" class="block text-sm font-medium text-slate-700 ml-1">
        {{ label }}
      </label>
      <div class="relative group">
        <input
          [type]="type"
          [placeholder]="placeholder"
          [value]="value"
          [disabled]="disabled"
          (input)="onInput($event)"
          (blur)="onBlur()"
          class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 
                 transition-all duration-200 outline-none
                 group-hover:border-indigo-300
                 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10
                 disabled:opacity-50 disabled:bg-slate-100 disabled:cursor-not-allowed"
          [ngClass]="{ 'border-red-500 focus:border-red-500 focus:ring-red-500/10': error }"
        />
        <div *ngIf="error" class="mt-1 text-xs text-red-500 ml-1">
          {{ error }}
        </div>
      </div>
    </div>
  `
})
export class InputComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() error?: string | null;

  value: any = '';
  disabled = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: any): void {
    const val = event.target.value;
    this.value = val;
    this.onChange(val);
  }

  onBlur(): void {
    this.onTouched();
  }
}
