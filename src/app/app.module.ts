import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonServiceModule } from './common-service/common-service.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingRoutes } from './app-routing.module';
import { RegisterComponent } from './register/register.component';
import { NgxTinymceModule } from 'ngx-tinymce';
import { DatePipe } from '@angular/common';
import { GlobalErrorHandler } from './common-service/globalError.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingRoutes,
    CommonServiceModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxTinymceModule.forRoot({
      baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/4.9.0/',
    })
  ],
  providers: [DatePipe],

  bootstrap: [AppComponent]
})
export class AppModule { }
