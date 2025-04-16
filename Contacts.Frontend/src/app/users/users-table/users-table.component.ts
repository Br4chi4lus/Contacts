import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserDto} from "../../dtos/user.dto";
import {API_PATH} from "../../config";

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  users: UserDto[] = [];
  constructor(private httpClient: HttpClient) {
  }
  ngOnInit() {
    this.httpClient.get<UserDto[]>(API_PATH + 'users').subscribe(data => {
      this.users = data;
    });
  }
}
