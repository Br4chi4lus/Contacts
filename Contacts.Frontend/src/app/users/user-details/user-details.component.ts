import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {UserDto} from "../../dtos/user.dto";
import {ActivatedRoute, Router} from "@angular/router";
import {API_PATH} from "../../config";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user?: UserDto = undefined;
  errorMessage = '';
  userId: string | null = null;
  id: string | null = null;
  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private authService: AuthService, private router: Router) { }
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.userId = this.authService.getUserId();
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
  }

  onClick(){
    this.router.navigate(['/contacts/create/', this.id]);
  }
}
