import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {ContactDto} from "../../dtos/contact.dto";
import {ActivatedRoute, Router} from "@angular/router";
import {API_PATH} from "../../config";

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  errorMessage = ''
  contact?: ContactDto = undefined;
  userId: string | null = null;
  id: string | null = null;
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.id = this.route.snapshot.params['id'];
    if (this.userId && this.id) {
      this.httpClient.get<ContactDto>(API_PATH + 'users/' + this.userId + '/contacts/' + this.id).subscribe({
        next: data => {
          this.contact = data;
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
    else{
      this.errorMessage = 'You are not logged in!';
    }
  }
  onDelete(){
    this.httpClient.delete(API_PATH + 'users/' + this.userId + '/contacts/' + this.id).subscribe({
      next: data => {
        this.router.navigate(['/contacts']);
      },
      error: error => {
        if (error.status === 404 || error.status === 403) {
          this.errorMessage = error.error;
        }
        else if (error.status === 401){
          this.errorMessage = 'You are not logged in!';
        }
        else {
          this.errorMessage = 'Something went wrong';
        }
      }
    });

  }
  onEdit(){
    this.router.navigate(['/contacts/' + this.id + '/edit']);
  }
}
