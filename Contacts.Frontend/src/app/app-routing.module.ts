import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterFormComponent} from "./users/register-form/register-form.component";
import {LoginFormComponent} from "./users/login-form/login-form.component";
import {UsersTableComponent} from "./users/users-table/users-table.component";
import {UserDetailsComponent} from "./users/user-details/user-details.component";
import {ContactsTableComponent} from "./contacts/contacts-table/contacts-table.component";
import {ContactDetailsComponent} from "./contacts/contact-details/contact-details.component";
import {ContactEditComponent} from "./contacts/contact-edit/contact-edit.component";
import {ContactCreateComponent} from "./contacts/contact-create/contact-create.component";
import {LogoutComponent} from "./logout/logout.component";

const routes: Routes = [
  { path: 'register', component: RegisterFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'users', component: UsersTableComponent},
  { path: 'users/:id', component: UserDetailsComponent },
  { path: 'contacts', component: ContactsTableComponent},
  { path: 'contacts/:id', component: ContactDetailsComponent },
  { path: 'contacts/:id/edit', component: ContactEditComponent },
  { path: 'contacts/create/:id', component: ContactCreateComponent },
  { path: 'logout', component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
