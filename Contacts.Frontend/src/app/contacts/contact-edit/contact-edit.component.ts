import {Component, OnInit} from '@angular/core';
import {ContactDto} from "../../dtos/contact.dto";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {API_PATH} from "../../config";
import {ContactCategoryDto} from "../../dtos/contact.category.dto";
import {BusinessContactSubCategoryDto} from "../../dtos/business.contact.sub.category.dto";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UpdateContactDto} from "../../dtos/update.contact.dto";
import { Location } from '@angular/common';


@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  errorMessage = ''
  submitted = false;
  contact?: ContactDto = undefined;
  userId: string | null = null;
  id: string | null = null;
  categories: ContactCategoryDto[] = [];
  subCategories: BusinessContactSubCategoryDto[] = [];
  editForm: FormGroup;
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,) {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      categoryId: ['', [Validators.required]],
      subCategoryId: [''],
      subCategoryName: ['']
    })
  }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.id = this.route.snapshot.params['id'];
    if (this.userId && this.id) {
      this.httpClient.get<ContactDto>(API_PATH + 'users/' + this.userId + '/contacts/' + this.id).subscribe({
        next: data => {
          this.contact = data;
          console.log(this.contact);
        },
        error: error => {
          if (error.status === 404 || error.status === 403) {
            this.errorMessage = error.error;
          }
          else if (error.status === 401){
            this.errorMessage = 'You are not logged in!';
          }
          else{
            this.errorMessage = 'Something went wrong';
          }
        }
      });
      this.httpClient.get<ContactCategoryDto[]>(API_PATH + 'users/' + this.userId + '/contacts/categories').subscribe({
        next: data => {
          this.categories = data;
        }
      });
      this.httpClient.get<BusinessContactSubCategoryDto[]>(API_PATH + 'users/' + this.userId + '/contacts/subcategories').subscribe({
        next: data => {
          this.subCategories = data;
        }
      });

      this.editForm.get('categoryId')?.valueChanges.subscribe((value) => {
        const subCategoryControl = this.editForm.get('subCategoryId');
        const subCategoryNameControl = this.editForm.get('subCategoryName');
        if (value == 1){
          subCategoryControl?.clearValidators();
          subCategoryNameControl?.clearValidators();
          subCategoryControl?.setValue(null);
          subCategoryNameControl?.setValue(null);
        }
        else if (value == 2){
          subCategoryNameControl?.clearValidators();
          subCategoryNameControl?.setValue(null);
          subCategoryControl?.setValidators([Validators.required]);
        }
        else if (value == 3){
          subCategoryControl?.clearValidators();
          subCategoryControl?.setValue(null);
          subCategoryNameControl?.setValidators([Validators.required]);
        }
      });
    }
    else{
      this.errorMessage = 'You are not logged in!';
    }

  }
  onSubmit(){
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }
    const dto: UpdateContactDto = this.editForm.value;

    this.httpClient.patch(API_PATH + 'users/' + this.userId + '/contacts/' + this.id, dto).subscribe({
      next: data => {
        this.router.navigate(['/contacts/' + this.id]);
      },
      error: error => {
        if (error.status === 404 || error.status === 403) {
          this.errorMessage = error.error;
        }
        else if (error.status === 401){
          this.errorMessage = 'You are not logged in!';
        }
        else{
          this.errorMessage = 'Something went wrong';
        }
      }
    });
  }
  onBack(){
    this.location.back();
  }
}
