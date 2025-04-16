import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterUserDto} from "../../dtos/register.user.dto";
import {HttpClient} from "@angular/common/http";
import {API_PATH} from "../../config";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  registerForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';
  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router) {
    this.registerForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('(?:\\d{3}[- ]){2}\\d{3}')]],
      dateOfBirth: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    const dto: RegisterUserDto = this.registerForm.value;

    if (dto.dateOfBirth) {
      dto.dateOfBirth = new Date(dto.dateOfBirth).toISOString();  // Konwertowanie daty na UTC
    }

    this.httpClient.post(API_PATH + "users/register", dto).subscribe({
      next: () => {
        this.successMessage = 'Registration successful!';
        this.errorMessage = '';
        this.registerForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        if (err.status === 400 && err.error?.errors) {
          const validationError = err.error.errors;
          Object.keys(validationError).forEach((key) => {
            const formControl = this.registerForm.get(key.toLowerCase());
            if (formControl) {
              formControl.setErrors({ serverError: validationError[key][0] });
            }
          });
        }
        else {
          this.errorMessage = err.error?.message || 'Registration failed.';
        }
      }
    });
  }
}
