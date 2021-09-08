import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonInterceptor } from './http-interceptor.service';


@NgModule({
  declarations: [
  ],
  imports: [
      CommonModule,
      HttpClientModule
  ],
  exports:[
  ],
  providers: [
  {
            provide: HTTP_INTERCEPTORS,
            useClass: CommonInterceptor,
            multi: true
        }],
  bootstrap: []
})
export class CommonServiceModule { }
