// import { Component, OnInit } from '@angular/core';
import {
  AfterViewInit, Component, ElementRef, forwardRef, Input, NgZone, OnDestroy,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

declare let tinymce: any;

export const TINYMCE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TinyeditorComponent),
  multi: true
};

@Component({
  selector: 'app-tinyeditor',
  templateUrl: './tinyeditor.component.html',
  styleUrls: ['./tinyeditor.component.css'],
  providers: [TINYMCE_VALUE_ACCESSOR]

})
export class TinyeditorComponent {
  config: any = {
    height: 250,
    theme: 'modern',
    plugins: 'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image imagetools link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists textcolor wordcount contextmenu colorpicker textpattern',
    toolbar: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
    image_advtab: true,
    imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
    templates: [
      { title: 'Test template 1', content: 'Test 1' },
      { title: 'Test template 2', content: 'Test 2' }
    ],
    content_css: [
      '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
      '//www.tinymce.com/css/codepen.min.css'
    ]
  };
}