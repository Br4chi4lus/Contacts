import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterFormComponent } from './users/register-form/register-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginFormComponent } from './users/login-form/login-form.component';
import { UsersTableComponent } from './users/users-table/users-table.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { ContactsTableComponent } from './contacts/contacts-table/contacts-table.component';
import {AuthInterceptor} from "./auth.interceptor";
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { ContactCreateComponent } from './contacts/contact-create/contact-create.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    LoginFormComponent,
    UsersTableComponent,
    UserDetailsComponent,
    ContactsTableComponent,
    ContactDetailsComponent,
    ContactEditComponent,
    ContactCreateComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
