import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserDto} from "../../dtos/user.dto";
import {API_PATH} from "../../config";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {CreateContactDto} from "../../dtos/create.contact.dto";
import {ContactCategoryDto} from "../../dtos/contact.category.dto";
import {BusinessContactSubCategoryDto} from "../../dtos/business.contact.sub.category.dto";

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css']
})
export class ContactCreateComponent implements OnInit {
  submitted = false;
  errorMessage: string = '';
  user?: UserDto;
  userId: string | null = null;
  id: string | null = null;
  categories: ContactCategoryDto[] = [];
  subCategories: BusinessContactSubCategoryDto[] = [];
  createForm: FormGroup;
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private httpClient: HttpClient, private route: ActivatedRoute) {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      categoryId: ['', [Validators.required]],
      subCategoryId: [''],
      subCategoryName: ['']
    })
  }
  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.id = this.route.snapshot.params['id'];
    this.httpClient.get<UserDto>(API_PATH + 'users/' + this.id).subscribe({
      next: (date: UserDto) => {
        this.user = date;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.errorMessage = err.error;
        }else{
          this.errorMessage = err.error?.message || 'Something went wrong';
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
    this.createForm.get('categoryId')?.valueChanges.subscribe((value) => {
      const subCategoryControl = this.createForm.get('subCategoryId');
      const subCategoryNameControl = this.createForm.get('subCategoryName');
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
  onSubmit() {
    this.submitted = true;

    if (this.createForm.invalid || this.id === null){
      return;
    }
    const createContactDto: CreateContactDto = this.createForm.value;
    createContactDto.userId = Number(this.id);

    this.httpClient.post(API_PATH + 'users/' + this.userId + '/contacts', createContactDto).subscribe({
      next: () => {
        this.router.navigate(['/contacts']);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404 || err.status === 401 || err.status === 403) {
          this.errorMessage = err.error;
        }else{
          this.errorMessage = err.error?.message || 'Something went wrong';
        }
      }
    })
  }
}
