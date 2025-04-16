import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {API_PATH, TOKEN_NAME} from "../../config";
import {Router} from "@angular/router";
import {LoginUserDto} from "../../dtos/login.user.dto";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';
  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const dto: LoginUserDto = this.loginForm.value;
    this.httpClient.post(API_PATH + 'users/login', dto, {responseType: 'text'}).subscribe({
      next: (token: string) => {
        console.log(token);
        localStorage.setItem(TOKEN_NAME, token);
        this.router.navigate(['/contacts']);
        // redirect
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.errorMessage = err.error;
        } else {
          this.errorMessage = err.error?.message || 'Login failed.';
        }
      }
    });
  }
}
