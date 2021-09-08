import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';

import {
  NG_VALUE_ACCESSOR, ControlValueAccessor
} from '@angular/forms';

@Directive({
  selector: '[appMask]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: MaskDirective,
    multi: true
  }]
})
export class MaskDirective implements ControlValueAccessor {

  onTouched: any;
  onChange: any;

  @Input() appMask: string;
  @Output() Mask = new EventEmitter();

  constructor() { }

  writeValue(value: any): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('keyup', ['$event'])
  onKeyup($event: any) {
    // codigo
    let valor = $event.target.value.replace(/\D/g, '');
    let pad = this.appMask.replace(/\D/g, '').replace(/9/g, '_');
    let valorMask = valor + pad.substring(0, pad.length - valor.length);
 
 
    let valorMaskPos = 0;
    valor = '';
    for (let i = 0; i < this.appMask.length; i++) {
      if (isNaN(parseInt(this.appMask.charAt(i)))) {
        valor += this.appMask.charAt(i);
      } else {
        valor += valorMask[valorMaskPos++];
      }
    }
    
    if (valor.indexOf('_') > -1) {
      valor = valor.substr(0, valor.indexOf('_'));
    }
 
    $event.target.value = valor;
    this.Mask.emit($event.target.value);
  }

  @HostListener('blur', ['$event'])
  onBlur($event: any) {
    // codigo
    if ($event.target.value.length === this.appMask.length) {
      return;
    }
    this.onChange('');
    $event.target.value = '';
    this.Mask.emit($event.target.value);
  }

}