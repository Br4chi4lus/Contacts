import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ContactDto} from "../../dtos/contact.dto";
import {API_PATH} from "../../config";
import {AuthService} from "../../services/auth.service";
@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.css']
})
export class ContactsTableComponent implements OnInit {
  errorMessage = '';
  contacts: ContactDto[] = [];

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }
  ngOnInit() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.httpClient.get<ContactDto[]>(API_PATH + 'users/' + userId + '/contacts').subscribe({
        next: data => {
          this.contacts = data;
        },
        error: err => {
          if (err.status === 403 || err.status === 401) {
            this.errorMessage = err.error;
          } else{
            this.errorMessage = 'Something went wrong';
          }
        }
      })
    }else{
      this.errorMessage = 'You are not logged in!';
    }
  }
}
